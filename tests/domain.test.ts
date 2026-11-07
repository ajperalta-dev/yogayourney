import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import {
  catalog,
  byId,
  poses,
  posesById,
  searchIndex,
  sectionFor,
} from "../src/content/catalog";
import { sequences } from "../src/content/sequences";
import { sections } from "../src/content/sections";
import { quizQuestions } from "../src/content/study";
import { defaultState, parseState } from "../src/lib/storage";
import { validateSequenceDuration } from "../src/lib/sequence-validation";
import { normalize } from "../src/lib/utils";
test("the 11 sections remain separate", () => {
  assert.equal(sections.length, 11);
  assert.equal(new Set(sections.map((s) => s.id)).size, 11);
});
test("canonical content IDs, links and image assets resolve", () => {
  assert.equal(new Set(catalog.map((c) => c.id)).size, catalog.length);
  for (const item of catalog) {
    assert.ok(item.name.es && item.name.en);
    assert.ok(existsSync(`public${item.image}`), item.image);
    assert.ok(existsSync(`public${item.thumbnail}`), item.thumbnail);
    assert.ok(sections.some((s) => s.id === sectionFor(item)));
    for (const id of item.relatedIds) assert.ok(byId[id], id);
    if (item.kind === "asana")
      for (const id of [
        ...item.anatomyIds,
        ...item.preparatoryPoseIds,
        ...item.counterposeIds,
      ])
        assert.ok(byId[id], id);
  }
});
test("the pose library has one complete record per stable ID", () => {
  assert.equal(Object.keys(posesById).length, poses.length);
  for (const pose of poses) {
    assert.match(pose.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.equal(byId[pose.id], pose);
    assert.ok(
      pose.sanskrit?.trim() || (pose.sanskrit === null && pose.studyOnly),
      pose.id,
    );
    assert.ok(Number.isSafeInteger(pose.duration) && pose.duration > 0, pose.id);
    for (const language of ["es", "en"] as const) {
      assert.ok(pose.instructionSteps[language].length >= 2, pose.id);
      for (const field of [
        pose.name,
        pose.breathing,
        pose.commonMistakes,
        pose.modifications,
        pose.contraindications,
      ]) {
        assert.ok(field[language].trim(), pose.id);
      }
    }
  }
});
test("sequences reference existing canonical content", () => {
  for (const seq of sequences) {
    assert.ok(seq.steps.length > 0, seq.id);
    assert.ok(existsSync(`public${seq.image}`), seq.image);
    assert.equal(seq.steps.reduce((total, step) => total + step.duration, 0), seq.duration, seq.id);
    assert.equal(validateSequenceDuration(seq).valid, true, seq.id);
    for (const step of seq.steps) {
      assert.ok(posesById[step.contentId], `${seq.id}: ${step.contentId}`);
      assert.ok(step.duration > 0);
    }
  }
});
test("all practice images are generated from local SVG sources", () => {
  for (const item of catalog) {
    const source = item.image.replace(/\.webp$/, ".svg");
    assert.ok(existsSync(`public${source}`), source);
  }
  for (const sequence of sequences) {
    const source = sequence.image.replace(/\.webp$/, ".svg");
    assert.ok(existsSync(`public${source}`), source);
  }
});
test("search crosses sections and folds accents", () => {
  assert.equal(normalize("Tāḍāsana"), "tadasana");
  const hits = searchIndex.filter((i) =>
    normalize(i.searchText).includes("hip"),
  );
  assert.ok(hits.some((i) => i.section === "anatomy"));
  assert.ok(hits.some((i) => i.section === "yin"));
  assert.ok(hits.some((i) => i.section === "hatha"));
});
test("local data round-trips without losing notes or classes", () => {
  const state = {
    ...defaultState,
    notes: {
      tadasana: {
        contentId: "tadasana",
        text: "A personal note",
        updatedAt: "2026-10-28",
      },
    },
    sequences: [sequences[0]],
  };
  assert.deepEqual(parseState(JSON.stringify(state)), state);
});
test("legacy saved classes migrate their total to the ordered step sum", () => {
  const legacy = { ...sequences[0], duration: 1 };
  const restored = parseState(
    JSON.stringify({ ...defaultState, sequences: [legacy] }),
  );
  assert.equal(restored.sequences[0].duration, sequences[0].duration);
});
test("malformed backups and invalid nested records are rejected", () => {
  assert.throws(() => parseState("{}"));
  assert.throws(() =>
    parseState(
      JSON.stringify({ ...defaultState, sequences: [{ id: "broken" }] }),
    ),
  );
  assert.throws(() =>
    parseState(
      JSON.stringify({ ...defaultState, cards: { a: { known: "yes" } } }),
    ),
  );
  assert.throws(() =>
    parseState(
      JSON.stringify({
        ...defaultState,
        quizzes: [
          { id: "bad", score: 20, total: 3, date: "today", category: "all" },
        ],
      }),
    ),
  );
});
test("quiz answers are valid and advanced aerial entries are restricted", () => {
  for (const q of quizQuestions)
    assert.ok(q.correct >= 0 && q.correct < q.options.length);
  for (const item of catalog.filter((c) => c.kind === "aerial"))
    assert.equal(item.studyOnly, true);
});

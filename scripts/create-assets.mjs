import fs from "node:fs/promises";
import sharp from "sharp";
import { renderFigure } from "./yoga-figure.mjs";
import { poses } from "./yoga-poses.mjs";
await fs.mkdir("public/images", { recursive: true });
const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" rx="110" fill="#365b4b"/><g fill="none" stroke="#e8eddb" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"><path d="M256 335C153 324 128 251 146 192c57 2 93 38 110 143Z"/><path d="M256 335c103-11 128-84 110-143-57 2-93 38-110 143Z"/><path d="M256 319c-62-53-64-119 0-181 64 62 62 128 0 181Z"/><path d="M145 339c57 39 165 39 222 0"/></g></svg>`;
await fs.writeFile("public/icon.svg", icon);
for (const size of [192, 512])
  await sharp(Buffer.from(icon))
    .resize(size, size)
    .png()
    .toFile(`public/icon-${size}.png`);
const illustrations = JSON.parse(
  await fs.readFile(new URL("../src/content/illustrations.json", import.meta.url), "utf8"),
);
await fs.mkdir("public/images/poses", { recursive: true });
await fs.mkdir("public/images/sequences", { recursive: true });

for (const [id, figure] of Object.entries(poses)) {
  await fs.writeFile(
    `public/images/poses/${id}.svg`,
    renderFigure(figure, illustrations.poses[id].es),
  );
}
for (const [id, poseId] of Object.entries(illustrations.covers)) {
  await fs.writeFile(
    `public/images/sequences/${id}.svg`,
    renderFigure(poses[poseId], illustrations.poses[poseId].es),
  );
}

for (const name of ["study", "journey"]) {
  await fs.writeFile(
    `public/images/${name}.svg`,
    renderFigure(poses.sukhasana, illustrations.poses.sukhasana.es, {
      hero: name === "journey",
    }),
  );
}

// Keep older public URLs working while showing the current illustrations.
for (const id of [
  "tadasana", "utthita-trikonasana", "padangusthasana", "pada-hastasana",
  "baddha-konasana", "bhujangasana", "sukhasana", "savasana",
]) {
  await fs.copyFile(`public/images/poses/${id}.svg`, `public/images/${id}.svg`);
}
// Precomputed responsive WebP files keep next/image compatible with static hosting.
for (const file of await fs.readdir("public/images", { recursive: true })) {
  if (!file.endsWith(".svg")) continue;
  const name = file.slice(0, -4);
  const source = `public/images/${file}`;
  for (const width of [400, 800, 1200]) {
    await sharp(source)
      .resize({ width })
      .webp({ quality: 85 })
      .toFile(`public/images/${name}-${width}.webp`);
  }
  await fs.copyFile(
    `public/images/${name}-1200.webp`,
    `public/images/${name}.webp`,
  );
  await fs.copyFile(
    `public/images/${name}-400.webp`,
    `public/images/${name}-thumb.webp`,
  );
}
console.log(
  "Local illustrations, responsive WebP assets and PWA icons created.",
);

import fs from "node:fs/promises";
import sharp from "sharp";
await fs.mkdir("public/images", { recursive: true });
const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" rx="110" fill="#365b4b"/><g fill="none" stroke="#e8eddb" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"><path d="M256 335C153 324 128 251 146 192c57 2 93 38 110 143Z"/><path d="M256 335c103-11 128-84 110-143-57 2-93 38-110 143Z"/><path d="M256 319c-62-53-64-119 0-181 64 62 62 128 0 181Z"/><path d="M145 339c57 39 165 39 222 0"/></g></svg>`;
await fs.writeFile("public/icon.svg", icon);
for (const size of [192, 512])
  await sharp(Buffer.from(icon))
    .resize(size, size)
    .png()
    .toFile(`public/icon-${size}.png`);
const journey = `<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="510" viewBox="0 0 1100 510"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#eef0e2"/><stop offset="1" stop-color="#dce4ce"/></linearGradient><linearGradient id="fade"><stop stop-color="#eef0e2"/><stop offset=".56" stop-color="#eef0e2" stop-opacity=".8"/><stop offset=".8" stop-color="#eef0e2" stop-opacity="0"/></linearGradient><pattern id="grain" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="2" cy="3" r=".6" fill="#60724e" opacity=".1"/></pattern></defs><rect width="1100" height="510" fill="url(#bg)"/><circle cx="879" cy="121" r="72" fill="#f2e9c9"/><circle cx="879" cy="121" r="94" fill="none" stroke="#e1e4ce" stroke-width="1"/><path d="M420 401 675 156 799 281 935 178 1100 320V510H420Z" fill="#ccd6bb"/><path d="m675 156-51 91 51-38 39 24Z" fill="#e6ebd8"/><path d="M500 453 763 261 881 374 1036 236 1160 405V510H500Z" fill="#b6c7a5"/><path d="M490 510c190-102 228-66 370-111s190-18 240-1v112Z" fill="#96af88"/><path d="M600 510c150-74 296-78 500-18v18Z" fill="#728f6a"/><path d="M1045 105c-41 84-30 214-56 313" fill="none" stroke="#7f956f" stroke-width="3"/><g fill="#8fa37e"><ellipse cx="1031" cy="145" rx="12" ry="34" transform="rotate(30 1031 145)"/><ellipse cx="1050" cy="180" rx="10" ry="33" transform="rotate(38 1050 180)"/><ellipse cx="1016" cy="221" rx="11" ry="35" transform="rotate(-30 1016 221)"/><ellipse cx="1039" cy="255" rx="11" ry="32" transform="rotate(41 1039 255)"/><ellipse cx="1005" cy="288" rx="10" ry="30" transform="rotate(-36 1005 288)"/><ellipse cx="1018" cy="329" rx="10" ry="28" transform="rotate(41 1018 329)"/></g><g transform="translate(850 340)"><ellipse cx="0" cy="95" rx="72" ry="9" fill="#5f7f59" opacity=".2"/><circle cx="0" cy="-1" r="15" fill="#967754"/><path d="M-14-9c-7-30 28-33 29-6l-7-7-22 13Z" fill="#3c5140"/><path d="M-16 19Q0 10 16 19L24 63-24 63Z" fill="#eee8d2"/><path d="M-15 24-34 61-50 63M15 24l19 37 16 2" fill="none" stroke="#967754" stroke-width="9" stroke-linecap="round"/><path d="M-20 60c-29-6-61 20-37 27 26 6 44-6 57-9 13 3 31 15 57 9 24-7-8-33-37-27Z" fill="#3e5e49"/><path d="M-38 82 7 72M38 82-7 72" fill="none" stroke="#6c8665" stroke-width="2"/></g><g fill="none" stroke="#8c9e77" opacity=".6"><path d="m751 92 8-4 8 4m18-14 8-4 8 4"/></g><rect width="1100" height="510" fill="url(#fade)"/><rect width="1100" height="510" fill="url(#grain)"/></svg>`;
await fs.writeFile("public/images/journey.svg", journey);
const figures = {
  tadasana: {
    head: [300, 103],
    body: "M300 127L300 222",
    arms: "M297 144L268 202M303 144L332 202",
    legs: "M300 222L280 303M300 222L320 303",
  },
  "utthita-trikonasana": {
    head: [335, 137],
    body: "M316 155L270 204",
    arms: "M313 157L355 95M313 157L314 243",
    legs: "M270 204L206 298M270 204L375 298",
  },
  padangusthasana: {
    head: [318, 232],
    body: "M285 171Q341 174 325 212",
    arms: "M330 200L307 292",
    legs: "M285 171L266 299M285 171L298 299",
  },
  "pada-hastasana": {
    head: [318, 232],
    body: "M285 171Q341 174 325 212",
    arms: "M330 200L294 296L270 300",
    legs: "M285 171L266 299M285 171L298 299",
  },
  "baddha-konasana": {
    head: [300, 140],
    body: "M300 162L300 237",
    arms: "M294 178L265 230L293 264M306 178L335 230L307 264",
    legs: "M300 237Q240 227 222 255Q252 280 300 266Q348 280 378 255Q360 227 300 237",
  },
  bhujangasana: {
    head: [369, 180],
    body: "M355 199Q339 246 295 263",
    arms: "M349 214L366 264",
    legs: "M295 263L211 269L183 267",
  },
  sukhasana: {
    head: [300, 140],
    body: "M300 162L300 237",
    arms: "M294 178L265 230L239 243M306 178L335 230L361 243",
    legs: "M300 237Q240 227 222 255Q252 280 300 266Q348 280 378 255Q360 227 300 237",
  },
  savasana: {
    head: [395, 251],
    body: "M373 260L285 266",
    arms: "M363 267L315 284",
    legs: "M285 266L200 261M285 266L202 282",
  },
};
function svgFigure(id, f) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="380" viewBox="0 0 600 380"><rect width="600" height="380" fill="#edf0e5"/><circle cx="300" cy="183" r="128" fill="#e3e9d8"/><circle cx="300" cy="183" r="145" fill="none" stroke="#d9e1cd"/><path d="M120 310h360" stroke="#becdb0" stroke-width="2"/><ellipse cx="300" cy="313" rx="105" ry="7" fill="#cedac1"/><g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${f.legs}" stroke="#56765a" stroke-width="17"/><path d="${f.body}" stroke="#bf9471" stroke-width="26"/><path d="${f.arms}" stroke="#ab8d6d" stroke-width="11"/></g><circle cx="${f.head[0]}" cy="${f.head[1]}" r="18" fill="#ab8d6d"/><path d="M${f.head[0] - 17} ${f.head[1] - 6}q0-23 20-16 14 4 15 16-12-12-35 0" fill="#3d5641"/><g fill="#98ac86" opacity=".6"><circle cx="130" cy="100" r="3"/><circle cx="473" cy="246" r="4"/><path d="M453 115h16m-8-8v16" stroke="#98ac86" stroke-width="1"/></g></svg>`;
}
for (const [id, f] of Object.entries(figures))
  await fs.writeFile(`public/images/${id}.svg`, svgFigure(id, f));
await fs.writeFile(
  "public/images/study.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="380" viewBox="0 0 600 380"><rect width="600" height="380" fill="#eeeadd"/><circle cx="300" cy="180" r="118" fill="#e4dfce"/><g fill="none" stroke="#829476" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"><path d="M300 276c-64-10-105-56-90-118 45 1 80 47 90 118Z"/><path d="M300 276c64-10 105-56 90-118-45 1-80 47-90 118Z"/><path d="M300 264c-51-46-48-107 0-148 48 41 51 102 0 148Z"/><path d="M216 288q84 39 168 0"/></g><circle cx="300" cy="87" r="5" fill="#a5ad8b"/></svg>`,
);
const poseIds = [
  "urdhva-hastasana", "uttanasana", "ardha-uttanasana", "phalahakasana",
  "chaturanga-dandasana", "urdhva-mukha-svanasana", "adho-mukha-svanasana",
  "utkatasana", "virabhadrasana-i", "virabhadrasana-ii",
  "utthita-parsvakonasana", "prasarita-padottanasana", "parsvottanasana",
  "dandasana", "paschimottanasana", "ardha-matsyendrasana",
  "setu-bandha-sarvangasana", "viparita-karani", "dragon", "sphinx",
  "supported-child", "reclined-twist", "supported-seat",
];
await fs.mkdir("public/images/poses", { recursive: true });
await fs.mkdir("public/images/sequences", { recursive: true });
const studyIllustration = await fs.readFile("public/images/study.svg");
for (const id of poseIds)
  await fs.writeFile(`public/images/poses/${id}.svg`, studyIllustration);
for (const id of [
  "surya-a", "surya-b", "standing", "primary-series", "finishing",
  "hatha-foundations", "yin-stillness", "aerial-foundations",
])
  await fs.writeFile(`public/images/sequences/${id}.svg`, studyIllustration);
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

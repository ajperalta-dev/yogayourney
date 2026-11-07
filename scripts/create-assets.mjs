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
function figureMarkup(f) {
  return `${f.overlay ?? ""}<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${f.legs}" stroke="#56765a" stroke-width="17"/><path d="${f.body}" stroke="#bf9471" stroke-width="26"/><path d="${f.arms}" stroke="#ab8d6d" stroke-width="11"/></g><circle cx="${f.head[0]}" cy="${f.head[1]}" r="18" fill="#ab8d6d"/><path d="M${f.head[0] - 17} ${f.head[1] - 6}q0-23 20-16 14 4 15 16-12-12-35 0" fill="#3d5641"/>`;
}
function svgFigure(id, f) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="380" viewBox="0 0 600 380" role="img"><title>Ilustración orientativa: ${id}</title><desc>Figura esquemática de yoga en paleta verde salvia y arena.</desc><rect width="600" height="380" fill="#edf0e5"/><circle cx="300" cy="183" r="128" fill="#e3e9d8"/><circle cx="300" cy="183" r="145" fill="none" stroke="#d9e1cd"/><path d="M120 310h360" stroke="#becdb0" stroke-width="2"/><ellipse cx="300" cy="313" rx="105" ry="7" fill="#cedac1"/>${figureMarkup(f)}<g fill="#98ac86" opacity=".6"><circle cx="130" cy="100" r="3"/><circle cx="473" cy="246" r="4"/><path d="M453 115h16m-8-8v16" stroke="#98ac86" stroke-width="1"/></g></svg>`;
}
await fs.writeFile(
  "public/images/study.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="380" viewBox="0 0 600 380"><rect width="600" height="380" fill="#eeeadd"/><circle cx="300" cy="180" r="118" fill="#e4dfce"/><g fill="none" stroke="#829476" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"><path d="M300 276c-64-10-105-56-90-118 45 1 80 47 90 118Z"/><path d="M300 276c64-10 105-56 90-118-45 1-80 47-90 118Z"/><path d="M300 264c-51-46-48-107 0-148 48 41 51 102 0 148Z"/><path d="M216 288q84 39 168 0"/></g><circle cx="300" cy="87" r="5" fill="#a5ad8b"/></svg>`,
);
await fs.mkdir("public/images/poses", { recursive: true });
await fs.mkdir("public/images/sequences", { recursive: true });
const poseFigures = {
  ...figures,
  "urdhva-hastasana": {
    head: [300, 102], body: "M300 125L300 218", arms: "M296 145L263 73M304 145L337 73", legs: "M300 218L278 302M300 218L322 302",
  },
  uttanasana: {
    head: [307, 226], body: "M300 155Q338 174 314 211", arms: "M318 192L293 276M326 194L336 276", legs: "M300 155L277 302M300 155L328 302",
  },
  "ardha-uttanasana": {
    head: [299, 164], body: "M293 137Q280 164 300 191", arms: "M286 150L248 242M298 151L347 242", legs: "M300 191L274 302M300 191L325 302", overlay: '<rect x="235" y="242" width="30" height="22" rx="4" fill="#d3b38e"/><rect x="333" y="242" width="30" height="22" rx="4" fill="#d3b38e"/>',
  },
  phalahakasana: {
    head: [164, 200], body: "M184 205L337 235", arms: "M194 207L190 276M208 209L215 275", legs: "M337 235L410 266L474 266M337 235L414 278L478 278",
  },
  "chaturanga-dandasana": {
    head: [166, 218], body: "M186 218L338 242", arms: "M194 216L216 270M208 218L232 269", legs: "M338 242L411 266L475 266M338 242L413 278L477 278",
  },
  "urdhva-mukha-svanasana": {
    head: [184, 173], body: "M203 190Q275 225 355 250", arms: "M210 199L207 279M224 204L222 279", legs: "M355 250L420 260L480 260M355 250L424 274L482 274",
  },
  "adho-mukha-svanasana": {
    head: [213, 207], body: "M230 211L316 139", arms: "M231 211L162 282M244 201L236 282", legs: "M316 139L386 211L461 281M316 139L403 194L488 281",
  },
  utkatasana: {
    head: [300, 108], body: "M300 131L300 205", arms: "M295 145L266 83M305 145L334 83", legs: "M300 205L263 239L272 302M300 205L338 239L328 302",
  },
  "virabhadrasana-i": {
    head: [275, 103], body: "M275 126L280 213", arms: "M269 144L239 76M281 144L311 76", legs: "M280 213L321 247L348 302M280 213L224 250L158 302",
  },
  "virabhadrasana-ii": {
    head: [300, 106], body: "M300 130L300 214", arms: "M294 148L207 151M306 148L393 151", legs: "M300 214L355 245L369 302M300 214L248 245L174 302",
  },
  "utthita-parsvakonasana": {
    head: [352, 142], body: "M340 158Q309 188 280 218", arms: "M338 159L415 113M322 176L363 253", legs: "M280 218L336 247L361 302M280 218L222 255L160 302",
  },
  "prasarita-padottanasana": {
    head: [300, 202], body: "M300 153Q276 177 300 190", arms: "M286 169L268 255M314 169L332 255", legs: "M300 153L222 302M300 153L378 302",
  },
  parsvottanasana: {
    head: [321, 206], body: "M300 147Q343 166 328 191", arms: "M321 177L300 256M330 177L353 255", legs: "M300 147L275 302M300 147L373 261L432 302",
  },
  dandasana: {
    head: [300, 105], body: "M300 128L300 217", arms: "M293 149L272 254M307 149L328 254", legs: "M300 217L380 280L461 280M300 217L382 294L464 294",
  },
  paschimottanasana: {
    head: [369, 242], body: "M300 205Q350 200 350 229", arms: "M334 213L415 273M345 216L432 278", legs: "M300 205L388 280L470 280M300 205L388 294L470 294",
  },
  "ardha-matsyendrasana": {
    head: [329, 116], body: "M300 204Q326 171 315 139", arms: "M292 151L260 222L316 246M307 153L358 195", legs: "M300 204L244 269L335 269M300 204L360 229L380 284",
  },
  "setu-bandha-sarvangasana": {
    head: [169, 255], body: "M190 260Q262 229 326 207", arms: "M195 264L229 291M211 258L248 284", legs: "M326 207L363 242L360 296M326 207L397 241L401 296",
  },
  "viparita-karani": {
    head: [162, 261], body: "M183 260L286 260", arms: "M199 260L190 289M211 260L205 289", legs: "M286 260L307 173L307 92M286 260L329 173L329 92", overlay: '<path d="M365 55V311" stroke="#bdcbb1" stroke-width="8"/><path d="M351 311h37" stroke="#bdcbb1" stroke-width="5"/>',
  },
  butterfly: {
    head: [300, 119], body: "M300 141L300 216", arms: "M294 156L268 214L294 248M306 156L332 214L306 248", legs: "M300 216Q251 203 221 258Q250 283 300 266Q350 283 379 258Q349 203 300 216",
  },
  dragon: {
    head: [300, 102], body: "M300 125Q286 164 285 207", arms: "M292 151L250 226M304 151L325 226", legs: "M285 207L334 240L355 302M285 207L226 239L168 289", overlay: '<rect x="146" y="282" width="70" height="18" rx="8" fill="#d3b38e"/>',
  },
  sphinx: {
    head: [184, 207], body: "M203 220Q280 245 365 269", arms: "M213 220L223 270L287 270M226 225L238 260L294 260", legs: "M365 269L430 277L484 277M365 269L431 290L483 290",
  },
  "supported-child": {
    head: [252, 253], body: "M267 239Q306 201 340 182", arms: "M276 227L207 263M288 216L222 280", legs: "M340 182Q399 186 408 235L378 277M340 182Q373 180 385 211", overlay: '<rect x="190" y="258" width="113" height="30" rx="13" fill="#d3b38e"/>',
  },
  "reclined-twist": {
    head: [153, 258], body: "M174 260L282 264", arms: "M184 261L225 294M202 260L240 287", legs: "M282 264Q347 257 379 213L431 202M282 264Q344 268 381 224L439 222", overlay: '<rect x="400" y="196" width="58" height="45" rx="12" fill="#d3b38e"/>',
  },
  "supported-seat": {
    head: [300, 114], body: "M300 137L300 216", arms: "M294 156L272 216L272 244M306 156L328 216L328 244", legs: "M300 216L281 260L252 291M300 216L321 260L350 291", overlay: '<path d="M244 233v75m112-75v75m-112-42h112m-98-24h84" fill="none" stroke="#9a7e62" stroke-width="8" stroke-linecap="round"/><path d="M450 52v100q0 35 31 35" fill="none" stroke="#819576" stroke-width="7" stroke-linecap="round"/>',
  },
};
for (const [id, figure] of Object.entries(poseFigures))
  await fs.writeFile(`public/images/poses/${id}.svg`, svgFigure(id, figure));
const sequenceCovers = {
  "surya-a": {
    title: "Saludo al sol A",
    poses: ["urdhva-hastasana", "uttanasana", "adho-mukha-svanasana"],
    accent: "#e3e9d8",
  },
  "surya-b": {
    title: "Saludo al sol B",
    poses: ["utkatasana", "virabhadrasana-i", "adho-mukha-svanasana"],
    accent: "#e8e5d3",
  },
  standing: {
    title: "Fundamentos de pie",
    poses: ["virabhadrasana-ii", "utthita-trikonasana", "utthita-parsvakonasana"],
    accent: "#e1e9db",
  },
  "primary-series": {
    title: "Fundamentos de la serie primaria",
    poses: ["uttanasana", "virabhadrasana-i", "paschimottanasana"],
    accent: "#e6e9d8",
  },
  finishing: {
    title: "Cierre y descanso",
    poses: ["baddha-konasana", "viparita-karani", "savasana"],
    accent: "#e9e6d8",
  },
  "hatha-foundations": {
    title: "Volver a las bases",
    poses: ["tadasana", "utthita-trikonasana", "setu-bandha-sarvangasana"],
    accent: "#f3e4d9",
  },
  "yin-stillness": {
    title: "Un espacio de quietud",
    poses: ["butterfly", "sphinx", "reclined-twist"],
    accent: "#e7e2ef",
  },
  "aerial-foundations": {
    title: "Repaso supervisado de Aerial",
    poses: ["tadasana", "supported-seat", "sukhasana"],
    accent: "#e0ebef",
  },
};
function svgSequenceCover(id, { title, poses, accent }) {
  const figuresMarkup = poses
    .map((poseId, index) => {
      const x = 50 + index * 340;
      const center = x + 155;
      return `<circle cx="${center}" cy="270" r="128" fill="${accent}"/><circle cx="${center}" cy="270" r="141" fill="none" stroke="#d9e1cd" stroke-width="2"/><svg x="${x}" y="150" width="310" height="196" viewBox="0 0 600 380">${figureMarkup(poseFigures[poseId])}</svg>`;
    })
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="510" viewBox="0 0 1100 510" role="img"><title>Portada ilustrativa: ${title}</title><desc>Tres figuras esquemáticas muestran posturas de la secuencia ${title}, en tonos salvia, arena y verde.</desc><defs><linearGradient id="cover-bg" x2="1" y2="1"><stop stop-color="#f2f1e8"/><stop offset="1" stop-color="#e4eadc"/></linearGradient></defs><rect width="1100" height="510" rx="28" fill="url(#cover-bg)"/><circle cx="940" cy="90" r="55" fill="#f2e9c9" opacity=".9"/><path d="M80 404c195 28 335-26 490 0s278-25 450 0" fill="none" stroke="#b8c9ae" stroke-width="3" stroke-linecap="round"/><ellipse cx="550" cy="416" rx="420" ry="14" fill="#cad7c2" opacity=".55"/>${figuresMarkup}<g fill="#829777" opacity=".7"><circle cx="110" cy="95" r="4"/><circle cx="990" cy="220" r="5"/><path d="M174 112h20m-10-10v20M905 118h18m-9-9v18" stroke="#829777" stroke-width="2" stroke-linecap="round"/></g></svg>`;
}
for (const [id, cover] of Object.entries(sequenceCovers))
  await fs.writeFile(`public/images/sequences/${id}.svg`, svgSequenceCover(id, cover));
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

import type { YinPose } from "@/lib/models";
import { l } from "@/lib/utils";
import { base, safety } from "../shared";
export const yin: YinPose[] = [
  {
    ...base(
      "butterfly",
      "Mariposa",
      "Butterfly",
      "Hip Openers",
      l(
        "Una pausa con apoyo para explorar la quietud.",
        "A supported pause to explore stillness.",
      ),
    ),
    kind: "yin",
    duration: 120,
    image: "/images/baddha-konasana.webp",
    thumbnail: "/images/baddha-konasana-thumb.webp",
    tags: ["hip", "cadera", "adductors", "aductores", "yin"],
    targetArea: l(
      "Caderas y cara interna de los muslos.",
      "Hips and inner thighs.",
    ),
    meridians: l(
      "En algunas escuelas Yin se asocia a hígado y riñón. Es un marco tradicional, no una estructura anatómica demostrada.",
      "Some Yin schools associate this pose with liver and kidney meridians. This is a traditional framework, not established anatomy.",
    ),
    entry: l(
      "Siéntate sobre una manta, une las plantas y apoya los muslos.",
      "Sit on a blanket, join the soles and support the thighs.",
    ),
    hold: l(
      "Permanece en un rango suave; no busques dolor ni un estiramiento intenso.",
      "Stay in a gentle range; do not seek pain or intense stretching.",
    ),
    exit: l(
      "Eleva el torso despacio y ayuda a las piernas con las manos.",
      "Slowly lift the torso and support the legs with your hands.",
    ),
    rebound: l(
      "Descansa 30–60 segundos en una posición cómoda antes de continuar.",
      "Rest for 30–60 seconds in a comfortable position before continuing.",
    ),
    benefits: l(
      "Oportunidad para observar sensaciones y quietud.",
      "An opportunity to observe sensations and stillness.",
    ),
    contraindications: safety,
    modifications: l(
      "Usa una silla o reduce la apertura de las piernas.",
      "Use a chair or reduce the opening of the legs.",
    ),
    props: l("Manta, cojín y bloques.", "Blanket, cushion and blocks."),
    relatedIds: ["hip-joint", "baddha-konasana"],
  },
];

const quietPoses = [
  {
    id: "dragon",
    name: l("Dragón bajo", "Low dragon"),
    sanskrit: "Añjaneyāsana",
    area: l(
      "Parte delantera de la cadera de la pierna de atrás.",
      "Front of the hip of the back leg.",
    ),
    entry: l(
      "Desde cuatro apoyos, lleva un pie entre las manos. Apoya la rodilla trasera sobre una manta y las manos sobre bloques. Cambia de lado a mitad del tiempo.",
      "From tabletop, step a foot between the hands. Pad the back knee and support the hands on blocks. Switch sides halfway through.",
    ),
    exit: l(
      "Lleva la pelvis atrás y devuelve el pie a cuatro apoyos.",
      "Shift the hips back and bring the foot back to tabletop.",
    ),
    modification: l(
      "Acorta la zancada y mantén el torso más alto. Si molesta la rodilla, usa un asiento en lugar de arrodillarte.",
      "Shorten the stance and keep the torso higher. If kneeling hurts, choose a seated rest.",
    ),
  },
  {
    id: "sphinx",
    name: l("Esfinge", "Sphinx"),
    sanskrit: "Sālamba Bhujaṅgāsana",
    area: l("Parte delantera del torso.", "Front of the torso."),
    entry: l(
      "Túmbate boca abajo. Apoya los antebrazos y deja el pecho apenas elevado, con el cuello largo.",
      "Lie on your belly. Rest on the forearms and let the chest lift slightly, keeping the neck long.",
    ),
    exit: l(
      "Desliza los codos hacia delante y baja el pecho. Gira de lado si necesitas cambiar de posición.",
      "Slide elbows forward and lower the chest. Roll to one side if you need to change position.",
    ),
    modification: l(
      "Aleja los codos para reducir la extensión. Sal si aparece presión en la zona lumbar.",
      "Move the elbows forward to reduce extension. Come out if you feel pressure in the lower back.",
    ),
  },
  {
    id: "supported-child",
    name: l("Niño con apoyo", "Supported child’s pose"),
    sanskrit: "Bālāsana",
    area: l(
      "Espalda y caderas en un rango cómodo.",
      "Back and hips within a comfortable range.",
    ),
    entry: l(
      "Desde cuatro apoyos, desplaza la pelvis hacia los talones hasta donde resulte cómodo. Apoya el torso y la frente sobre un cojín.",
      "From tabletop, shift hips toward heels as far as comfortable. Rest the torso and forehead on a cushion.",
    ),
    exit: l(
      "Presiona las manos contra el suelo para volver a cuatro apoyos.",
      "Press the hands into the floor to return to tabletop.",
    ),
    modification: l(
      "Usa un cojín más alto o descansa de lado si la flexión de rodillas resulta incómoda.",
      "Use a higher cushion or rest on one side if bending the knees is uncomfortable.",
    ),
  },
  {
    id: "reclined-twist",
    name: l("Torsión tumbada", "Reclined twist"),
    sanskrit: "Supta Matsyendrāsana",
    area: l(
      "Costados y rotación suave del tronco.",
      "Side body and gentle trunk rotation.",
    ),
    entry: l(
      "Boca arriba con las rodillas dobladas, deja que caigan hacia un lado sobre un cojín. Mantén el cuello cómodo. Cambia de lado a mitad del tiempo.",
      "Lie on your back with bent knees and let them drop to one side onto a cushion. Keep the neck comfortable. Switch sides halfway through.",
    ),
    exit: l(
      "Con ayuda de las manos, devuelve las rodillas al centro y apoya los pies.",
      "Use your hands to bring the knees back to center and set the feet down.",
    ),
    modification: l(
      "Eleva el cojín o deja ambos pies en el suelo y reduce el giro.",
      "Raise the cushion or keep both feet on the floor and reduce the rotation.",
    ),
  },
];

yin.push(
  ...quietPoses.map(
    ({ id, name, sanskrit, area, entry, exit, modification }): YinPose => ({
      ...base(id, name.es, name.en, "Supported", area),
      kind: "yin",
      sanskrit,
      image: `/images/poses/${id}.webp`,
      thumbnail: `/images/poses/${id}-thumb.webp`,
      duration: 120,
      targetArea: area,
      meridians: l(
        "Las asociaciones varían según la escuela de Yin.",
        "Associations vary between Yin schools.",
      ),
      entry,
      hold: l(
        "Respira con naturalidad. Si te cuesta sostener la postura con comodidad, sal antes.",
        "Breathe naturally. Come out early if you cannot stay comfortably.",
      ),
      exit,
      rebound: l(
        "Descansa unos instantes en una posición neutra antes de continuar.",
        "Rest briefly in a neutral position before continuing.",
      ),
      benefits: l(
        "Explorar el apoyo y observar las sensaciones con calma.",
        "Explore support and notice sensations at an unhurried pace.",
      ),
      contraindications: safety,
      modifications: modification,
      props: l(
        "Cojín, manta y bloques según la postura.",
        "Cushion, blanket and blocks as needed.",
      ),
      relatedIds: ["savasana"],
    }),
  ),
);

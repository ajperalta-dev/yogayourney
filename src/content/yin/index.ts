import type { YinPose } from "@/lib/models";
import { l } from "@/lib/utils";
import { base, splitInstructionSteps } from "../shared";
const butterflyEntry = l(
  "Sentate sobre una manta y juntá las plantas con los talones alejados de la pelvis. Apoyá los muslos e inclinate apenas hacia un cojín alto. Descansá los antebrazos sobre el apoyo.",
  "Sit on a blanket and bring the soles together with the heels away from the pelvis. Support the thighs and fold slightly toward a high cushion. Rest your forearms on the support.",
);
const butterflyCaution = l(
  "Reducí la inclinación si aparece dolor lumbar. Si molesta la rodilla, acercá un apoyo al muslo o salí de la postura.",
  "Reduce the fold if you feel lower back pain. If the knee is uncomfortable, add support under the thigh or come out.",
);
export const yin: YinPose[] = [
  {
    ...base(
      "butterfly",
      "Mariposa con apoyo",
      "Supported butterfly",
      "Hip Openers",
      l(
        "Una pausa con apoyo para explorar la quietud.",
        "A supported pause to explore stillness.",
      ),
    ),
    kind: "yin",
    sanskrit: "Baddha Koṇāsana",
    duration: 120,
    safety: butterflyCaution,
    breathing: l(
      "Dejá que las costillas se muevan al respirar. Si el apoyo te dificulta respirar, elevá el torso.",
      "Let the ribs move as you breathe. Raise the torso if the support makes breathing difficult.",
    ),
    image: "/images/poses/butterfly.svg",
    thumbnail: "/images/poses/butterfly.svg",
    tags: ["hip", "cadera", "adductors", "aductores", "yin"],
    targetArea: l(
      "Caderas y cara interna de los muslos.",
      "Hips and inner thighs.",
    ),
    meridians: l(
      "En algunas escuelas Yin se asocia a hígado y riñón. Es un marco tradicional, no una estructura anatómica demostrada.",
      "Some Yin schools associate this pose with liver and kidney meridians. This is a traditional framework, not established anatomy.",
    ),
    entry: butterflyEntry,
    instructionSteps: splitInstructionSteps(butterflyEntry),
    hold: l(
      "Empezá con un minuto en un rango suave. Quedate hasta dos minutos si el apoyo resulta cómodo.",
      "Start with one minute in an easy range. Stay up to two minutes if the support feels comfortable.",
    ),
    exit: l(
      "Elevá el torso despacio y ayudá a las piernas con las manos.",
      "Slowly lift the torso and support the legs with your hands.",
    ),
    rebound: l(
      "Descansá de 30 a 60 segundos en una posición cómoda antes de continuar.",
      "Rest for 30–60 seconds in a comfortable position before continuing.",
    ),
    benefits: l(
      "Oportunidad para observar sensaciones y quietud.",
      "An opportunity to observe sensations and stillness.",
    ),
    commonMistakes: l(
      "Acercar demasiado los talones o forzar el pliegue hasta perder el apoyo del torso.",
      "Bringing the heels too close or forcing the fold until the torso loses support.",
    ),
    contraindications: butterflyCaution,
    modifications: l(
      "Elevá el cojín y apoyá cada muslo con una manta. Si inclinarte molesta, mantené el torso erguido.",
      "Raise the cushion and support each thigh with a blanket. If folding is uncomfortable, stay upright.",
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
    duration: 90,
    area: l(
      "Parte delantera de la cadera de la pierna de atrás.",
      "Front of the hip of the back leg.",
    ),
    entry: l(
      "Desde cuatro apoyos, adelantá un pie entre las manos. Apoyá la rodilla de atrás sobre una manta y las manos en bloques. Llevá la pelvis un poco hacia adelante hasta encontrar un rango cómodo.",
      "From tabletop, step one foot between the hands. Pad the back knee and support the hands on blocks. Move the pelvis slightly forward to find a comfortable range.",
    ),
    breathing: l(
      "Respirá de manera pareja. Al exhalar, aflojá los hombros sin hundir más la pelvis.",
      "Breathe evenly. Soften the shoulders as you exhale without sinking farther into the hips.",
    ),
    hold: l(
      "Empezá con 30 a 45 segundos por lado. Volvé a cuatro apoyos antes de cambiar.",
      "Start with 30 to 45 seconds per side. Return to tabletop before switching.",
    ),
    caution: l(
      "Salí si el apoyo provoca dolor en la rodilla de atrás o si la cadera delantera se pinza.",
      "Come out if kneeling causes pain in the back knee or if you feel pinching at the front hip.",
    ),
    exit: l(
      "Llevá la pelvis atrás y devolvé el pie a cuatro apoyos.",
      "Shift the hips back and bring the foot back to tabletop.",
    ),
    modification: l(
      "Acortá la zancada y mantené el torso más alto. Si arrodillarte te molesta, descansá sentado.",
      "Shorten the stance and keep the torso higher. If kneeling hurts, choose a seated rest.",
    ),
    commonMistakes: l(
      "Hundirse de golpe en la pelvis, forzar la rodilla trasera o contener la respiración.",
      "Dropping suddenly into the hips, straining the back knee or holding the breath.",
    ),
  },
  {
    id: "sphinx",
    name: l("Esfinge", "Sphinx"),
    sanskrit: "Sālamba Bhujaṅgāsana",
    duration: 60,
    area: l("Parte delantera del torso.", "Front of the torso."),
    entry: l(
      "Acostate boca abajo. Apoyá los antebrazos con los codos debajo o un poco por delante de los hombros. Dejá el pecho apenas elevado y la nuca larga.",
      "Lie on your belly. Place the forearms down with the elbows below or slightly in front of the shoulders. Keep the chest slightly lifted and the back of the neck long.",
    ),
    breathing: l(
      "Respirá hacia los costados de las costillas, con el abdomen relajado.",
      "Breathe into the sides of the ribs with the abdomen relaxed.",
    ),
    hold: l(
      "Empezá con 30 segundos y quedate hasta un minuto si la espalda está cómoda.",
      "Start with 30 seconds and stay up to a minute if your back is comfortable.",
    ),
    caution: l(
      "Bajá si la extensión produce presión lumbar o dolor de hombro. Elegí otra postura si estar boca abajo dificulta respirar.",
      "Lower if the backbend causes low back pressure or shoulder pain. Choose another pose if lying face down makes breathing difficult.",
    ),
    exit: l(
      "Deslizá los codos hacia adelante y bajá el pecho. Girá de lado si necesitás cambiar de posición.",
      "Slide elbows forward and lower the chest. Roll to one side if you need to change position.",
    ),
    modification: l(
      "Alejá los codos para reducir la extensión. Salí si aparece presión en la zona lumbar.",
      "Move the elbows forward to reduce extension. Come out if you feel pressure in the lower back.",
    ),
    commonMistakes: l(
      "Empujar con fuerza los antebrazos o comprimir la zona lumbar para elevar más el pecho.",
      "Pressing hard through the forearms or compressing the lower back to lift the chest higher.",
    ),
  },
  {
    id: "supported-child",
    name: l("Niño con apoyo", "Supported child’s pose"),
    sanskrit: "Bālāsana",
    duration: 90,
    area: l(
      "Espalda y caderas en un rango cómodo.",
      "Back and hips within a comfortable range.",
    ),
    entry: l(
      "Desde cuatro apoyos, desplazá la pelvis hacia los talones hasta donde resulte cómodo. Apoyá el torso y la frente sobre un cojín.",
      "From tabletop, shift hips toward heels as far as comfortable. Rest the torso and forehead on a cushion.",
    ),
    breathing: l(
      "Dejá que se expandan las costillas de atrás. Elevá el cojín si el apoyo te dificulta respirar.",
      "Let the back ribs expand. Raise the cushion if the support makes breathing difficult.",
    ),
    hold: l(
      "Descansá de 45 a 90 segundos si las rodillas y los tobillos están cómodos.",
      "Rest for 45 to 90 seconds if your knees and ankles are comfortable.",
    ),
    caution: l(
      "Salí si la flexión provoca dolor en las rodillas o los tobillos. Podés descansar de lado.",
      "Come out if the bend causes knee or ankle pain. You can rest on your side.",
    ),
    exit: l(
      "Presioná las manos contra el suelo para volver a cuatro apoyos.",
      "Press the hands into the floor to return to tabletop.",
    ),
    modification: l(
      "Usá un cojín más alto o descansá de lado si la flexión de rodillas resulta incómoda.",
      "Use a higher cushion or rest on one side if bending the knees is uncomfortable.",
    ),
    commonMistakes: l(
      "Forzar la pelvis hacia los talones o dejar la cabeza sin apoyo cuando el cuello lo necesita.",
      "Forcing the hips toward the heels or leaving the head unsupported when the neck needs support.",
    ),
  },
  {
    id: "reclined-twist",
    name: l("Torsión tumbada", "Reclined twist"),
    sanskrit: "Supta Matsyendrāsana",
    duration: 90,
    area: l(
      "Costados y rotación suave del tronco.",
      "Side body and gentle trunk rotation.",
    ),
    entry: l(
      "Acostate boca arriba con las rodillas dobladas y los pies apoyados. Bajá las rodillas hacia un lado hasta que descansen sobre un cojín. Dejá el cuello en una posición cómoda.",
      "Lie on your back with knees bent and feet down. Lower your knees to one side until they rest on a cushion. Keep the neck in a comfortable position.",
    ),
    breathing: l(
      "Inhalá hacia el costado superior. Exhalá sin empujar las rodillas hacia el piso.",
      "Inhale into the upper side of the torso. Exhale without pressing the knees down.",
    ),
    hold: l(
      "Quedate de 30 a 45 segundos por lado. Volvé al centro antes de cambiar.",
      "Stay for 30 to 45 seconds per side. Return to center before switching.",
    ),
    caution: l(
      "Volvé al centro si aparece dolor lumbar o si sentís hormigueo en una pierna. Mantené la cabeza neutra si girarla molesta.",
      "Return to center if you feel lower back pain or tingling down a leg. Keep your head neutral if turning is uncomfortable.",
    ),
    exit: l(
      "Con ayuda de las manos, devolvé las rodillas al centro y apoyá los pies.",
      "Use your hands to bring the knees back to center and set the feet down.",
    ),
    modification: l(
      "Elevá el cojín o dejá ambos pies en el suelo y reducí el giro.",
      "Raise the cushion or keep both feet on the floor and reduce the rotation.",
    ),
    commonMistakes: l(
      "Empujar las rodillas hacia el suelo o girar el cuello más allá de un rango cómodo.",
      "Pressing the knees toward the floor or turning the neck beyond a comfortable range.",
    ),
  },
];

yin.push(
  ...quietPoses.map(
    ({
      id,
      name,
      sanskrit,
      duration,
      area,
      entry,
      breathing,
      hold,
      caution,
      exit,
      modification,
      commonMistakes,
    }): YinPose => ({
      ...base(id, name.es, name.en, "Supported", area),
      kind: "yin",
      sanskrit,
      instructionSteps: splitInstructionSteps(entry),
      image: `/images/poses/${id}.svg`,
      thumbnail: `/images/poses/${id}.svg`,
      duration,
      breathing,
      safety: caution,
      targetArea: area,
      meridians: l(
        "Las asociaciones varían según la escuela de Yin.",
        "Associations vary between Yin schools.",
      ),
      entry,
      hold,
      exit,
      rebound: l(
        "Descansá unos instantes en una posición neutra antes de continuar.",
        "Rest briefly in a neutral position before continuing.",
      ),
      benefits: l(
        "Explorar el apoyo y observar las sensaciones con calma.",
        "Explore support and notice sensations at an unhurried pace.",
      ),
      commonMistakes,
      contraindications: caution,
      modifications: modification,
      props: l(
        "Cojín, manta y bloques según la postura.",
        "Cushion, blanket and blocks as needed.",
      ),
      relatedIds: ["savasana"],
    }),
  ),
);

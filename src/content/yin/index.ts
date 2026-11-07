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
    duration: 300,
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
      "Para esta práctica, comenzá con 3 minutos en un rango suave y quedate hasta 5 solo si respirar y salir siguen siendo cómodos.",
      "For this practice, begin with 3 minutes in an easy range and stay up to 5 only if breathing and leaving remain comfortable.",
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
    meridians: l("Estómago y bazo en algunas cartografías Yin tradicionales.", "Stomach and spleen in some traditional Yin maps."),
    recommendedProps: l("Manta bajo la rodilla trasera; bloques bajo las manos.", "Blanket under the back knee; blocks under the hands."),
    name: l("Dragón bajo", "Low dragon"),
    sanskrit: "Añjaneyāsana",
    duration: 360,
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
      "Sostené hasta 3 minutos por lado si resulta tolerable; el temporizador de la secuencia reserva 6 minutos para ambos lados, salida y pausa. Volvé a cuatro apoyos antes de cambiar.",
      "Stay up to 3 minutes per side if tolerable; the sequence timer reserves 6 minutes for both sides, exit, and pause. Return to tabletop before switching.",
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
    meridians: l("Vejiga y riñón como referencias tradicionales de la línea posterior.", "Bladder and kidney as traditional references for the back-body line."),
    recommendedProps: l("Bolster bajo los antebrazos o pecho; manta bajo la pelvis.", "Bolster under the forearms or chest; blanket under the pelvis."),
    name: l("Esfinge", "Sphinx"),
    sanskrit: "Sālamba Bhujaṅgāsana",
    duration: 240,
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
      "Comenzá con 3 minutos como máximo y acortá la permanencia si la espalda no se siente cómoda.",
      "Begin with up to 3 minutes and shorten the hold if your back does not feel comfortable.",
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
    meridians: l("Vejiga y riñón en mapas tradicionales; no son estructuras anatómicas.", "Bladder and kidney in traditional maps; these are not anatomical structures."),
    recommendedProps: l("Bolster bajo torso y frente; manta bajo tobillos.", "Bolster under the torso and forehead; blanket under the ankles."),
    name: l("Niño con apoyo", "Supported child’s pose"),
    sanskrit: "Bālāsana",
    duration: 180,
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
    meridians: l("Vesícula biliar en algunas escuelas Yin, como referencia tradicional no biomédica.", "Gallbladder in some Yin schools, as a traditional, non-biomedical reference."),
    recommendedProps: l("Bolster bajo las rodillas y manta bajo la cabeza.", "Bolster under the knees and blanket under the head."),
    name: l("Torsión tumbada", "Reclined twist"),
    sanskrit: "Supta Matsyendrāsana",
    duration: 360,
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
      "Sostené hasta 3 minutos por lado solo si no hay dolor ni hormigueo. Volvé al centro y descansá antes de cambiar; el paso de secuencia incluye ambos lados y la transición.",
      "Stay for up to 3 minutes per side only if there is no pain or tingling. Return to center and rest before switching; the sequence step includes both sides and the transition.",
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
  {
    id: "caterpillar", name: l("Oruga", "Caterpillar"), sanskrit: "Paścimottānāsana", duration: 240,
    meridians: l("Vejiga y riñón en algunas cartografías Yin tradicionales; no son estructuras anatómicas.", "Bladder and kidney in some traditional Yin maps; these are not anatomical structures."),
    recommendedProps: l("Bolster sobre los muslos, manta bajo la pelvis y bloques bajo las manos.", "Bolster across the thighs, blanket under the pelvis, blocks under the hands."),
    area: l("Cadena posterior y zona lumbar, sin buscar el máximo rango.", "Back body and lower back, without seeking maximum range."),
    entry: l("Sentate con las piernas extendidas y una manta bajo la pelvis. Flexioná las rodillas y apoyá el torso sobre un bolster.", "Sit with legs extended and a blanket under the pelvis. Soften the knees and rest the torso on a bolster."),
    breathing: l("Respirá con amplitud; no empujes el abdomen contra las piernas.", "Keep the breath spacious; do not press the abdomen into the legs."),
    hold: l("Empezá con 1–3 minutos; hasta 5 solo si no hay dolor ni hormigueo.", "Begin with 1–3 minutes; up to 5 only without pain or tingling."),
    caution: l("Salí ante dolor agudo, adormecimiento o tirón detrás de la rodilla.", "Come out for sharp pain, numbness, or pulling behind the knee."),
    exit: l("Dobla las rodillas, apoya las manos y eleva el torso lentamente.", "Bend the knees, place your hands down, and lift the torso slowly."),
    modification: l("Dobla más las rodillas y eleva la pelvis sobre una manta.", "Bend the knees more and raise the pelvis on a blanket."),
    commonMistakes: l("Tirar de los pies o redondear buscando profundidad.", "Pulling on the feet or rounding to seek depth."),
  },
  {
    id: "shoelace", name: l("Cordones", "Shoelace"), sanskrit: "Gomukhāsana (piernas)", duration: 240,
    meridians: l("Hígado y vesícula biliar en algunas escuelas Yin, como referencia tradicional.", "Liver and gallbladder in some Yin schools, as a traditional reference."),
    recommendedProps: l("Bolster o manta para elevar la pelvis; manta entre rodillas si hace falta.", "Bolster or blanket to raise the pelvis; blanket between knees if needed."),
    area: l("Caderas externas y glúteos; evita comprimir la rodilla.", "Outer hips and glutes; avoid compressing the knee."),
    entry: l("Sentate y cruza una pierna sobre la otra sin apilar las rodillas a la fuerza. Apoya la pelvis sobre un cojín.", "Sit and cross one leg over the other without forcing the knees to stack. Support the pelvis on a cushion."),
    breathing: l("Deja el abdomen libre y respira sin contener el aire.", "Keep the abdomen free and breathe without holding the breath."),
    hold: l("Mantén 1–3 minutos por lado, con una pausa neutra entre lados.", "Hold 1–3 minutes per side, with a neutral pause between sides."),
    caution: l("No fuerces la rodilla; sal si hay presión articular, dolor o cosquilleo.", "Do not force the knee; leave for joint pressure, pain, or tingling."),
    exit: l("Descruza las piernas con las manos y descansa antes de cambiar.", "Uncross the legs with your hands and rest before switching."),
    modification: l("Siéntate sobre un bolster y deja las rodillas más separadas.", "Sit on a bolster and keep the knees farther apart."),
    commonMistakes: l("Empujar una rodilla hacia abajo o inclinarse con dolor.", "Pressing a knee down or folding into pain."),
  },
  {
    id: "banana-pose", name: l("Plátano", "Banana"), sanskrit: null, duration: 240,
    meridians: l("Vesícula biliar en el mapa tradicional de la línea lateral; no equivale a anatomía demostrada.", "Gallbladder in the traditional side-body map; this is not established anatomy."),
    recommendedProps: l("Manta bajo la cabeza o rodillas y correa floja alrededor de los tobillos, si ayuda.", "Blanket under the head or knees; a loose strap around the ankles if useful."),
    area: l("Costado del tronco, cintura y cara externa de la cadera.", "Side body, waist, and outer hip."),
    entry: l("Túmbate boca arriba. Desplaza pies y hombros unos centímetros hacia un lado hasta formar una curva cómoda.", "Lie on your back. Shift feet and shoulders a few inches to one side to make a comfortable curve."),
    breathing: l("Dirige la respiración al costado sin elevar las costillas con esfuerzo.", "Breathe toward the side without forcefully lifting the ribs."),
    hold: l("Permanece 2–4 minutos y cambia de lado con cuidado.", "Stay 2–4 minutes and change sides carefully."),
    caution: l("Sal si aparece dolor lumbar, hormigueo o dificultad respiratoria.", "Leave for back pain, tingling, or difficulty breathing."),
    exit: l("Vuelve al centro, descansa unos segundos y endereza el cuerpo.", "Return to center, rest briefly, and straighten the body."),
    modification: l("Mantén las piernas paralelas y usa una manta bajo las rodillas.", "Keep the legs parallel and place a blanket under the knees."),
    commonMistakes: l("Girar la pelvis o tirar del brazo para intensificar el costado.", "Rolling the pelvis or pulling the arm to intensify the side stretch."),
  },
  {
    id: "melting-heart", name: l("Corazón que se derrite", "Melting heart"), sanskrit: "Anāhatāsana", duration: 240,
    meridians: l("Pulmón y corazón en algunas cartografías tradicionales; asociación simbólica, no anatomía.", "Lung and heart in some traditional maps; a symbolic association, not anatomy."),
    recommendedProps: l("Bolster bajo pecho y frente; manta bajo las rodillas.", "Bolster under chest and forehead; blanket under the knees."),
    area: l("Hombros, axilas y parte torácica de la columna.", "Shoulders, armpits, and thoracic spine."),
    entry: l("Desde cuatro apoyos, mantén las caderas sobre las rodillas y camina las manos al frente. Apoya frente y pecho sobre un bolster.", "From tabletop, keep hips over knees and walk the hands forward. Rest forehead and chest on a bolster."),
    breathing: l("Respira hacia la espalda; conserva espacio para el cuello.", "Breathe into the back body and keep space for the neck."),
    hold: l("Empieza con 1–3 minutos; reduce el tiempo si los hombros se tensan.", "Begin with 1–3 minutes; shorten the hold if the shoulders strain."),
    caution: l("Sal ante dolor de hombro, hormigueo en brazos o presión cervical.", "Leave for shoulder pain, arm tingling, or neck pressure."),
    exit: l("Presiona el suelo, vuelve a cuatro apoyos y siéntate sobre los talones solo si es cómodo.", "Press the floor, return to tabletop, and sit back only if comfortable."),
    modification: l("Apoya el pecho alto y deja los codos flexionados.", "Support the chest higher and keep the elbows bent."),
    commonMistakes: l("Dejar caer el abdomen o forzar los hombros hacia el suelo.", "Letting the abdomen drop or forcing the shoulders toward the floor."),
  },
  {
    id: "saddle", name: l("Silla de montar", "Saddle"), sanskrit: "Supta Vīrāsana (variación Yin)", duration: 180,
    meridians: l("Estómago y bazo en algunas asociaciones Yin tradicionales.", "Stomach and spleen in some traditional Yin associations."),
    recommendedProps: l("Bolster alto detrás del torso y manta bajo rodillas y tobillos.", "High bolster behind the torso; blanket under knees and ankles."),
    area: l("Muslos anteriores y flexores de cadera; carga la flexión de rodilla.", "Front thighs and hip flexors; this loads knee flexion."),
    entry: l("Arrodíllate con una manta bajo las rodillas y siéntate entre los talones solo si no hay presión. Reclínate sobre un bolster alto.", "Kneel with a blanket under the knees and sit between the heels only without pressure. Recline onto a high bolster."),
    breathing: l("Respira naturalmente y mantén el pecho cómodo.", "Breathe naturally and keep the chest comfortable."),
    hold: l("Empieza con 1–2 minutos; esta forma no requiere una permanencia larga.", "Begin with 1–2 minutes; this shape does not require a long hold."),
    caution: l("Evítala con molestias de rodilla o tobillo; sal de inmediato ante dolor o entumecimiento.", "Avoid with knee or ankle concerns; leave immediately for pain or numbness."),
    exit: l("Usa las manos para incorporarte y vuelve a cuatro apoyos antes de extender las piernas.", "Use your hands to rise and return to tabletop before extending the legs."),
    modification: l("Mantén el torso vertical o elige una postura alternativa; no te sientes entre los talones.", "Keep the torso upright or choose another pose; do not sit between the heels."),
    commonMistakes: l("Forzar flexión de rodilla o bajar sin apoyo suficiente.", "Forcing knee flexion or reclining without enough support."),
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
      meridians: meridianNotes,
      recommendedProps,
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
      meridians: meridianNotes ?? l(
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
      props: recommendedProps ?? l(
        "Cojín, manta y bloques según la postura.",
        "Cushion, blanket and blocks as needed.",
      ),
      relatedIds: ["savasana"],
    }),
  ),
);

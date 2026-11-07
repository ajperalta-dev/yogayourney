import type { Asana } from "@/lib/models";
import { l } from "@/lib/utils";
import { base, splitInstructionSteps } from "../shared";

type AsanaEntry = Pick<
  Asana,
  | "id"
  | "sanskrit"
  | "name"
  | "category"
  | "duration"
  | "instructions"
  | "hold"
  | "breathing"
  | "commonMistakes"
  | "modifications"
  | "contraindications"
  | "drishti"
  | "benefits"
> & {
  imageRoot?: "/images" | "/images/poses";
  level?: Asana["level"];
};

function pose({
  imageRoot = "/images/poses",
  level = "beginner",
  ...entry
}: AsanaEntry): Asana {
  const { id, name, category, benefits, instructions, contraindications } = entry;
  const anatomyIds =
    ["Relaxation", "Balance"].includes(category) ||
    ["urdhva-hastasana", "bhujangasana", "urdhva-mukha-svanasana"].includes(id)
    ? []
    : ["hip-joint"];
  return {
    ...base(id, name.es, name.en, category, benefits),
    ...entry,
    kind: "asana",
    level,
    categories: [category],
    image: `${imageRoot}/${id}.svg`,
    thumbnail: `${imageRoot}/${id}.svg`,
    instructionSteps: splitInstructionSteps(instructions),
    safety: contraindications,
    anatomyIds,
    teachingCues: l(
      "Mostrá primero la opción con apoyo. Dejá tiempo para que cada persona ajuste la postura.",
      "Show the supported option first. Give each person time to adjust the pose.",
    ),
    preparatoryPoseIds: id === "tadasana" ? [] : ["tadasana"],
    counterposeIds: id === "savasana" ? [] : ["savasana"],
    notes: l(
      "El intervalo del temporizador también puede incluir la entrada, la salida y una pausa.",
      "The timer interval can also include entry, exit, and a rest.",
    ),
    tags: [category, "asana", ...(anatomyIds.length ? ["hip", "cadera"] : [])],
  };
}

export const asanas: Asana[] = [
  pose({
    id: "tadasana",
    sanskrit: "Tāḍāsana",
    name: l("Montaña", "Mountain"),
    category: "Standing",
    duration: 25,
    imageRoot: "/images/poses",
    instructions: l(
      "Parate con los pies paralelos y repartí el peso entre los talones y la base de los dedos. Aflojá las rodillas y dejá los brazos a los lados.",
      "Stand with your feet parallel and share the weight between your heels and the bases of your toes. Soften the knees and let the arms rest by your sides.",
    ),
    hold: l(
      "Mantené 3 a 5 respiraciones cómodas.",
      "Stay for 3 to 5 easy breaths.",
    ),
    breathing: l(
      "Respirá sin levantar los hombros.",
      "Breathe without lifting the shoulders.",
    ),
    commonMistakes: l(
      "Bloquear las rodillas o desplazar todo el peso a los talones.",
      "Locking the knees or shifting all weight into the heels.",
    ),
    modifications: l(
      "Separá los pies al ancho de caderas y apoyá una mano en la pared.",
      "Set your feet hip width apart and rest one hand on a wall.",
    ),
    contraindications: l(
      "Si perdés estabilidad o aparece mareo, usá un apoyo y sentate si lo necesitás.",
      "If you feel unsteady or dizzy, use support and sit down if needed.",
    ),
    drishti: l(
      "Mirada al frente, a la altura de los ojos.",
      "Look straight ahead at eye level.",
    ),
    benefits: l(
      "Sentí cómo se reparte el peso al estar de pie.",
      "Notice how your weight is distributed while standing.",
    ),
  }),
  pose({
    id: "utthita-trikonasana",
    sanskrit: "Utthita Trikoṇāsana",
    name: l("Triángulo extendido", "Extended triangle"),
    category: "Standing",
    duration: 40,
    imageRoot: "/images/poses",
    instructions: l(
      "Separá los pies y girá el pie delantero hacia afuera. Alargá el torso sobre la pierna delantera y apoyá la mano en un bloque. Volvé al centro y cambiá de lado.",
      "Step the feet apart and turn the front foot out. Reach your torso over the front leg and rest your hand on a block. Return to center and change sides.",
    ),
    hold: l(
      "Quedate 2 a 3 respiraciones por lado.",
      "Stay for 2 to 3 breaths on each side.",
    ),
    breathing: l(
      "Inhalá para alargar el tronco. Exhalá sin hundir la cintura inferior.",
      "Inhale to lengthen the torso. Exhale without collapsing the lower waist.",
    ),
    commonMistakes: l(
      "Trabar la rodilla delantera o girar la cabeza para alcanzar la mano de arriba.",
      "Locking the front knee or twisting the head to look at the upper hand.",
    ),
    modifications: l(
      "Apoyá la mano inferior en un bloque alto y dejá la otra en la cadera.",
      "Rest the lower hand on a high block and keep the other hand on the hip.",
    ),
    contraindications: l(
      "Reducí el rango si sentís tirantez detrás de la rodilla. Mirá al frente o al suelo si molesta el cuello.",
      "Reduce the range if you feel pulling behind the knee. Look forward or down if your neck is uncomfortable.",
    ),
    drishti: l(
      "Mirá al frente o hacia el suelo.",
      "Look forward or down.",
    ),
    benefits: l(
      "Explorá el equilibrio y el alargamiento lateral del tronco.",
      "Explore balance and length along the sides of the torso.",
    ),
  }),
  pose({
    id: "padangusthasana",
    sanskrit: "Pādāṅguṣṭhāsana",
    name: l("Flexión con agarre de dedos", "Big toe pose"),
    category: "Forward bends",
    duration: 25,
    imageRoot: "/images/poses",
    instructions: l(
      "Flexioná las caderas con las rodillas blandas. Si llegás sin tirar, tomá los dedos gordos de los pies con las manos. Soltá el agarre y volvé a subir despacio.",
      "Fold at the hips with soft knees. If you can reach without pulling, hold your big toes with your hands. Release the grip and rise slowly.",
    ),
    hold: l(
      "Tomá 2 a 4 respiraciones cómodas antes de subir.",
      "Take 2 to 4 easy breaths before rising.",
    ),
    breathing: l(
      "Inhalá para alargar el pecho y exhalá al inclinarte.",
      "Inhale to lengthen through the chest and exhale as you fold.",
    ),
    commonMistakes: l(
      "Tirar de los dedos para acercar la cabeza a las piernas.",
      "Pulling on the toes to draw the head toward the legs.",
    ),
    modifications: l(
      "Flexioná las rodillas y apoyá las manos en bloques en vez de tomar los dedos.",
      "Bend the knees and place your hands on blocks instead of holding the toes.",
    ),
    contraindications: l(
      "Si hay dolor lumbar o detrás del muslo, probá una media flexión con apoyo. Subí despacio si tendés a marearte.",
      "If your lower back or the back of your thigh hurts, try a supported half fold. Rise slowly if you tend to feel dizzy.",
    ),
    drishti: l(
      "Mirá hacia el suelo, con el cuello relajado.",
      "Look down with a relaxed neck.",
    ),
    benefits: l(
      "Practicá la flexión desde las caderas con las piernas apoyadas.",
      "Practice hinging at the hips with steady footing.",
    ),
  }),
  pose({
    id: "pada-hastasana",
    sanskrit: "Pāda Hastāsana",
    name: l("Manos bajo los pies", "Hand under foot pose"),
    category: "Forward bends",
    duration: 20,
    imageRoot: "/images/poses",
    instructions: l(
      "Incliná el torso desde las caderas con las rodillas dobladas. Si llegás con comodidad, deslizá las palmas boca arriba debajo de la parte delantera de los pies. Retirá las manos antes de subir.",
      "Hinge at the hips with the knees bent. If you can comfortably reach, slide the hands palms up under the front of the feet. Release the hands before rising.",
    ),
    hold: l(
      "Mantené 2 a 3 respiraciones sin cargar las muñecas.",
      "Stay for 2 to 3 breaths without loading the wrists.",
    ),
    breathing: l(
      "Exhalá al plegarte. Inhalá al preparar la salida.",
      "Exhale as you fold. Inhale to prepare to come out.",
    ),
    commonMistakes: l(
      "Desplazar el peso sobre las manos o estirar las rodillas a la fuerza.",
      "Shifting your weight onto your hands or forcing the knees straight.",
    ),
    modifications: l(
      "Dejá las manos sobre bloques y las rodillas dobladas.",
      "Keep your hands on blocks and your knees bent.",
    ),
    contraindications: l(
      "Evitá el agarre bajo los pies si hay dolor, hormigueo o una lesión de muñeca. Soltá las manos antes de subir.",
      "Skip the underfoot grip with wrist pain, tingling, or injury. Release your hands before rising.",
    ),
    drishti: l(
      "Dejá la mirada hacia el suelo.",
      "Let your gaze rest on the floor.",
    ),
    benefits: l(
      "Explorá una flexión de pie con un apoyo diferente de las manos.",
      "Explore a standing fold with a different hand position.",
    ),
  }),
  pose({
    id: "baddha-konasana",
    sanskrit: "Baddha Koṇāsana",
    name: l("Ángulo unido", "Bound angle"),
    category: "Sitting",
    duration: 35,
    imageRoot: "/images/poses",
    instructions: l(
      "Sentate y juntá las plantas de los pies a una distancia cómoda de la pelvis. Apoyá las manos en los tobillos y alargá el torso sobre el asiento. Juntá las rodillas con ayuda de las manos al salir.",
      "Sit and bring the soles together at a comfortable distance from the pelvis. Rest your hands on your ankles and lengthen up from the seat. Use your hands to help bring the knees together as you come out.",
    ),
    hold: l(
      "Quedate 4 a 6 respiraciones con el torso erguido.",
      "Stay upright for 4 to 6 breaths.",
    ),
    breathing: l(
      "Inhalá para crecer desde el asiento. Exhalá y aflojá los hombros.",
      "Inhale to lengthen up from the seat. Exhale and soften the shoulders.",
    ),
    commonMistakes: l(
      "Empujar las rodillas hacia abajo o tirar de los pies para acercar los talones.",
      "Pressing the knees down or pulling the feet to bring the heels closer.",
    ),
    modifications: l(
      "Elevá el asiento con una manta y apoyá cada muslo en un bloque.",
      "Sit on a folded blanket and support each thigh on a block.",
    ),
    contraindications: l(
      "Separá más los talones de la pelvis si aparece presión en las rodillas. Salí si el dolor persiste.",
      "Move your heels farther from the pelvis if you feel knee pressure. Come out if the pain continues.",
    ),
    drishti: l(
      "Mirá al frente sin levantar el mentón.",
      "Look forward without lifting the chin.",
    ),
    benefits: l(
      "Explorá la apertura de caderas con el torso erguido.",
      "Explore hip opening with the torso upright.",
    ),
  }),
  pose({
    id: "bhujangasana",
    sanskrit: "Bhujaṅgāsana",
    name: l("Cobra baja", "Low cobra"),
    category: "Backbends",
    duration: 20,
    imageRoot: "/images/poses",
    instructions: l(
      "Acostate boca abajo y poné las palmas junto a las costillas. Despegá apenas el pecho con los codos cerca del torso y la pelvis apoyada. Bajá despacio.",
      "Lie on your belly and place the palms beside your ribs. Lift the chest slightly with your elbows close to the torso and the pelvis down. Lower slowly.",
    ),
    hold: l(
      "Elevá el pecho durante una inhalación y bajá al exhalar. Descansá antes de repetir.",
      "Lift the chest for one inhale and lower on the exhale. Rest before repeating.",
    ),
    breathing: l(
      "Inhalá al despegar el pecho. Exhalá al volver al suelo.",
      "Inhale to lift the chest. Exhale to lower to the floor.",
    ),
    commonMistakes: l(
      "Estirar los codos a la fuerza o llevar la cabeza muy atrás.",
      "Forcing the elbows straight or tipping the head far back.",
    ),
    modifications: l(
      "Elevá el pecho apenas unos centímetros y mantené los codos flexionados.",
      "Lift your chest just a few centimeters and keep your elbows bent.",
    ),
    contraindications: l(
      "Salí si aparece presión lumbar o dolor en hombros o muñecas. Si estar boca abajo te resulta incómodo, elegí una variante de pie.",
      "Come out if you feel lower back pressure or shoulder or wrist pain. If lying prone is uncomfortable, choose a standing option.",
    ),
    drishti: l(
      "Mirá al suelo, un poco por delante de la esterilla.",
      "Look down just beyond the mat.",
    ),
    benefits: l(
      "Practicá una extensión suave con la pelvis apoyada.",
      "Practice a gentle backbend with the pelvis supported.",
    ),
  }),
  pose({
    id: "sukhasana",
    sanskrit: "Sukhāsana",
    name: l("Asiento cómodo", "Easy seat"),
    category: "Sitting",
    duration: 45,
    imageRoot: "/images/poses",
    instructions: l(
      "Sentate sobre una manta con las piernas cruzadas sin esfuerzo. Apoyá las manos en los muslos y enderezá suavemente el torso. Descruzá las piernas despacio al salir.",
      "Sit on a blanket with your legs comfortably crossed. Rest your hands on your thighs and gently lengthen the torso. Uncross your legs slowly to come out.",
    ),
    hold: l(
      "Quedate 5 a 8 respiraciones y cambiá el cruce al repetir.",
      "Stay for 5 to 8 breaths and switch the crossing when you repeat.",
    ),
    breathing: l(
      "Respirá a tu ritmo. Dejá que el abdomen se mueva sin empujarlo.",
      "Breathe at your own pace and let the abdomen move naturally.",
    ),
    commonMistakes: l(
      "Forzar las rodillas hacia abajo o mantener un cruce que provoca adormecimiento.",
      "Pressing the knees down or keeping a leg crossing that causes numbness.",
    ),
    modifications: l(
      "Sentate sobre una manta doblada o en una silla con ambos pies apoyados.",
      "Sit on a folded blanket or use a chair with both feet supported.",
    ),
    contraindications: l(
      "Si aparece dolor en las rodillas u hormigueo en las piernas, descruzalas y cambiá de apoyo.",
      "If you feel knee pain or tingling in the legs, uncross them and change your support.",
    ),
    drishti: l(
      "Bajá la mirada o cerrá los ojos si te sentís estable.",
      "Lower your gaze or close your eyes if you feel steady.",
    ),
    benefits: l(
      "Encontrá un asiento estable para empezar o cerrar una práctica.",
      "Find a steady seat to open or close a practice.",
    ),
  }),
  pose({
    id: "savasana",
    sanskrit: "Śavāsana",
    name: l("Descanso consciente", "Resting pose"),
    category: "Relaxation",
    duration: 90,
    imageRoot: "/images/poses",
    instructions: l(
      "Acostate boca arriba con las piernas cómodamente separadas. Dejá descansar los brazos y apoyá las rodillas si lo necesitás. Para salir, doblá las rodillas, girá de lado y usá las manos para volver a sentarte.",
      "Lie on your back with your legs comfortably apart. Rest your arms and support your knees if needed. Bend the knees, roll onto one side, and press up with your hands to finish.",
    ),
    hold: l(
      "Descansá el tiempo previsto y girá de lado antes de incorporarte.",
      "Rest for the planned time and roll to one side before sitting up.",
    ),
    breathing: l(
      "Dejá que la respiración encuentre su propio ritmo.",
      "Let the breath find its own rhythm.",
    ),
    commonMistakes: l(
      "Sostener la cabeza o las piernas con esfuerzo en vez de usar apoyo.",
      "Holding the head or legs up through effort instead of using support.",
    ),
    modifications: l(
      "Poné un cojín bajo las rodillas o descansá de lado con apoyo entre ellas.",
      "Place a cushion under your knees or rest on your side with support between them.",
    ),
    contraindications: l(
      "Si boca arriba te falta el aire, sentís mareo o molestias, cambiá de posición. En el embarazo, usá la variante de lado si acostarte boca arriba te incomoda o te indicaron evitarlo.",
      "If lying on your back causes breathlessness, dizziness, or discomfort, change positions. During pregnancy, rest on your side if lying on your back feels uncomfortable or you have been advised to avoid it.",
    ),
    drishti: l(
      "Cerrá los ojos o dejá la mirada suave hacia arriba.",
      "Close your eyes or soften your gaze upward.",
    ),
    benefits: l(
      "Usá el apoyo del suelo para descansar al final de la práctica.",
      "Use the support of the floor to rest at the end of practice.",
    ),
  }),
  pose({
    id: "urdhva-hastasana",
    sanskrit: "Ūrdhva Hastāsana",
    name: l("Brazos elevados", "Upward salute"),
    category: "Standing",
    duration: 15,
    instructions: l(
      "Partí de Montaña y elevá los brazos hasta una altura cómoda. Mantené las costillas sobre la pelvis. Bajá los brazos con control.",
      "Start in Mountain and lift the arms to a comfortable height. Keep the ribs over the pelvis. Lower the arms with control.",
    ),
    hold: l(
      "Hacé 1 a 3 elevaciones lentas, una por respiración.",
      "Take 1 to 3 slow lifts, one per breath.",
    ),
    breathing: l(
      "Inhalá al elevar los brazos y exhalá al bajarlos.",
      "Inhale as the arms rise and exhale as they lower.",
    ),
    commonMistakes: l(
      "Arquear la cintura o encoger los hombros para elevar más los brazos.",
      "Arching the lower back or shrugging to raise the arms higher.",
    ),
    modifications: l(
      "Elevá los brazos hasta la altura de los hombros o abrilos un poco más.",
      "Raise the arms to shoulder height or widen them slightly.",
    ),
    contraindications: l(
      "Reducí la altura si aparece un pinchazo en el hombro. Mantené la cabeza neutra si molesta el cuello.",
      "Lower the arms if you feel pinching in the shoulder. Keep your head neutral if the neck is uncomfortable.",
    ),
    drishti: l(
      "Mirá al frente con el mentón neutro.",
      "Look ahead with the chin neutral.",
    ),
    benefits: l(
      "Coordiná la elevación de brazos con el apoyo firme de los pies.",
      "Coordinate an overhead reach with steady feet.",
    ),
  }),
  pose({
    id: "uttanasana",
    sanskrit: "Uttānāsana",
    name: l("Flexión de pie", "Standing forward fold"),
    category: "Forward bends",
    duration: 25,
    instructions: l(
      "Doblá un poco las rodillas e incliná el torso desde las caderas. Apoyá las manos en bloques o en una silla firme. Alargá la espalda antes de volver a subir.",
      "Soften the knees and hinge forward at the hips. Rest your hands on blocks or a sturdy chair. Lengthen your back before rising.",
    ),
    hold: l(
      "Quedate 2 a 4 respiraciones con apoyo estable.",
      "Stay for 2 to 4 breaths with steady support.",
    ),
    breathing: l(
      "Exhalá al plegarte e inhalá para alargar antes de salir.",
      "Exhale into the fold and inhale to lengthen before coming out.",
    ),
    commonMistakes: l(
      "Bloquear las rodillas o rebotar para llegar al suelo.",
      "Locking the knees or bouncing to reach the floor.",
    ),
    modifications: l(
      "Doblá las rodillas y apoyá las manos sobre bloques altos o una silla firme.",
      "Bend the knees and rest your hands on high blocks or a sturdy chair.",
    ),
    contraindications: l(
      "Si bajar la cabeza te marea, usá una media flexión con apoyo y subí despacio.",
      "If lowering your head makes you dizzy, use a supported half fold and rise slowly.",
    ),
    drishti: l(
      "Dejá que la mirada caiga sin tensar el cuello.",
      "Let the gaze drop without tensing the neck.",
    ),
    benefits: l(
      "Practicá el pliegue de pie sin perder el apoyo de los pies.",
      "Practice a standing fold while keeping steady footing.",
    ),
  }),
  pose({
    id: "ardha-uttanasana",
    sanskrit: "Ardha Uttānāsana",
    name: l("Media flexión de pie", "Half forward fold"),
    category: "Forward bends",
    duration: 15,
    instructions: l(
      "Desde la flexión de pie, apoyá las manos en las tibias o en bloques. Alargá el pecho hacia adelante con el cuello en línea con la espalda. Volvé a la flexión sin soltar el apoyo de golpe.",
      "From the standing fold, rest your hands on your shins or on blocks. Reach your chest forward with the neck in line with the back. Return to the fold without dropping into it.",
    ),
    hold: l(
      "Mantené 1 a 2 respiraciones cómodas.",
      "Stay for 1 to 2 easy breaths.",
    ),
    breathing: l(
      "Inhalá al alargar el tronco. Exhalá al volver a la flexión.",
      "Inhale to lengthen the torso. Exhale back into the fold.",
    ),
    commonMistakes: l(
      "Presionar las rótulas o levantar el mentón para buscar más altura.",
      "Pressing on the kneecaps or lifting the chin to come higher.",
    ),
    modifications: l(
      "Apoyá las manos en una silla firme y doblá un poco las rodillas.",
      "Rest the hands on a sturdy chair and bend the knees slightly.",
    ),
    contraindications: l(
      "Elevá el apoyo o reducí la inclinación si aparece dolor lumbar.",
      "Raise the support or reduce the hinge if you feel lower back pain.",
    ),
    drishti: l(
      "Mirá al suelo unos pasos por delante.",
      "Look at the floor a few steps ahead.",
    ),
    benefits: l(
      "Encontrá una espalda larga entre la flexión y la posición de pie.",
      "Find a long back between the standing fold and upright stance.",
    ),
  }),
  pose({
    id: "phalahakasana",
    sanskrit: "Phalakāsana",
    name: l("Plancha", "Plank"),
    category: "Balance",
    duration: 20,
    instructions: l(
      "Partí de cuatro apoyos con las manos bajo los hombros. Extendé una pierna y luego la otra, o dejá ambas rodillas apoyadas. Empujá el suelo con las palmas y mantené la pelvis alineada con el tronco.",
      "Start on hands and knees with hands under shoulders. Extend one leg and then the other, or keep both knees down. Press through the palms and keep your pelvis in line with the torso.",
    ),
    hold: l(
      "Quedate 2 a 3 respiraciones mientras puedas mantener el tronco estable.",
      "Stay for 2 to 3 breaths while you can keep the torso steady.",
    ),
    breathing: l(
      "Respirá continuamente. Exhalá si necesitás volver a apoyar las rodillas.",
      "Keep breathing. Exhale if you need to set the knees down.",
    ),
    commonMistakes: l(
      "Dejar caer la pelvis, encoger los hombros o levantar el mentón.",
      "Letting the pelvis drop, shrugging the shoulders, or lifting the chin.",
    ),
    modifications: l(
      "Apoyá las rodillas o hacé la plancha inclinada contra una pared.",
      "Set the knees down or practice an inclined plank against a wall.",
    ),
    contraindications: l(
      "Reducí la carga si hay dolor en muñecas u hombros. Apoyá las rodillas si perdés el control del tronco.",
      "Reduce the load with wrist or shoulder pain. Set the knees down if you lose control of the torso.",
    ),
    drishti: l(
      "Mirá entre las manos, con la nuca larga.",
      "Look between your hands with the back of the neck long.",
    ),
    benefits: l(
      "Practicá sostener el tronco al cargar peso en manos y pies.",
      "Practice keeping the torso steady while bearing weight on hands and feet.",
    ),
  }),
  pose({
    id: "chaturanga-dandasana",
    sanskrit: "Caturaṅga Daṇḍāsana",
    name: l("Bastón de cuatro apoyos", "Four-limbed staff"),
    category: "Balance",
    duration: 15,
    level: "intermediate",
    instructions: l(
      "Partí de Plancha y apoyá las rodillas si necesitás reducir la carga. Flexioná los codos cerca de las costillas y bajá solo hasta donde mantengas el control. Si apoyaste las rodillas, seguí hasta el suelo para pasar a Cobra baja.",
      "Start in Plank and lower your knees if you need to reduce the load. Keep your elbows close to the ribs and lower only as far as you can control. If your knees are down, continue to the floor to move into Low Cobra.",
    ),
    hold: l(
      "Usá una exhalación para bajar. Dedicá el resto del intervalo a la transición o al descanso.",
      "Lower on one exhale. Use the rest of the interval to transition or rest.",
    ),
    breathing: l(
      "Exhalá durante el descenso y retomá la respiración en el suelo.",
      "Exhale as you lower and resume easy breathing on the floor.",
    ),
    commonMistakes: l(
      "Hundir la pelvis, abrir los codos o bajar los hombros por debajo de los codos.",
      "Letting the pelvis drop, flaring the elbows, or lowering the shoulders below the elbows.",
    ),
    modifications: l(
      "Apoyá las rodillas y bajá al suelo para pasar a Cobra baja. También podés practicar contra la pared.",
      "Set the knees down and lower to the floor to move into Low Cobra. You can also practice against a wall.",
    ),
    contraindications: l(
      "Omití el descenso si causa dolor en muñecas u hombros o si perdés el control antes de tocar el suelo.",
      "Skip the descent if it causes wrist or shoulder pain or if you lose control before reaching the floor.",
    ),
    drishti: l(
      "Mirá al suelo, apenas por delante de las manos.",
      "Look at the floor just beyond your hands.",
    ),
    benefits: l(
      "Practicá un descenso breve y controlado desde Plancha.",
      "Practice a brief, controlled descent from Plank.",
    ),
  }),
  pose({
    id: "urdhva-mukha-svanasana",
    sanskrit: "Ūrdhva Mukha Śvānāsana",
    name: l("Perro boca arriba", "Upward-facing dog"),
    category: "Backbends",
    duration: 15,
    level: "intermediate",
    instructions: l(
      "Colocá las palmas junto a las costillas y apoyá los empeines. Presioná manos y empeines para elevar el pecho, la pelvis y los muslos. Bajá con control o pasá a Cobra baja.",
      "Set the palms beside the ribs with the tops of the feet down. Press through the hands and tops of the feet to lift the chest, pelvis, and thighs. Lower with control or move into Low Cobra.",
    ),
    hold: l(
      "Usá 1 a 2 respiraciones cómodas. Pasá a la variante baja si necesitás descansar.",
      "Stay for 1 to 2 easy breaths. Move to the low version if you need to rest.",
    ),
    breathing: l(
      "Inhalá al elevar el pecho. Exhalá al bajar de forma controlada.",
      "Inhale to lift the chest. Exhale as you lower with control.",
    ),
    commonMistakes: l(
      "Colgar el pecho entre los hombros o elevar el mentón para ganar altura.",
      "Letting the chest sink between the shoulders or lifting the chin to come higher.",
    ),
    modifications: l(
      "Elegí Cobra baja con codos flexionados y pelvis en el suelo.",
      "Choose Low Cobra with bent elbows and the pelvis on the floor.",
    ),
    contraindications: l(
      "Elegí la variante baja o salí si hay presión lumbar o dolor en muñecas u hombros.",
      "Choose the low version or come out if you feel lower back pressure or wrist or shoulder pain.",
    ),
    drishti: l(
      "Mirá al frente sin llevar la cabeza hacia atrás.",
      "Look ahead without tipping the head back.",
    ),
    benefits: l(
      "Explorá una extensión del tronco con apoyo en manos y empeines.",
      "Explore a backbend supported by the hands and tops of the feet.",
    ),
  }),
  pose({
    id: "adho-mukha-svanasana",
    sanskrit: "Adho Mukha Śvānāsana",
    name: l("Perro boca abajo", "Downward-facing dog"),
    category: "Inversions",
    duration: 25,
    instructions: l(
      "Partí de cuatro apoyos y apoyá los dedos de los pies. Llevá la pelvis arriba y atrás con las rodillas algo dobladas. Volvé a apoyar las rodillas para salir.",
      "Start on hands and knees and tuck your toes. Lift the pelvis up and back with the knees slightly bent. Set the knees down to exit.",
    ),
    hold: l(
      "Quedate 3 a 4 respiraciones si podés sostener el apoyo sin esfuerzo excesivo.",
      "Stay for 3 to 4 breaths if you can keep the support without excessive effort.",
    ),
    breathing: l(
      "Exhalá al llevar la pelvis atrás. Después respirá de manera pareja.",
      "Exhale as the pelvis moves back. Then breathe evenly.",
    ),
    commonMistakes: l(
      "Forzar los talones hacia el suelo o dejar caer el peso sobre las muñecas.",
      "Forcing the heels down or letting the weight sink into the wrists.",
    ),
    modifications: l(
      "Flexioná las rodillas o apoyá las manos contra una pared con el torso inclinado.",
      "Bend the knees or place your hands against a wall and hinge forward.",
    ),
    contraindications: l(
      "Elegí la pared si hay dolor de muñecas u hombros. Si la cabeza baja te marea, salí y descansá.",
      "Choose the wall if your wrists or shoulders hurt. Come out and rest if lowering your head makes you dizzy.",
    ),
    drishti: l(
      "Mirá hacia la esterilla entre los pies y las manos.",
      "Look toward the mat between the feet and hands.",
    ),
    benefits: l(
      "Explorá el apoyo de manos y pies mientras alargás la espalda.",
      "Explore support through the hands and feet while lengthening the back.",
    ),
  }),
  pose({
    id: "utkatasana",
    sanskrit: "Utkaṭāsana",
    name: l("Silla", "Chair"),
    category: "Standing",
    duration: 20,
    instructions: l(
      "Parate con los pies paralelos, doblá las rodillas y llevá la pelvis atrás. Dejá las manos en las caderas o estirá los brazos hacia adelante. Presioná ambos pies para volver a subir.",
      "Stand with your feet parallel, bend your knees, and move the pelvis back. Keep your hands on your hips or reach your arms forward. Press through both feet to stand.",
    ),
    hold: l(
      "Mantené 2 a 3 respiraciones cómodas.",
      "Stay for 2 to 3 easy breaths.",
    ),
    breathing: l(
      "Exhalá al flexionar las rodillas. Inhalá al volver a estar de pie.",
      "Exhale to bend the knees. Inhale to stand again.",
    ),
    commonMistakes: l(
      "Juntar las rodillas o despegar los talones al bajar.",
      "Letting the knees fall inward or lifting the heels while lowering.",
    ),
    modifications: l(
      "Flexioná poco y usá una silla firme detrás de vos como referencia.",
      "Use a shallow bend and a sturdy chair behind you as a guide.",
    ),
    contraindications: l(
      "Si molesta la rodilla, reducí la flexión. Si sigue doliendo, volvé a Montaña.",
      "If the knee is uncomfortable, make the bend shallower. If pain continues, return to Mountain.",
    ),
    drishti: l(
      "Mirá al frente, con la nuca larga.",
      "Look ahead with the back of your neck long.",
    ),
    benefits: l(
      "Practicá una flexión de rodillas con el peso repartido en los pies.",
      "Practice bending the knees with weight shared across the feet.",
    ),
  }),
  pose({
    id: "virabhadrasana-i",
    sanskrit: "Vīrabhadrāsana I",
    name: l("Guerrero I", "Warrior I"),
    category: "Standing",
    duration: 35,
    instructions: l(
      "Llevá un pie atrás y apoyá el talón en diagonal. Flexioná la rodilla delantera en la dirección de los dedos y elevá el torso. Volvé al centro y cambiá de lado.",
      "Step one foot back and set the heel down at an angle. Bend the front knee in the direction of the toes and lift the torso. Return to center and change sides.",
    ),
    hold: l(
      "Quedate 2 a 3 respiraciones por lado.",
      "Stay for 2 to 3 breaths on each side.",
    ),
    breathing: l(
      "Inhalá para elevar el torso. Exhalá manteniendo ambos apoyos.",
      "Inhale to lift the torso. Exhale while keeping both feet grounded.",
    ),
    commonMistakes: l(
      "Forzar la pelvis a mirar al frente o dejar que la rodilla delantera caiga hacia dentro.",
      "Forcing the pelvis to face forward or letting the front knee fall inward.",
    ),
    modifications: l(
      "Acortá la zancada, separá un poco más los pies de lado a lado y dejá las manos en las caderas.",
      "Shorten and widen the stance slightly and keep the hands on your hips.",
    ),
    contraindications: l(
      "Si molesta la rodilla delantera o el tobillo trasero, acortá la zancada y reducí la flexión.",
      "If the front knee or rear ankle is uncomfortable, shorten the stance and reduce the bend.",
    ),
    drishti: l(
      "Mirá al frente, incluso si subís los brazos.",
      "Look ahead, even if you raise the arms.",
    ),
    benefits: l(
      "Explorá una zancada estable con el pecho erguido.",
      "Explore a steady lunge with the chest upright.",
    ),
  }),
  pose({
    id: "virabhadrasana-ii",
    sanskrit: "Vīrabhadrāsana II",
    name: l("Guerrero II", "Warrior II"),
    category: "Standing",
    duration: 40,
    instructions: l(
      "Separá los pies y girá el delantero hacia afuera. Flexioná esa rodilla en la dirección de los dedos y abrí los brazos a los lados. Enderezá la pierna antes de cambiar de lado.",
      "Step the feet apart and turn the front foot out. Bend the front knee in the direction of the toes and reach the arms out to the sides. Straighten the leg before changing sides.",
    ),
    hold: l(
      "Mantené 3 a 4 respiraciones por lado.",
      "Stay for 3 to 4 breaths on each side.",
    ),
    breathing: l(
      "Exhalá al doblar la rodilla delantera. Inhalá para alargar el tronco.",
      "Exhale to bend the front knee. Inhale to lengthen the torso.",
    ),
    commonMistakes: l(
      "Inclinar el tronco hacia adelante o dejar caer la rodilla delantera hacia dentro.",
      "Leaning forward or letting the front knee fall inward.",
    ),
    modifications: l(
      "Acortá la postura, doblá menos la rodilla y dejá las manos en la cintura.",
      "Shorten the stance, use a shallower bend, and keep the hands at the waist.",
    ),
    contraindications: l(
      "Si la rodilla duele, enderezala un poco. Si girar la cabeza molesta, mirá al frente.",
      "If your knee hurts, straighten it slightly. If turning the head is uncomfortable, look ahead.",
    ),
    drishti: l(
      "Mirá hacia la mano delantera si el cuello lo permite.",
      "Look toward the front hand if comfortable for the neck.",
    ),
    benefits: l(
      "Encontrá estabilidad en una zancada lateral con el tronco centrado.",
      "Find stability in a wide stance with the torso centered.",
    ),
  }),
  pose({
    id: "utthita-parsvakonasana",
    sanskrit: "Utthita Pārśvakoṇāsana",
    name: l("Ángulo lateral extendido", "Extended side angle"),
    category: "Standing",
    duration: 40,
    instructions: l(
      "Desde Guerrero II, apoyá suavemente el antebrazo en el muslo delantero. Alargá el costado superior con la mano en la cintura o el brazo extendido. Volvé al centro y cambiá de lado.",
      "From Warrior II, rest your forearm lightly on your front thigh. Lengthen the upper side of the torso with your hand at your waist or your arm extended. Return to center and change sides.",
    ),
    hold: l(
      "Quedate 2 a 3 respiraciones por lado.",
      "Stay for 2 to 3 breaths on each side.",
    ),
    breathing: l(
      "Inhalá hacia el costado superior. Exhalá manteniendo el apoyo de ambos pies.",
      "Inhale into the upper side of the torso. Exhale while keeping both feet grounded.",
    ),
    commonMistakes: l(
      "Volcar todo el peso en el antebrazo o dejar que la rodilla delantera se desplace hacia dentro.",
      "Leaning all your weight into the forearm or letting the front knee move inward.",
    ),
    modifications: l(
      "Apoyá el antebrazo suavemente en el muslo y dejá la mano superior en la cintura.",
      "Rest the forearm lightly on the thigh and keep the upper hand at the waist.",
    ),
    contraindications: l(
      "Volvé a Guerrero II si molesta la rodilla. Mantené abajo el brazo superior si el hombro duele.",
      "Return to Warrior II if the knee is uncomfortable. Keep the upper arm down if the shoulder hurts.",
    ),
    drishti: l(
      "Mirá al frente o hacia el suelo.",
      "Look forward or down.",
    ),
    benefits: l(
      "Explorá el alargamiento lateral del tronco desde una zancada.",
      "Explore length along the side of the torso from a lunge.",
    ),
  }),
  pose({
    id: "prasarita-padottanasana",
    sanskrit: "Prasārita Pādottānāsana",
    name: l("Flexión de pie con piernas separadas", "Wide-legged forward fold"),
    category: "Forward bends",
    duration: 30,
    instructions: l(
      "Separá los pies y flexioná las caderas sin trabar las rodillas. Apoyá ambas manos en una silla o en bloques y relajá el cuello. Volvé a subir despacio.",
      "Set your feet wide and hinge at the hips without locking your knees. Rest both hands on a chair or blocks and relax your neck. Rise slowly.",
    ),
    hold: l(
      "Quedate 3 a 5 respiraciones con las manos apoyadas.",
      "Stay for 3 to 5 breaths with the hands supported.",
    ),
    breathing: l(
      "Exhalá al inclinarte e inhalá para alargar el torso antes de subir.",
      "Exhale to fold and inhale to lengthen the torso before rising.",
    ),
    commonMistakes: l(
      "Abrir los pies demasiado o intentar apoyar la cabeza cargando el cuello.",
      "Taking too wide a stance or trying to set the head down and loading the neck.",
    ),
    modifications: l(
      "Acortá la apertura y apoyá las manos en una silla firme.",
      "Narrow your stance and rest your hands on a sturdy chair.",
    ),
    contraindications: l(
      "Usá una inclinación menor si aparece dolor en ingles o detrás de las rodillas. Subí despacio si tendés a marearte.",
      "Use a shallower fold if your groin or the back of the knees hurts. Rise slowly if you tend to feel dizzy.",
    ),
    drishti: l(
      "Mirá al suelo entre las manos.",
      "Look at the floor between the hands.",
    ),
    benefits: l(
      "Practicá un pliegue con una base amplia y apoyo para las manos.",
      "Practice a fold with a wide base and support for the hands.",
    ),
  }),
  pose({
    id: "parsvottanasana",
    sanskrit: "Pārśvottānāsana",
    name: l("Pirámide", "Pyramid"),
    category: "Forward bends",
    duration: 35,
    instructions: l(
      "Da un paso corto hacia atrás, con los pies en dos líneas paralelas. Plegá el torso sobre la pierna delantera con ambas manos apoyadas en bloques. Subí despacio y cambiá de lado.",
      "Take a short step back with your feet on two parallel tracks. Hinge over the front leg with both hands on blocks. Rise slowly and change sides.",
    ),
    hold: l(
      "Mantené 2 a 3 respiraciones por lado.",
      "Stay for 2 to 3 breaths on each side.",
    ),
    breathing: l(
      "Inhalá para alargar el torso y exhalá al inclinarte desde las caderas.",
      "Inhale to lengthen the torso and exhale as you hinge from the hips.",
    ),
    commonMistakes: l(
      "Poner ambos pies en una sola línea o empujar hacia atrás la rodilla delantera.",
      "Placing the feet on a single line or pushing the front knee back.",
    ),
    modifications: l(
      "Separá un poco los pies de lado a lado, doblá la rodilla delantera y usá bloques altos.",
      "Widen the stance slightly, bend the front knee, and use high blocks.",
    ),
    contraindications: l(
      "Reducí la inclinación si hay dolor detrás de la pierna delantera. Usá una silla firme si perdés estabilidad.",
      "Reduce the fold if the back of the front leg hurts. Use a sturdy chair if you feel unsteady.",
    ),
    drishti: l(
      "Mirá hacia los apoyos, con el cuello neutro.",
      "Look toward your supports with the neck neutral.",
    ),
    benefits: l(
      "Explorá el pliegue sobre una pierna sin perder estabilidad.",
      "Explore folding over one leg while keeping your balance.",
    ),
  }),
  pose({
    id: "dandasana",
    sanskrit: "Daṇḍāsana",
    name: l("Bastón sentado", "Seated staff"),
    category: "Sitting",
    duration: 30,
    instructions: l(
      "Sentate con las piernas extendidas y las manos junto a la pelvis. Alargá el torso desde el asiento sin endurecer las rodillas. Apoyá una manta bajo la pelvis si te cuesta mantenerte erguido.",
      "Sit with legs extended and hands beside the pelvis. Lengthen through the torso without stiffening the knees. Sit on a folded blanket if it is hard to stay upright.",
    ),
    hold: l(
      "Mantené 4 a 5 respiraciones cómodas.",
      "Stay for 4 to 5 easy breaths.",
    ),
    breathing: l(
      "Inhalá para alargar la columna. Exhalá sin apretar las piernas.",
      "Inhale to lengthen the spine. Exhale without clenching the legs.",
    ),
    commonMistakes: l(
      "Empujar las rodillas contra el suelo o caer hacia atrás sobre el sacro.",
      "Pressing the knees into the floor or slumping back onto the sacrum.",
    ),
    modifications: l(
      "Elevá el asiento con una manta y doblá un poco las rodillas.",
      "Sit on a folded blanket and bend the knees slightly.",
    ),
    contraindications: l(
      "Si estirar las piernas provoca dolor lumbar o tirantez fuerte, flexioná las rodillas o elegí una silla.",
      "If straightening the legs causes lower back pain or strong pulling, bend the knees or use a chair.",
    ),
    drishti: l(
      "Mirá al frente con el mentón neutro.",
      "Look ahead with the chin neutral.",
    ),
    benefits: l(
      "Encontrá un asiento erguido antes de una flexión o torsión.",
      "Find an upright seat before a fold or twist.",
    ),
  }),
  pose({
    id: "paschimottanasana",
    sanskrit: "Paścimottānāsana",
    name: l("Flexión sentada", "Seated forward fold"),
    category: "Forward bends",
    duration: 35,
    instructions: l(
      "Desde Bastón sentado, doblá un poco las rodillas. Alargá el torso e inclinate desde las caderas. Apoyá las manos en los muslos o tibias sin tirar de los pies.",
      "From Seated Staff, bend your knees slightly. Lengthen the torso and hinge from the hips. Rest your hands on the thighs or shins without pulling on the feet.",
    ),
    hold: l(
      "Quedate 3 a 5 respiraciones con las rodillas flexionadas si hace falta.",
      "Stay for 3 to 5 breaths with the knees bent if needed.",
    ),
    breathing: l(
      "Inhalá para alargar la espalda. Exhalá al inclinarte sin tirar de los pies.",
      "Inhale to lengthen the back. Exhale as you fold without pulling on the feet.",
    ),
    commonMistakes: l(
      "Tirar de los pies con los brazos o forzar las rodillas a quedar estiradas.",
      "Pulling the feet with the arms or forcing the knees straight.",
    ),
    modifications: l(
      "Poné un cojín bajo las rodillas y apoyá las manos en los muslos.",
      "Place a cushion under the knees and rest your hands on your thighs.",
    ),
    contraindications: l(
      "Si aparece dolor lumbar o síntomas que bajan por una pierna, salí del pliegue y volvé a un asiento cómodo.",
      "If you feel lower back pain or symptoms traveling down a leg, come out of the fold and return to a comfortable seat.",
    ),
    drishti: l(
      "Mirá hacia las piernas sin empujar el mentón hacia el pecho.",
      "Look toward the legs without pressing the chin toward the chest.",
    ),
    benefits: l(
      "Practicá una flexión sentada con apoyo para brazos y piernas.",
      "Practice a seated fold with support for the arms and legs.",
    ),
  }),
  pose({
    id: "ardha-matsyendrasana",
    sanskrit: "Ardha Matsyendrāsana",
    name: l("Media torsión sentada", "Half seated twist"),
    category: "Twists",
    duration: 35,
    instructions: l(
      "Sentate con una pierna extendida. Flexioná la otra y apoyá ese pie junto a la pierna extendida. Girá el pecho suavemente hacia la rodilla doblada. Volvé al centro y cambiá de lado.",
      "Sit with one leg extended. Bend the other leg and set that foot next to the extended leg. Turn the chest gently toward the bent knee. Return to center and change sides.",
    ),
    hold: l(
      "Quedate 2 a 3 respiraciones por lado.",
      "Stay for 2 to 3 breaths on each side.",
    ),
    breathing: l(
      "Inhalá para crecer. Exhalá al girar apenas, sin contener el aire.",
      "Inhale to lengthen. Exhale into a small turn without holding your breath.",
    ),
    commonMistakes: l(
      "Usar el brazo como palanca o girar más el cuello que el tronco.",
      "Using the arm as a lever or twisting the neck farther than the torso.",
    ),
    modifications: l(
      "Sentate en una silla con ambos pies apoyados y girá el pecho en un rango pequeño.",
      "Sit on a chair with both feet supported and turn your chest within a small range.",
    ),
    contraindications: l(
      "Evitá profundizar el giro si aparece dolor en la espalda o la cadera. Mantené la mirada al frente si molesta el cuello.",
      "Avoid deepening the twist if your back or hip hurts. Keep looking ahead if your neck is uncomfortable.",
    ),
    drishti: l(
      "Seguí el giro del pecho con la mirada, sin forzar.",
      "Let the gaze follow the chest without strain.",
    ),
    benefits: l(
      "Explorá una rotación suave a partir de un asiento estable.",
      "Explore a gentle rotation from a steady seat.",
    ),
  }),
  pose({
    id: "setu-bandha-sarvangasana",
    sanskrit: "Setu Bandha Sarvāṅgāsana",
    name: l("Puente", "Bridge"),
    category: "Backbends",
    duration: 25,
    instructions: l(
      "Acostate boca arriba y apoyá los pies separados al ancho de caderas. Presioná los pies para levantar un poco la pelvis. Bajá despacio con la cabeza quieta.",
      "Lie on your back and set your feet hip width apart. Press through the feet to lift the pelvis slightly. Lower slowly with your head still.",
    ),
    hold: l(
      "Hacé 2 a 3 elevaciones lentas. Descansá entre ellas si hace falta.",
      "Take 2 to 3 slow lifts. Rest between them if needed.",
    ),
    breathing: l(
      "Inhalá al subir y exhalá al bajar la pelvis con control.",
      "Inhale to lift and exhale to lower the pelvis with control.",
    ),
    commonMistakes: l(
      "Abrir demasiado las rodillas, girar la cabeza o empujar la pelvis muy alto.",
      "Letting the knees spread, turning the head, or pushing the pelvis too high.",
    ),
    modifications: l(
      "Elevá la pelvis apenas unos centímetros y descansá entre repeticiones.",
      "Lift your pelvis just a few centimeters and rest between repetitions.",
    ),
    contraindications: l(
      "Bajá si aparece presión en el cuello o dolor lumbar. Mantené la cabeza quieta hasta volver al suelo.",
      "Lower if you feel neck pressure or lower back pain. Keep the head still until you are back on the floor.",
    ),
    drishti: l(
      "Mirá al techo sin girar la cabeza.",
      "Look at the ceiling without turning your head.",
    ),
    benefits: l(
      "Practicá elevar y bajar la pelvis manteniendo un apoyo estable en los pies.",
      "Practice lifting and lowering the pelvis with steady support through the feet.",
    ),
  }),
  pose({
    id: "viparita-karani",
    sanskrit: "Viparīta Karaṇī",
    name: l("Piernas en la pared", "Legs up the wall"),
    category: "Inversions",
    duration: 60,
    instructions: l(
      "Sentate de lado cerca de una pared y bajá el torso al suelo mientras elevás las piernas. Apoyá las piernas en la pared y dejá la pelvis en el suelo. Doblá las rodillas y girá de lado para salir.",
      "Sit sideways near a wall and lower the torso to the floor as you lift the legs. Rest the legs on the wall and keep the pelvis on the floor. Bend the knees and roll to one side to come out.",
    ),
    hold: l(
      "Quedate hasta un minuto en el rango cómodo y bajá las piernas cuando lo necesites.",
      "Stay up to a minute in a comfortable range and lower the legs when needed.",
    ),
    breathing: l(
      "Respirá sin retenciones y aflojá el abdomen.",
      "Breathe without holding and soften the abdomen.",
    ),
    commonMistakes: l(
      "Acercar demasiado la pelvis a la pared o forzar las rodillas a quedar rectas.",
      "Bringing the pelvis too close to the wall or forcing the knees straight.",
    ),
    modifications: l(
      "Alejate de la pared o apoyá las pantorrillas sobre una silla firme.",
      "Move farther from the wall or rest your calves on a sturdy chair.",
    ),
    contraindications: l(
      "Salí si se adormecen los pies o aparece dolor lumbar, mareo o falta de aire. Girá de lado antes de incorporarte.",
      "Come out if your feet become numb or you feel lower back pain, dizziness, or shortness of breath. Roll onto your side before sitting up.",
    ),
    drishti: l(
      "Mirá hacia el techo o cerrá los ojos si estás cómodo.",
      "Look at the ceiling or close your eyes if comfortable.",
    ),
    benefits: l(
      "Descansá con las piernas elevadas y la pelvis en el suelo.",
      "Rest with the legs elevated and the pelvis on the floor.",
    ),
  }),
];

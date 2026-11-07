import type { AnatomyTopic, Field, Localized } from "@/lib/models";
import { l } from "@/lib/utils";
import { base, field } from "../shared";

type TopicInput = {
  id: string;
  nameEs: string;
  nameEn: string;
  category: string;
  summaryEs: string;
  summaryEn: string;
  structures: Localized;
  movements: Localized;
  muscles: Localized;
  issues: Localized;
  prevention: Localized;
  poseIds: string[];
  tags: string[];
  extraFields?: Field[];
  structuresLabel?: Localized;
};

function stepsField(
  labelEs: string,
  labelEn: string,
  es: string[],
  en: string[],
): Field {
  return { label: l(labelEs, labelEn), steps: { es, en }, group: "anatomy" };
}

function topic(input: TopicInput): AnatomyTopic {
  const record = base(
    input.id,
    input.nameEs,
    input.nameEn,
    input.category,
    l(input.summaryEs, input.summaryEn),
  );

  return {
    ...record,
    kind: "anatomy",
    movements: input.movements,
    muscles: input.muscles,
    asanaIds: input.poseIds,
    relatedIds: input.poseIds,
    tags: input.tags,
    fields: [
      field(
        input.structuresLabel?.es ?? "Huesos y articulaciones principales",
        input.structuresLabel?.en ?? "Key bones and joints",
        input.structures,
        "anatomy",
      ),
      field(
        "Lesiones o molestias frecuentes",
        "Common injuries and symptoms",
        input.issues,
        "safety",
      ),
      field(
        "Prevención en la práctica",
        "Prevention in practice",
        input.prevention,
        "teaching",
      ),
      ...(input.extraFields ?? []),
    ],
  };
}

const movementTypes = stepsField(
  "Cinco familias de movimiento",
  "Five movement families",
  [
    "Flexión: disminuye el ángulo entre dos segmentos, como al doblar la rodilla o plegar el tronco hacia delante.",
    "Extensión: aumenta ese ángulo; la hiperextensión es extensión más allá del rango habitual y no es un objetivo por sí mismo.",
    "Rotación: un segmento gira alrededor de un eje. En cadera y hombro puede ser interna o externa; en el tronco, axial.",
    "Abducción: aleja una extremidad de la línea media; en los dedos, los separa del eje de la mano o del pie.",
    "Aducción: acerca una extremidad a la línea media; en los dedos, los aproxima al eje de la mano o del pie.",
  ],
  [
    "Flexion: decreases the angle between two segments, as when bending a knee or folding the trunk forward.",
    "Extension: increases that angle; hyperextension goes beyond the usual range and is not a goal in itself.",
    "Rotation: a segment turns around an axis. At the hip and shoulder it may be internal or external; through the trunk it is axial.",
    "Abduction: moves a limb away from the midline; in the fingers, it spreads them away from the hand or foot's reference axis.",
    "Adduction: moves a limb toward the midline; in the fingers, it brings them toward the hand or foot's reference axis.",
  ],
);

const glossary = stepsField(
  "Términos clave",
  "Key terms",
  [
    "Articulación: unión entre dos o más huesos; su forma y tejidos guían y limitan el movimiento.",
    "Rango de movimiento: recorrido disponible en una articulación; varía entre personas y posiciones.",
    "Plano sagital: divide el cuerpo en lados derecho e izquierdo; incluye flexión y extensión.",
    "Plano frontal: divide el cuerpo en partes anterior y posterior; incluye abducción y aducción.",
    "Plano transversal: divide el cuerpo en partes superior e inferior; incluye muchas rotaciones.",
    "Estabilidad: capacidad de controlar una posición o movimiento; no significa mantener el cuerpo rígido.",
    "Propiocepción: información sensorial sobre posición y movimiento del cuerpo.",
    "Columna neutra: descripción funcional de curvas cómodas y controladas; no es una forma idéntica para todas las personas.",
    "Fascia: conjunto continuo de tejidos conectivos que envuelven, conectan y separan estructuras.",
    "Suelo pélvico: músculos y tejidos de la base de la pelvis que colaboran en soporte y control de presiones.",
    "Diafragma: músculo principal de la inspiración, situado entre tórax y abdomen.",
    "Sistema nervioso autónomo: redes que regulan funciones involuntarias y se adaptan a las demandas del cuerpo.",
  ],
  [
    "Joint: a connection between two or more bones; its shape and tissues guide and limit movement.",
    "Range of motion: the available path at a joint; it varies between people and positions.",
    "Sagittal plane: divides the body into right and left sides; it includes flexion and extension.",
    "Frontal plane: divides the body into front and back; it includes abduction and adduction.",
    "Transverse plane: divides the body into upper and lower parts; it includes many rotations.",
    "Stability: the ability to control a position or movement; it does not mean holding the body rigid.",
    "Proprioception: sensory information about the body's position and movement.",
    "Neutral spine: a functional description of comfortable, controlled curves; it is not one identical shape for everyone.",
    "Fascia: a connected family of connective tissues that wrap, link, and separate structures.",
    "Pelvic floor: muscles and tissues at the base of the pelvis that contribute to support and pressure control.",
    "Diaphragm: the main muscle of inhalation, located between the chest and abdomen.",
    "Autonomic nervous system: networks that regulate involuntary functions and adapt to the body's demands.",
  ],
);

export const anatomy: AnatomyTopic[] = [
  topic({
    id: "spine",
    nameEs: "Columna vertebral",
    nameEn: "Spine",
    category: "Spine",
    summaryEs:
      "Una columna flexible que sostiene el tronco, protege la médula espinal y distribuye cargas durante el movimiento.",
    summaryEn:
      "A flexible column that supports the trunk, protects the spinal cord, and distributes load during movement.",
    structures: l(
      "Siete vértebras cervicales, doce torácicas, cinco lumbares, sacro y cóccix. Los discos intervertebrales y las articulaciones facetarias permiten movimiento y transmiten carga; la médula espinal discurre protegida por el canal vertebral.",
      "Seven cervical, twelve thoracic, and five lumbar vertebrae, followed by the sacrum and coccyx. Intervertebral discs and facet joints permit movement and transfer load; the spinal cord passes within the protected vertebral canal.",
    ),
    movements: l(
      "Flexión, extensión, inclinación lateral y rotación axial se reparten de forma distinta entre regiones. En yoga aparecen en pliegues, extensiones suaves, inclinaciones y torsiones; el cuello y la zona lumbar suelen tolerar menos rotación que el conjunto del tronco.",
      "Flexion, extension, side-bending, and axial rotation are shared differently across spinal regions. Yoga uses them in folds, gentle backbends, side bends, and twists; the neck and lower back generally contribute less rotation than the trunk as a whole.",
    ),
    muscles: l(
      "Los multífidos y erectores espinales ayudan a extender y controlar segmentos; los abdominales y oblicuos contribuyen a flexionar y rotar el tronco; el diafragma, el transverso abdominal y el suelo pélvico colaboran en el manejo de presión y estabilidad.",
      "The multifidi and erector spinae help extend and control segments; the abdominals and obliques contribute to trunk flexion and rotation; the diaphragm, transversus abdominis, and pelvic floor coordinate pressure and stability.",
    ),
    issues: l(
      "Son frecuentes las molestias lumbares o cervicales inespecíficas y las distensiones musculares. Dolor irradiado, debilidad, entumecimiento o dolor persistente necesitan valoración sanitaria; esta ficha no permite diagnosticar la causa.",
      "Nonspecific low-back or neck discomfort and muscle strains are common. Radiating pain, weakness, numbness, or persistent pain warrants clinical assessment; this guide cannot diagnose a cause.",
    ),
    prevention: l(
      "Explora el movimiento gradualmente, reparte la flexión y la rotación por el tronco y evita tirar del cuello. En una torsión, crece primero desde el eje y gira solo hasta un rango cómodo; reduce el rango si aparece dolor, hormigueo o presión.",
      "Explore movement gradually, share flexion and rotation through the trunk, and avoid pulling on the neck. In a twist, lengthen through the spine before rotating within a comfortable range; reduce the range if pain, tingling, or pressure appears.",
    ),
    poseIds: [
      "tadasana",
      "ardha-uttanasana",
      "uttanasana",
      "bhujangasana",
      "adho-mukha-svanasana",
      "paschimottanasana",
      "ardha-matsyendrasana",
      "sphinx",
      "supported-child",
      "reclined-twist",
      "savasana",
    ],
    tags: ["anatomy", "spine", "vertebral column", "back", "movement"],
  }),
  topic({
    id: "shoulders",
    nameEs: "Hombros y cintura escapular",
    nameEn: "Shoulders and shoulder girdle",
    category: "Shoulders",
    summaryEs:
      "El hombro combina movilidad del brazo con el movimiento coordinado de la escápula y la clavícula.",
    summaryEn:
      "The shoulder combines arm mobility with coordinated movement of the scapula and clavicle.",
    structures: l(
      "Húmero, escápula y clavícula. La articulación glenohumeral es una articulación esferoidea; la acromioclavicular une escápula y clavícula. El deslizamiento escapulotorácico describe el movimiento de la escápula sobre el tórax, no una articulación sinovial independiente.",
      "The humerus, scapula, and clavicle. The glenohumeral joint is a ball-and-socket joint; the acromioclavicular joint links the scapula and clavicle. Scapulothoracic motion describes the scapula gliding over the rib cage, not a separate synovial joint.",
    ),
    movements: l(
      "Flexión y extensión, abducción y aducción, rotación interna y externa del brazo; la escápula también rota hacia arriba o abajo y se eleva, desciende, protruye y retrae. En apoyos, la escápula debe poder moverse con el brazo.",
      "The arm moves through flexion and extension, abduction and adduction, and internal and external rotation; the scapula also rotates upward or downward and elevates, depresses, protracts, and retracts. In weight-bearing poses, the scapula needs to move with the arm.",
    ),
    muscles: l(
      "El manguito rotador centra y controla la cabeza del húmero; el deltoides eleva el brazo. El serrato anterior y las porciones del trapecio coordinan la escápula; pectorales, dorsal ancho y romboides participan según la dirección del gesto.",
      "The rotator cuff centers and controls the humeral head; the deltoid elevates the arm. The serratus anterior and trapezius coordinate scapular motion; the pectorals, latissimus dorsi, and rhomboids contribute depending on the movement.",
    ),
    issues: l(
      "Puede haber irritación de tendones del manguito rotador, dolor al elevar el brazo o distensión por cargas repetidas. La sensación de pinzamiento puede tener distintas causas: evita asumir un diagnóstico solo por la postura que molesta.",
      "Rotator-cuff tendon irritation, pain while raising the arm, or strain from repeated loading can occur. A pinching sensation can have different causes; do not infer a diagnosis from one uncomfortable pose.",
    ),
    prevention: l(
      "Aumenta poco a poco el tiempo de apoyo y el rango sobre la cabeza. Mantén manos y antebrazos activos sin forzar los hombros lejos de las orejas; usa pared, bloques o apoyo de rodillas para ajustar la carga.",
      "Build overhead range and weight-bearing time gradually. Keep the hands and forearms active without forcing the shoulders away from the ears; use a wall, blocks, or knees-down variations to adjust load.",
    ),
    poseIds: [
      "urdhva-hastasana",
      "utthita-trikonasana",
      "bhujangasana",
      "urdhva-mukha-svanasana",
      "adho-mukha-svanasana",
      "phalahakasana",
      "chaturanga-dandasana",
      "supported-child",
    ],
    tags: ["anatomy", "shoulder", "scapula", "clavicle", "rotator cuff"],
  }),
  topic({
    id: "hip-joint",
    nameEs: "Articulación de la cadera",
    nameEn: "Hip joint",
    category: "Hips",
    summaryEs:
      "La cadera conecta el fémur con la pelvis; su movilidad depende de la articulación, los tejidos y la posición de todo el cuerpo.",
    summaryEn:
      "The hip connects the femur with the pelvis; its mobility depends on the joint, surrounding tissues, and whole-body position.",
    structures: l(
      "La cabeza del fémur encaja en el acetábulo de la pelvis para formar la articulación coxofemoral. La pelvis también incluye las articulaciones sacroilíacas y la sínfisis púbica, que no son la articulación de la cadera.",
      "The femoral head meets the pelvic acetabulum to form the hip (acetabulofemoral) joint. The pelvis also includes the sacroiliac joints and pubic symphysis, which are not the hip joint.",
    ),
    movements: l(
      "La cadera realiza flexión, extensión, abducción, aducción y rotación interna y externa. Las posturas combinan varios movimientos y la pelvis puede inclinarse o girar; una rodilla más baja no demuestra por sí sola mayor movilidad de cadera.",
      "The hip moves through flexion, extension, abduction, adduction, and internal and external rotation. Poses combine movements while the pelvis may tilt or rotate; a lower knee alone does not prove greater hip mobility.",
    ),
    muscles: l(
      "Iliopsoas y recto femoral ayudan a flexionar; glúteo mayor y parte de los isquiotibiales extienden; glúteos medio y menor estabilizan y abducen; aductores acercan el muslo, y los rotadores profundos contribuyen a orientar y controlar la articulación.",
      "The iliopsoas and rectus femoris help flex the hip; gluteus maximus and some hamstrings extend it; gluteus medius and minimus abduct and stabilize; the adductors bring the thigh inward, and deep rotators help orient and control the joint.",
    ),
    issues: l(
      "Las molestias pueden relacionarse con sobrecarga de flexores o aductores, irritación de tejidos de la ingle o sensibilidad articular. Dolor agudo, bloqueo o dolor que persiste fuera de la práctica requiere valoración; no fuerces la rodilla hacia el suelo.",
      "Discomfort may relate to overloading the hip flexors or adductors, groin tissue irritation, or joint sensitivity. Sharp pain, locking, or pain that persists beyond practice warrants assessment; do not press the knee toward the floor.",
    ),
    prevention: l(
      "Permite que la rotación se origine en la cadera y adapta la posición de rodillas y pies. En aperturas, reduce el rango y apoya los muslos; una sensación amplia de estiramiento puede ser tolerable, pero el dolor punzante o articular es señal para salir.",
      "Let rotation come from the hip and adjust the position of the knees and feet. In hip-opening poses, reduce the range and support the thighs; a broad stretch may be tolerable, but sharp or joint pain is a cue to come out.",
    ),
    poseIds: [
      "utthita-trikonasana",
      "baddha-konasana",
      "butterfly",
      "dragon",
      "utthita-parsvakonasana",
      "virabhadrasana-ii",
      "paschimottanasana",
      "reclined-twist",
    ],
    tags: [
      "anatomy",
      "hip",
      "cadera",
      "pelvis",
      "gluteals",
      "adductors",
      "flexion",
      "rotation",
    ],
  }),
  topic({
    id: "knees",
    nameEs: "Rodillas",
    nameEn: "Knees",
    category: "Knees",
    summaryEs:
      "La rodilla transmite carga entre muslo y pierna y funciona junto con la alineación de cadera, tobillo y pie.",
    summaryEn:
      "The knee transfers load between thigh and leg and works together with hip, ankle, and foot alignment.",
    structures: l(
      "El fémur, la tibia y la rótula forman las articulaciones tibiofemoral y patelofemoral. Meniscos, ligamentos cruzados y colaterales contribuyen a la congruencia y estabilidad; la cabeza del peroné participa en una articulación cercana, no en la principal superficie de carga de la rodilla.",
      "The femur, tibia, and patella form the tibiofemoral and patellofemoral joints. Menisci and cruciate and collateral ligaments contribute to congruence and stability; the fibular head forms a nearby joint, not the knee's main weight-bearing surface.",
    ),
    movements: l(
      "La rodilla flexiona y extiende; cuando está flexionada permite una pequeña rotación. En yoga se carga en posturas de pie, sentadas y arrodilladas, por lo que importan la dirección de la rodilla, la posición del pie y la profundidad de la flexión.",
      "The knee flexes and extends, with a small amount of rotation available when flexed. Yoga loads it in standing, seated, and kneeling poses, so knee direction, foot position, and depth of bend matter.",
    ),
    muscles: l(
      "El cuádriceps extiende la rodilla; los isquiotibiales y el gastrocnemio ayudan a flexionarla. Glúteos y músculos de la pierna controlan la posición del fémur y la tibia durante apoyos y cambios de dirección.",
      "The quadriceps extend the knee; the hamstrings and gastrocnemius help flex it. The gluteal and lower-leg muscles help control femur and tibia position during weight-bearing and changes of direction.",
    ),
    issues: l(
      "Esguinces, irritación de menisco y molestias alrededor de la rótula pueden aparecer con giros bajo carga, flexión profunda o aumentos bruscos de práctica. Una lesión reciente, hinchazón marcada, bloqueo o incapacidad para apoyar merece atención profesional.",
      "Sprains, meniscal irritation, and pain around the kneecap can follow loaded twisting, deep flexion, or sudden increases in practice. A recent injury, marked swelling, locking, or inability to bear weight deserves professional care.",
    ),
    prevention: l(
      "En posturas de pie, orienta la rodilla hacia una dirección cómoda en línea general con el pie, sin imponer una alineación rígida. Usa manta bajo las rodillas, acorta la postura y evita girar sobre un pie fijo con la rodilla flexionada.",
      "In standing poses, let the knee track in a comfortable general direction with the foot without imposing a rigid alignment. Pad kneeling positions, shorten the stance, and avoid twisting over a fixed foot with a bent knee.",
    ),
    poseIds: [
      "utkatasana",
      "virabhadrasana-i",
      "virabhadrasana-ii",
      "utthita-parsvakonasana",
      "baddha-konasana",
      "dragon",
      "supported-child",
      "tadasana",
    ],
    tags: ["anatomy", "knee", "patella", "meniscus", "leg"],
  }),
  topic({
    id: "ankles-feet",
    nameEs: "Tobillos y pies",
    nameEn: "Ankles and feet",
    category: "Ankles & Feet",
    summaryEs:
      "El tobillo y el pie forman una base adaptable que reparte el peso y ayuda al equilibrio.",
    summaryEn:
      "The ankle and foot form an adaptable base that distributes weight and supports balance.",
    structures: l(
      "La tibia y el peroné se articulan con el astrágalo en el tobillo; la articulación subtalar permite parte de la inversión y eversión. El tarso, metatarso y falanges, junto con sus articulaciones y arcos, distribuyen carga y facilitan el apoyo.",
      "The tibia and fibula meet the talus at the ankle; the subtalar joint contributes to inversion and eversion. The tarsal bones, metatarsals, and phalanges, with their joints and arches, distribute load and support movement.",
    ),
    movements: l(
      "El tobillo realiza dorsiflexión y flexión plantar; el pie también invierte y everte. La pronación y supinación describen combinaciones tridimensionales, no un error que deba eliminarse. En yoga cambian según el apoyo, el equilibrio y la posición de la pierna.",
      "The ankle dorsiflexes and plantarflexes; the foot also inverts and everts. Pronation and supination describe three-dimensional combinations, not errors that must be eliminated. In yoga they vary with the base, balance, and leg position.",
    ),
    muscles: l(
      "El tríceps sural y el tendón de Aquiles contribuyen a la flexión plantar; tibial anterior ayuda a dorsiflexionar, y tibial posterior y peroneos colaboran en el control del arco y del tobillo. Los músculos intrínsecos ayudan a ajustar el pie al suelo.",
      "The calf muscles and Achilles tendon contribute to plantarflexion; tibialis anterior helps dorsiflex, while tibialis posterior and the peroneal muscles help control the arch and ankle. Intrinsic foot muscles help the foot adapt to the ground.",
    ),
    issues: l(
      "Esguinces laterales, irritación del tendón de Aquiles y dolor de talón o arco pueden asociarse a cargas o rangos nuevos. Hinchazón importante, dolor tras una caída o dificultad para apoyar requieren valoración sanitaria.",
      "Lateral ankle sprains, Achilles tendon irritation, and heel or arch pain may accompany new loads or ranges. Significant swelling, pain after a fall, or difficulty bearing weight warrants clinical assessment.",
    ),
    prevention: l(
      "Distribuye el apoyo entre talón y antepié sin colapsar ni rigidizar el arco. En equilibrios, usa pared; ajusta la distancia entre los pies y evita forzar el empeine o los dedos contra el suelo.",
      "Spread support between heel and forefoot without collapsing or rigidly gripping the arch. Use a wall for balance, adjust the distance between the feet, and avoid forcing the top of the foot or toes into the floor.",
    ),
    poseIds: [
      "tadasana",
      "padangusthasana",
      "adho-mukha-svanasana",
      "utkatasana",
      "virabhadrasana-i",
      "virabhadrasana-ii",
      "utthita-trikonasana",
      "ardha-uttanasana",
    ],
    tags: ["anatomy", "ankle", "foot", "feet", "balance", "arch"],
  }),
  topic({
    id: "wrists-hands",
    nameEs: "Muñecas y manos",
    nameEn: "Wrists and hands",
    category: "Wrists & Hands",
    summaryEs:
      "Las manos distribuyen el apoyo y las muñecas ajustan la orientación de la palma en posturas de carga.",
    summaryEn:
      "The hands distribute support while the wrists position the palm in weight-bearing poses.",
    structures: l(
      "El radio se articula con la fila proximal de los huesos del carpo; cúbito y radio permiten movimientos del antebrazo y se relacionan con el complejo de la muñeca. Ocho huesos carpianos, cinco metacarpianos y falanges forman la mano; el pulgar tiene una articulación carpometacarpiana de gran movilidad.",
      "The radius articulates with the proximal carpal row; the ulna and radius enable forearm rotation and relate to the wrist complex. Eight carpal bones, five metacarpals, and phalanges form the hand; the thumb's carpometacarpal joint allows substantial mobility.",
    ),
    movements: l(
      "La muñeca flexiona, extiende y se desvía hacia los lados; el antebrazo prona y supina. En planchas y perro boca abajo la muñeca suele estar extendida con carga, mientras los dedos ayudan a modular el apoyo.",
      "The wrist flexes, extends, and deviates side to side; the forearm pronates and supinates. In plank and downward-facing dog, the wrist is often extended under load while the fingers help modulate support.",
    ),
    muscles: l(
      "Los flexores y extensores del antebrazo mueven y estabilizan la muñeca. Los músculos intrínsecos de la mano controlan los dedos; el pulgar y los músculos de la eminencia tenar contribuyen al agarre y a la distribución de presión.",
      "The forearm flexors and extensors move and stabilize the wrist. Intrinsic hand muscles control the fingers; the thumb and thenar muscles contribute to grip and pressure distribution.",
    ),
    issues: l(
      "La extensión cargada puede irritar una muñeca sensible; también pueden aparecer distensiones por exceso de apoyo repetido. Hormigueo, pérdida de fuerza o dolor después de una caída deben evaluarse, no practicarse a través de ellos.",
      "Loaded wrist extension can irritate a sensitive wrist, and repeated support can cause strain. Tingling, loss of strength, or pain after a fall should be assessed rather than practiced through.",
    ),
    prevention: l(
      "Calienta gradualmente y reparte el peso por la base de la mano y los dedos, sin hundir solo la muñeca. Eleva las manos en bloques, apoya los puños o antebrazos cuando sea cómodo y reduce las repeticiones si los síntomas aumentan.",
      "Warm up gradually and spread pressure through the hand and fingers rather than sinking into the wrist alone. Elevate the hands on blocks, use fists or forearms when comfortable, and reduce repetitions if symptoms increase.",
    ),
    poseIds: [
      "phalahakasana",
      "chaturanga-dandasana",
      "adho-mukha-svanasana",
      "urdhva-mukha-svanasana",
      "bhujangasana",
      "supported-child",
    ],
    tags: ["anatomy", "wrist", "hand", "carpal", "weight-bearing"],
  }),
  topic({
    id: "core",
    nameEs: "Core y control del tronco",
    nameEn: "Core and trunk control",
    category: "Core",
    summaryEs:
      "El core es un sistema de coordinación que ayuda a controlar el tronco y las presiones, no un único músculo.",
    summaryEn:
      "The core is a coordination system that helps control the trunk and pressure, not one single muscle.",
    structures: l(
      "Incluye la pared abdominal, la columna lumbar, el diafragma, el suelo pélvico y tejidos que conectan el tronco con la pelvis. Las costillas, pelvis y vértebras ofrecen puntos de anclaje; no existe una sola articulación llamada core.",
      "It includes the abdominal wall, lumbar spine, diaphragm, pelvic floor, and tissues linking the trunk and pelvis. The ribs, pelvis, and vertebrae provide attachment points; there is no single joint called the core.",
    ),
    movements: l(
      "El tronco se flexiona, extiende, rota e inclina lateralmente; también puede resistir esos movimientos mientras brazos y piernas se desplazan. En yoga, estabilidad significa controlar la tarea y seguir respirando, no apretar al máximo.",
      "The trunk flexes, extends, rotates, and side-bends; it can also resist those movements while the arms and legs move. In yoga, stability means controlling the task while continuing to breathe, not bracing as hard as possible.",
    ),
    muscles: l(
      "Recto abdominal, oblicuos y transverso abdominal participan en el control de la pared; diafragma, multífidos, erectores espinales y músculos del suelo pélvico coordinan soporte y presión según la respiración y la tarea.",
      "The rectus abdominis, obliques, and transversus abdominis contribute to abdominal-wall control; the diaphragm, multifidi, erector spinae, and pelvic-floor muscles coordinate support and pressure with breathing and task demands.",
    ),
    issues: l(
      "La fatiga o una progresión demasiado rápida puede llevar a compensaciones y molestias abdominales o lumbares. No es necesario sentir temblor ni contener la respiración para que una postura sea eficaz.",
      "Fatigue or overly rapid progression can lead to compensation and abdominal or low-back discomfort. Shaking or holding the breath is not required for a pose to be effective.",
    ),
    prevention: l(
      "Empieza con una variante que permita respirar y controlar el tronco. Reduce palanca o duración en planchas, evita empujar el abdomen hacia fuera con esfuerzo y deja que el grado de activación cambie entre posturas.",
      "Begin with a variation that allows breathing and trunk control. Shorten the lever or duration in planks, avoid forcefully pushing the abdomen outward, and let the level of engagement change between poses.",
    ),
    poseIds: [
      "tadasana",
      "phalahakasana",
      "chaturanga-dandasana",
      "utkatasana",
      "setu-bandha-sarvangasana",
      "dandasana",
      "savasana",
    ],
    tags: ["anatomy", "core", "trunk", "abdomen", "stability", "breathing"],
  }),
  topic({
    id: "pelvic-floor",
    nameEs: "Suelo pélvico",
    nameEn: "Pelvic floor",
    category: "Pelvic Floor",
    summaryEs:
      "El suelo pélvico forma una base muscular y conectiva que participa en soporte, continencia y coordinación con la respiración.",
    summaryEn:
      "The pelvic floor forms a muscular and connective base that contributes to support, continence, and coordination with breathing.",
    structures: l(
      "La base de la pelvis ósea está delimitada por pubis, isquiones, ilíacos y sacro. El elevador del ano —puborrectal, pubococcígeo e iliococcígeo— y el coccígeo forman parte del diafragma pélvico; fascias y ligamentos también aportan soporte.",
      "The bony pelvic base is bounded by the pubis, ischia, ilia, and sacrum. The levator ani—puborectalis, pubococcygeus, and iliococcygeus—and coccygeus form part of the pelvic diaphragm; fascia and ligaments also contribute support.",
    ),
    movements: l(
      "Los músculos pueden contraerse y relajarse y se adaptan a cambios de presión al respirar, toser, moverse o sostener cargas. En yoga conviene practicar tanto la percepción como la capacidad de soltar; no se requiere contraerlos de forma constante.",
      "These muscles can contract and relax and adapt to pressure changes during breathing, coughing, movement, or lifting. Yoga can include awareness and the ability to release; a constant contraction is not required.",
    ),
    muscles: l(
      "Elevador del ano y coccígeo sostienen vísceras pélvicas y colaboran en continencia. Su actividad se coordina con pared abdominal, diafragma, caderas y sistema nervioso; las necesidades varían entre personas.",
      "The levator ani and coccygeus support pelvic organs and contribute to continence. Their activity coordinates with the abdominal wall, diaphragm, hips, and nervous system; needs vary between people.",
    ),
    issues: l(
      "Algunas personas presentan dolor o exceso de tensión, dificultad para relajar, pérdidas de orina, sensación de peso o cambios después del parto o una cirugía. Estos síntomas merecen evaluación individual por un profesional de salud pélvica.",
      "Some people experience pain or excess tension, difficulty relaxing, urinary leakage, a feeling of heaviness, or changes after childbirth or surgery. These symptoms warrant individual assessment by a pelvic-health professional.",
    ),
    prevention: l(
      "Evita indicaciones universales de apretar o elevar. Coordina una respiración cómoda, permite que el abdomen y el suelo pélvico cedan al inhalar y se recuperen al exhalar sin forzar; adapta posturas si aparece presión, dolor o pesadez.",
      "Avoid universal cues to squeeze or lift. Coordinate comfortable breathing, allow the abdomen and pelvic floor to yield on inhalation and recover on exhalation without forcing, and modify poses if pressure, pain, or heaviness appears.",
    ),
    poseIds: [
      "sukhasana",
      "baddha-konasana",
      "butterfly",
      "supported-child",
      "setu-bandha-sarvangasana",
      "savasana",
      "dandasana",
    ],
    tags: ["anatomy", "pelvic floor", "pelvis", "breathing", "support"],
  }),
  topic({
    id: "respiratory-system-diaphragm",
    nameEs: "Sistema respiratorio y diafragma",
    nameEn: "Respiratory system and diaphragm",
    category: "Respiration",
    summaryEs:
      "La respiración integra el movimiento del diafragma y la caja torácica con el flujo de aire y el intercambio gaseoso.",
    summaryEn:
      "Breathing integrates diaphragm and rib-cage movement with airflow and gas exchange.",
    structures: l(
      "El diafragma separa tórax y abdomen; las costillas, el esternón y las vértebras torácicas forman la caja torácica. Pulmones y vías respiratorias conducen el aire. Durante la inspiración, el diafragma se contrae y desciende mientras cambia el volumen torácico.",
      "The diaphragm separates the chest and abdomen; the ribs, sternum, and thoracic vertebrae form the rib cage. The lungs and airways conduct air. During inhalation, the diaphragm contracts and descends as thoracic volume changes.",
    ),
    movements: l(
      "La respiración incluye expansión y retorno elástico del tórax, movimiento del abdomen y cambios de presión. La pared torácica también se mueve con flexión, extensión y rotación; sentarse erguido puede facilitar el espacio, pero no hay una única postura correcta para respirar.",
      "Breathing includes rib-cage expansion and recoil, abdominal movement, and pressure changes. The chest wall also moves with flexion, extension, and rotation; sitting upright may make space, but there is no single correct breathing posture.",
    ),
    muscles: l(
      "El diafragma es el principal músculo inspiratorio en reposo. Intercostales colaboran en el movimiento de las costillas; músculos del cuello y tórax pueden ayudar cuando aumenta la demanda. La espiración tranquila suele depender en gran parte del retroceso elástico.",
      "The diaphragm is the main inspiratory muscle at rest. The intercostals contribute to rib movement; neck and chest muscles may assist as demand increases. Quiet exhalation relies largely on elastic recoil.",
    ),
    issues: l(
      "La falta de aire nueva o intensa, el dolor torácico, silbidos al respirar o mareo no se deben atribuir automáticamente a la postura. Interrumpe el ejercicio y solicita atención adecuada según la intensidad y persistencia del síntoma.",
      "New or severe breathlessness, chest pain, wheezing, or dizziness should not automatically be attributed to posture. Stop exercising and seek appropriate care based on the symptom's severity and persistence.",
    ),
    prevention: l(
      "Deja que la respiración sea amplia pero cómoda; no llenes ni vacíes los pulmones al máximo ni añadas retenciones por obligación. Si el aire se vuelve forzado, acorta la práctica y vuelve a respirar con naturalidad.",
      "Let the breath be spacious but comfortable; do not force a maximal inhale or exhale or add holds as a requirement. If breathing becomes strained, shorten the practice and return to a natural rhythm.",
    ),
    poseIds: [
      "sukhasana",
      "tadasana",
      "supported-child",
      "sphinx",
      "savasana",
      "setu-bandha-sarvangasana",
    ],
    tags: ["anatomy", "respiration", "breathing", "diaphragm", "rib cage"],
  }),
  topic({
    id: "nervous-system-and-breath",
    nameEs: "Sistema nervioso y respiración",
    nameEn: "Nervous system and breathing",
    category: "Nervous System",
    summaryEs:
      "La respiración aporta información al sistema nervioso y puede acompañar la atención, sin funcionar como un interruptor de salud.",
    summaryEn:
      "Breathing provides information to the nervous system and can support attention; it is not a health switch.",
    structures: l(
      "El sistema nervioso central comprende encéfalo y médula espinal; nervios periféricos conectan con músculos y órganos. Las ramas simpática y parasimpática del sistema autónomo participan en la regulación involuntaria y trabajan en interacción, no como un simple interruptor entre calma y estrés.",
      "The central nervous system includes the brain and spinal cord; peripheral nerves connect with muscles and organs. The sympathetic and parasympathetic branches of the autonomic system contribute to involuntary regulation and interact rather than acting as a simple calm-versus-stress switch.",
    ),
    movements: l(
      "La respiración cambia con la actividad, la postura, las emociones y el entorno. Notar su ritmo puede servir como práctica de interocepción; una exhalación cómoda algo más larga puede sentirse calmante para algunas personas, pero la respuesta no es idéntica ni garantiza un resultado clínico.",
      "Breathing changes with activity, posture, emotion, and surroundings. Noticing its rhythm can be an interoceptive practice; a comfortable, slightly longer exhale may feel settling for some people, but responses differ and no clinical outcome is guaranteed.",
    ),
    muscles: l(
      "No hay un músculo único que produzca la regulación nerviosa. Receptores del sistema respiratorio, diafragma, músculos posturales y vías nerviosas aportan señales que el cerebro integra con el contexto y el estado corporal.",
      "No single muscle produces nervous-system regulation. Receptors in the respiratory system, diaphragm, postural muscles, and neural pathways provide signals that the brain integrates with context and bodily state.",
    ),
    issues: l(
      "La respiración lenta o la atención interna puede aumentar ansiedad, sensación de falta de aire o recuerdos difíciles en algunas personas. Las prácticas forzadas, rápidas o con retención también pueden provocar mareo y malestar.",
      "Slow breathing or inward attention may increase anxiety, air hunger, or difficult memories for some people. Forced, rapid, or breath-retention practices can also cause dizziness and discomfort.",
    ),
    prevention: l(
      "Ofrece siempre la opción de mantener el ritmo natural, mirar un punto externo o detenerse. Evita prometer que una técnica “reinicia el nervio vago”; ante síntomas persistentes o intensos, consulta con un profesional sanitario.",
      "Always offer the option to keep a natural rhythm, look at an external point, or stop. Avoid promising that a technique “resets the vagus nerve”; seek clinical guidance for persistent or severe symptoms.",
    ),
    poseIds: ["sukhasana", "savasana", "supported-child", "tadasana"],
    tags: ["anatomy", "nervous system", "breathing", "autonomic", "awareness"],
    structuresLabel: l("Sistemas y estructuras", "Systems and structures"),
  }),
  topic({
    id: "fascia-connective-tissue",
    nameEs: "Fascia y tejido conectivo",
    nameEn: "Fascia and connective tissue",
    category: "Fascia",
    summaryEs:
      "Los tejidos conectivos envuelven y enlazan estructuras; Yin Yoga los carga de forma sostenida y gradual, sin aislar una sola capa.",
    summaryEn:
      "Connective tissues wrap and link structures; Yin Yoga applies gradual, sustained load without isolating one layer.",
    structures: l(
      "El término fascia se usa para distintas capas de tejido conectivo que envuelven, separan y conectan músculos, órganos, nervios y otros tejidos. Tendones y ligamentos también son tejidos conectivos, con organización y funciones distintas.",
      "Fascia is used for different layers of connective tissue that wrap, separate, and link muscles, organs, nerves, and other tissues. Tendons and ligaments are also connective tissues, with distinct organization and functions.",
    ),
    movements: l(
      "El tejido responde a carga, descarga y movimiento en escalas de tiempo distintas; una postura de Yin ofrece una carga suave y sostenida, pero no aísla exclusivamente la fascia ni demuestra que la esté alargando de manera permanente. Las sensaciones y la tolerancia varían.",
      "Tissue responds to loading, unloading, and movement over different time scales. A Yin pose offers gentle, sustained loading, but it does not isolate fascia or prove permanent lengthening. Sensation and tolerance vary.",
    ),
    muscles: l(
      "Las capas conectivas se continúan con los envoltorios de músculos y otros tejidos; los músculos producen fuerza y los tendones la transmiten al hueso. El movimiento de una zona suele involucrar varias capas y estructuras a la vez.",
      "Connective layers continue with the coverings of muscles and other tissues; muscles produce force and tendons transmit it to bone. Movement in one area usually involves several layers and structures at once.",
    ),
    issues: l(
      "La irritación de tendones, ligamentos o tejidos alrededor de una articulación puede empeorar con cargas demasiado intensas o mantenidas. No interpretes un estiramiento muy fuerte como una señal de que un tejido necesita “romperse” o soltarse.",
      "Tendon, ligament, or periarticular irritation can worsen with loads that are too intense or prolonged. Do not interpret a very strong stretch as a sign that tissue needs to be “broken” or released.",
    ),
    prevention: l(
      "En Yin, entra gradualmente, usa apoyos y permanece en una intensidad moderada que permita respirar. Sal lentamente; detente ante dolor agudo, entumecimiento, hormigueo o sensación eléctrica. Ajusta el rango en vez de perseguir una profundidad fija.",
      "In Yin, enter gradually, use props, and stay at a moderate intensity that allows easy breathing. Exit slowly; stop for sharp pain, numbness, tingling, or an electric sensation. Adjust the range instead of pursuing a fixed depth.",
    ),
    poseIds: ["butterfly", "dragon", "sphinx", "supported-child", "reclined-twist"],
    tags: ["anatomy", "fascia", "connective tissue", "yin yoga", "tendon", "ligament"],
    structuresLabel: l("Tejidos conectivos principales", "Key connective tissues"),
    extraFields: [
      field(
        "Relación con Yin Yoga",
        "Connection with Yin Yoga",
        l(
          "Las permanencias de Yin suelen ser pasivas y adaptables, con apoyo del suelo o accesorios. La tradición describe zonas objetivo; estas no equivalen a un mapa médico de meridianos ni garantizan cambios estructurales. La práctica debe ajustarse a la persona y a sus síntomas.",
          "Yin holds are usually passive and adaptable, supported by the floor or props. Traditional teaching names target areas; these are not a medical map of meridians and do not guarantee structural change. Practice should respond to the person and their symptoms.",
        ),
        "teaching",
      ),
    ],
  }),
  topic({
    id: "movement-types",
    nameEs: "Tipos de movimiento",
    nameEn: "Types of movement",
    category: "Movement",
    summaryEs:
      "Un vocabulario común ayuda a describir lo que hacen las articulaciones sin convertir una postura en una forma única.",
    summaryEn:
      "Shared movement terms help describe what joints do without treating a pose as one fixed shape.",
    structures: l(
      "Los movimientos ocurren en articulaciones y se describen en relación con planos y ejes anatómicos. Una misma postura puede combinar varios movimientos en diferentes articulaciones.",
      "Movements occur at joints and are described in relation to anatomical planes and axes. One pose can combine several movements at different joints.",
    ),
    movements: l(
      "Flexión, extensión, rotación, abducción y aducción son términos descriptivos. La dirección depende de la región corporal; por ejemplo, la dorsiflexión del tobillo no es el mismo gesto que la extensión de cadera.",
      "Flexion, extension, rotation, abduction, and adduction are descriptive terms. Direction depends on the body region; for example, ankle dorsiflexion is not the same action as hip extension.",
    ),
    muscles: l(
      "Los músculos producen y frenan movimiento en coordinación con el sistema nervioso, las articulaciones y los tejidos conectivos. Un músculo puede colaborar en más de una acción y su función cambia según la posición.",
      "Muscles produce and control movement in coordination with the nervous system, joints, and connective tissues. A muscle may contribute to more than one action, and its role changes with position.",
    ),
    issues: l(
      "Confundir flexibilidad con control puede llevar a empujar una articulación hasta su extremo. Las posturas no siempre corresponden a una sola acción ni se ven iguales en todos los cuerpos.",
      "Confusing flexibility with control can lead to pushing a joint to its end range. Poses do not always represent one isolated action or look the same in every body.",
    ),
    prevention: l(
      "Usa estos nombres para comunicar una dirección, no para imponer una forma. Modifica apoyo, ángulo y rango según comodidad, control y respiración; nunca uses una etiqueta anatómica para justificar dolor.",
      "Use these names to communicate direction, not to impose a shape. Adjust support, angle, and range for comfort, control, and breathing; never use an anatomical label to justify pain.",
    ),
    poseIds: [
      "uttanasana",
      "bhujangasana",
      "utthita-trikonasana",
      "baddha-konasana",
      "ardha-matsyendrasana",
      "virabhadrasana-ii",
    ],
    tags: ["anatomy", "movement", "flexion", "extension", "rotation", "abduction", "adduction"],
    structuresLabel: l("Planos y ejes", "Planes and axes"),
    extraFields: [movementTypes],
  }),
  topic({
    id: "anatomy-glossary",
    nameEs: "Glosario de anatomía",
    nameEn: "Anatomy glossary",
    category: "Glossary",
    summaryEs:
      "Definiciones breves para leer las fichas anatómicas y conversar con precisión durante la práctica.",
    summaryEn:
      "Short definitions for reading anatomy entries and communicating clearly in practice.",
    structures: l(
      "El glosario reúne vocabulario transversal usado en las fichas de regiones, movimiento, respiración y tejido conectivo.",
      "This glossary gathers shared vocabulary used across the region, movement, breathing, and connective-tissue entries.",
    ),
    movements: l(
      "Los términos de movimiento describen relaciones entre segmentos y articulaciones; no prescriben una alineación universal.",
      "Movement terms describe relationships between segments and joints; they do not prescribe a universal alignment.",
    ),
    muscles: l(
      "El lenguaje anatómico puede hacer más claras las indicaciones, siempre que se combine con observación, opciones y comodidad individual.",
      "Anatomical language can make cues clearer when paired with observation, options, and individual comfort.",
    ),
    issues: l(
      "Los nombres describen estructuras y funciones generales; no identifican la causa de un síntoma ni sustituyen una evaluación clínica.",
      "These names describe general structures and functions; they do not identify the cause of a symptom or replace clinical assessment.",
    ),
    prevention: l(
      "Cuando un término no ayude a moverte con más comodidad o control, vuelve a una indicación sencilla: reduce rango, apóyate o descansa.",
      "When a term does not help you move with more comfort or control, return to a simple cue: reduce range, add support, or rest.",
    ),
    poseIds: ["tadasana", "sukhasana", "adho-mukha-svanasana", "savasana"],
    tags: ["anatomy", "glossary", "terminology", "movement", "planes"],
    structuresLabel: l("Vocabulario incluido", "Included vocabulary"),
    extraFields: [glossary],
  }),
];

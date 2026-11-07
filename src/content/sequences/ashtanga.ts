import type { Sequence, SequenceStep } from "@/lib/models";
import { l } from "@/lib/utils";

type TimedPose = [contentId: string, duration: number];

function ashtangaSequence(
  details: Pick<
    Sequence,
    "id" | "name" | "description" | "objective" | "level" | "duration"
  >,
  warmUp: TimedPose[],
  main: TimedPose[],
  coolDown: TimedPose[],
  savasanaDuration: number,
): Sequence {
  function phase(stage: SequenceStep["stage"], poses: TimedPose[]) {
    return poses.map(([contentId, duration]) => ({ contentId, duration, stage }));
  }

  return {
    ...details,
    style: "ashtanga",
    image: `/images/sequences/${details.id}.svg`,
    demo: false,
    steps: [
      ...phase("warm-up", warmUp),
      ...phase("asanas", main),
      ...phase("cool-down", coolDown),
      ...phase("savasana", [["savasana", savasanaDuration]]),
    ].map((step, index) => ({ ...step, key: `${details.id}-${index}` })),
  };
}

export const ashtangaSequences: Sequence[] = [
  ashtangaSequence(
    {
      id: "surya-a",
      name: l("Surya Namaskar A · adaptación breve", "Surya Namaskar A · short adaptation"),
      level: "beginner",
      duration: 360,
      description: l(
        "Empezá sentado y prepará el movimiento con los brazos y flexiones suaves. En Plancha podés apoyar las rodillas y bajar con control para pasar a Cobra baja. Pasá por cuatro apoyos antes de Perro boca abajo. Volvé de pie con pasos cortos y terminá en Savasana.",
        "Begin seated and prepare with gentle arm raises and folds. In Plank, you can lower your knees and come down with control before Low Cobra. Pass through hands and knees before Downward-Facing Dog. Step forward to return to standing and finish in Savasana.",
      ),
      objective: l(
        "Coordinar la respiración con las transiciones entre estar de pie, apoyar las manos y volver a subir, en un rango cómodo.",
        "Coordinate breathing with the transitions from standing to hand support and back within a comfortable range.",
      ),
    },
    [
      ["sukhasana", 35],
      ["tadasana", 20],
      ["urdhva-hastasana", 15],
      ["uttanasana", 15],
      ["ardha-uttanasana", 15],
    ],
    [
      ["phalahakasana", 20],
      ["bhujangasana", 15],
      ["adho-mukha-svanasana", 30],
    ],
    [
      ["ardha-uttanasana", 15],
      ["uttanasana", 15],
      ["urdhva-hastasana", 15],
      ["tadasana", 30],
    ],
    120,
  ),
  ashtangaSequence(
    {
      id: "surya-b",
      name: l("Surya Namaskar B · adaptación breve", "Surya Namaskar B · short adaptation"),
      level: "intermediate",
      duration: 540,
      description: l(
        "Entrá en calor con Silla y flexiones suaves. Pasá por Plancha y hacé Guerrero I con cada pierna durante el mismo paso. Usá una exhalación para cada descenso y descansá el resto de ese paso si lo necesitás. Volvé de pie y cerrá en Savasana.",
        "Warm up with Chair and gentle folds. Move through Plank and practice Warrior I on both sides within the same step. Use one exhalation for each lowering phase and rest for the rest of that interval if needed. Return to standing and close in Savasana.",
      ),
      objective: l(
        "Mantener una respiración fluida al alternar apoyos de manos y zancadas, ajustando el esfuerzo en cada transición.",
        "Keep breathing smoothly as you alternate hand support and lunges, adjusting your effort at each transition.",
      ),
    },
    [
      ["sukhasana", 40],
      ["tadasana", 20],
      ["utkatasana", 20],
      ["uttanasana", 15],
      ["ardha-uttanasana", 15],
    ],
    [
      ["phalahakasana", 20],
      ["chaturanga-dandasana", 15],
      ["urdhva-mukha-svanasana", 15],
      ["adho-mukha-svanasana", 35],
      ["virabhadrasana-i", 70],
      ["phalahakasana", 20],
      ["chaturanga-dandasana", 15],
      ["urdhva-mukha-svanasana", 15],
      ["adho-mukha-svanasana", 45],
    ],
    [
      ["ardha-uttanasana", 15],
      ["uttanasana", 15],
      ["utkatasana", 15],
      ["tadasana", 15],
    ],
    120,
  ),
  ashtangaSequence(
    {
      id: "standing",
      name: l("Fundamentos de pie · Standing", "Standing foundations"),
      level: "beginner",
      duration: 660,
      description: l(
        "Prepará las caderas con flexiones suaves. Explorá Triángulo, Guerrero II y Ángulo lateral de ambos lados. Usá un bloque o una silla firme en las flexiones si te resulta cómodo. Volvé a Montaña, bajá al suelo con calma y descansá en Savasana.",
        "Prepare your hips with gentle folds. Explore Triangle, Warrior II, and Side Angle on both sides. Use a block or sturdy chair in the folds if it helps. Return to Mountain, lower to the floor at your own pace, and rest in Savasana.",
      ),
      objective: l(
        "Repartir el peso entre los pies y sostener una respiración cómoda al cambiar de apoyo y de lado.",
        "Share weight across the feet and breathe comfortably as you shift your support and change sides.",
      ),
    },
    [
      ["sukhasana", 60],
      ["tadasana", 30],
      ["urdhva-hastasana", 30],
      ["uttanasana", 30],
      ["ardha-uttanasana", 30],
    ],
    [
      ["utthita-trikonasana", 60],
      ["virabhadrasana-ii", 60],
      ["utthita-parsvakonasana", 60],
      ["prasarita-padottanasana", 60],
    ],
    [
      ["tadasana", 30],
      ["sukhasana", 60],
    ],
    150,
  ),
  ashtangaSequence(
    {
      id: "primary-series",
      name: l("Ashtanga · fundamentos de la serie primaria", "Ashtanga · primary series foundations"),
      level: "intermediate",
      duration: 1530,
      description: l(
        "Prepará el cuerpo con un saludo al sol suave. Después de Perro boca abajo, caminá hacia las manos y subí despacio. La selección pasa de flexiones y posturas de pie a posturas sentadas, un Puente bajo y un descanso en Savasana.",
        "Prepare with a gentle sun salutation. After Downward-Facing Dog, walk toward your hands and rise slowly. This selection moves from folds and standing poses into seated work, a low Bridge, and a rest in Savasana.",
      ),
      objective: l(
        "Coordinar la respiración al pasar de las posturas de pie al trabajo sentado, manteniendo el control y ajustando la profundidad de cada flexión o giro.",
        "Coordinate breathing while moving from standing to seated work, keeping control and adjusting the depth of each fold or twist.",
      ),
    },
    [
      ["sukhasana", 75],
      ["tadasana", 45],
      ["urdhva-hastasana", 30],
      ["uttanasana", 30],
      ["ardha-uttanasana", 30],
      ["phalahakasana", 20],
      ["bhujangasana", 20],
      ["adho-mukha-svanasana", 50],
      ["tadasana", 30],
    ],
    [
      ["padangusthasana", 45],
      ["pada-hastasana", 45],
      ["utthita-trikonasana", 90],
      ["utthita-parsvakonasana", 90],
      ["prasarita-padottanasana", 60],
      ["parsvottanasana", 90],
      ["dandasana", 45],
      ["paschimottanasana", 90],
      ["baddha-konasana", 90],
      ["ardha-matsyendrasana", 90],
      ["setu-bandha-sarvangasana", 60],
    ],
    [["viparita-karani", 75]],
    330,
  ),
  ashtangaSequence(
    {
      id: "finishing",
      name: l("Cierre · suelo y descanso", "Closing · floor and rest"),
      level: "beginner",
      duration: 480,
      description: l(
        "Empezá con apoyos sentados y seguí con una flexión, una torsión suave a cada lado y un Puente bajo. Después apoyá las piernas en la pared o las pantorrillas sobre una silla firme. Bajá las piernas con calma y descansá en Savasana.",
        "Begin with supported seated poses, then move through a fold, a gentle twist on each side, and a low Bridge. Rest the legs against a wall or the calves on a sturdy chair. Lower your legs slowly and rest in Savasana.",
      ),
      objective: l(
        "Bajar el ritmo de la práctica y encontrar una respiración cómoda en posturas de suelo antes del descanso final.",
        "Slow the pace of practice and find a comfortable breath in floor poses before the final rest.",
      ),
    },
    [
      ["sukhasana", 45],
      ["dandasana", 35],
      ["baddha-konasana", 40],
    ],
    [
      ["paschimottanasana", 40],
      ["ardha-matsyendrasana", 60],
      ["setu-bandha-sarvangasana", 40],
    ],
    [["viparita-karani", 60]],
    160,
  ),
];

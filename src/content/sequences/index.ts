import type { Sequence, SequenceStep } from "@/lib/models";
import { l } from "@/lib/utils";
import { ashtangaSequences } from "./ashtanga";

type TimedPose = {
  contentId: string;
  duration: number;
  stage: SequenceStep["stage"];
};

function sequence(
  details: Pick<
    Sequence,
    "id" | "name" | "description" | "style" | "level" | "duration" | "objective"
  >,
  poses: TimedPose[],
): Sequence {
  return {
    ...details,
    image: `/images/sequences/${details.id}.svg`,
    demo: false,
    steps: poses.map((pose, index) => ({
      ...pose,
      key: `${details.id}-${index + 1}`,
    })),
  };
}

export const sequences: Sequence[] = [
  ...ashtangaSequences,
  sequence(
    {
      id: "hatha-foundations",
      name: l("Volver a las bases", "Back to the foundations"),
      style: "hatha",
      level: "beginner",
      duration: 495,
      description: l(
        "Una práctica breve para reconocer apoyos y explorar tres posturas de pie a ambos lados. Usá una silla o bloques si te ayudan a mantener el equilibrio; volvé a Montaña entre lados y reducí el rango si aparece molestia. Cerrá con una apertura suave de caderas, Puente bajo y Savasana.",
        "A short practice to find your support and explore three standing poses on both sides. Use a chair or blocks if they help with balance; return to Mountain between sides and reduce your range if you feel discomfort. Close with a gentle hip opener, a low Bridge, and Savasana.",
      ),
      objective: l(
        "Practicar una alineación estable de pies y piernas, coordinar el movimiento con una respiración tranquila y cambiar de lado sin apuro.",
        "Practice steady foot and leg alignment, coordinate movement with an easy breath, and change sides without rushing.",
      ),
    },
    [
      { contentId: "sukhasana", duration: 30, stage: "centering" },
      { contentId: "tadasana", duration: 30, stage: "warm-up" },
      { contentId: "urdhva-hastasana", duration: 15, stage: "warm-up" },
      { contentId: "uttanasana", duration: 30, stage: "warm-up" },
      { contentId: "ardha-uttanasana", duration: 15, stage: "warm-up" },
      { contentId: "virabhadrasana-ii", duration: 80, stage: "asanas" },
      { contentId: "utthita-trikonasana", duration: 80, stage: "asanas" },
      { contentId: "utthita-parsvakonasana", duration: 80, stage: "asanas" },
      { contentId: "baddha-konasana", duration: 35, stage: "cool-down" },
      { contentId: "setu-bandha-sarvangasana", duration: 40, stage: "cool-down" },
      { contentId: "savasana", duration: 60, stage: "savasana" },
    ],
  ),
  sequence(
    {
      id: "yin-stillness",
      name: l("Un espacio de quietud", "A space for stillness"),
      style: "yin",
      level: "beginner",
      duration: 1680,
      description: l(
        "Una práctica Yin de 28 minutos con apoyos y pausas entre las permanencias. Empezá sentada, avanzá desde una apertura suave de caderas hacia posturas de suelo y terminá en Savasana. En Dragón bajo y Torsión tumbada, trabajá ambos lados dentro del intervalo indicado y volvé a una posición neutra entre ellos. La duración de cada paso incluye la entrada, la salida y el descanso; no necesitás sostener la postura todo ese tiempo. Aflojá la intensidad o salí ante dolor, hormigueo o adormecimiento.",
        "A 28-minute Yin practice with support and pauses between holds. Begin seated, move from a gentle hip opener into floor poses, and finish in Savasana. For Low Dragon and Reclined Twist, work both sides within the listed interval and return to neutral between sides. Each step includes entering, leaving, and resting; you do not need to hold the pose for the full interval. Ease off or come out if you feel pain, tingling, or numbness.",
      ),
      objective: l(
        "Explorar quietud y movilidad cómoda de caderas y columna, usando el apoyo y la respiración para reconocer cuándo conviene reducir el rango.",
        "Explore stillness and comfortable hip and spine mobility, using support and breath to notice when to reduce your range.",
      ),
    },
    [
      { contentId: "sukhasana", duration: 150, stage: "centering" },
      { contentId: "butterfly", duration: 240, stage: "warm-up" },
      { contentId: "dragon", duration: 360, stage: "asanas" },
      { contentId: "sphinx", duration: 180, stage: "asanas" },
      { contentId: "supported-child", duration: 180, stage: "cool-down" },
      { contentId: "reclined-twist", duration: 330, stage: "cool-down" },
      { contentId: "savasana", duration: 240, stage: "savasana" },
    ],
  ),
  sequence(
    {
      id: "aerial-foundations",
      name: l("Aerial · repaso supervisado", "Aerial · supervised review"),
      style: "aerial",
      level: "beginner",
      duration: 450,
      description: l(
        "Repaso de 7 minutos y medio en el suelo para prepararte a estudiar los apoyos con una persona instructora. Centrate en una silla firme y en una posición de pie estable; el paso Asiento con apoyo es un repaso sentado, no una entrada a la hamaca. No cargues peso en la tela ni practiques inversiones, transiciones o montajes por tu cuenta. Cerrá con descanso en Savasana.",
        "A seven-and-a-half-minute floor-based review to prepare for studying support with an instructor. Focus on a sturdy chair and a steady standing position; the Supported Seat step is a seated review, not an entry into the hammock. Do not load the fabric or practice inversions, transitions, or rigging on your own. Finish with Savasana.",
      ),
      objective: l(
        "Reconocer apoyos y repasar medidas básicas de seguridad antes de una clase de yoga aéreo presencial, siempre con supervisión y equipo revisado.",
        "Notice points of support and review basic safety before an in-person aerial yoga class, always with supervision and inspected equipment.",
      ),
    },
    [
      { contentId: "sukhasana", duration: 90, stage: "centering" },
      { contentId: "tadasana", duration: 90, stage: "warm-up" },
      { contentId: "supported-seat", duration: 120, stage: "asanas" },
      { contentId: "sukhasana", duration: 60, stage: "cool-down" },
      { contentId: "savasana", duration: 90, stage: "savasana" },
    ],
  ),
];

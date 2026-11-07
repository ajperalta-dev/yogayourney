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
  sequence(
    {
      id: "hatha-steady-flow",
      name: l("Hatha · equilibrio y alineación", "Hatha · balance and alignment"),
      style: "hatha",
      level: "intermediate",
      duration: 720,
      description: l(
        "Práctica equilibrada de 12 minutos: prepara las articulaciones, explora posturas de pie a ambos lados y baja al suelo para descansar. En las posturas unilaterales, repartí el tiempo entre ambos lados; usá bloques o una pared si lo necesitás.",
        "A balanced 12-minute practice: prepare the joints, explore standing poses on both sides, and come to the floor to rest. Share the time between both sides in asymmetrical poses; use blocks or a wall if helpful.",
      ),
      objective: l(
        "Coordinar respiración y alineación mientras cambia el apoyo entre ambos pies, una pierna y el suelo.",
        "Coordinate breath and alignment as support shifts between both feet, one leg, and the floor.",
      ),
    },
    [
      { contentId: "sukhasana", duration: 45, stage: "centering" },
      { contentId: "tadasana", duration: 30, stage: "warm-up" },
      { contentId: "urdhva-hastasana", duration: 20, stage: "warm-up" },
      { contentId: "uttanasana", duration: 30, stage: "warm-up" },
      { contentId: "ardha-uttanasana", duration: 25, stage: "warm-up" },
      { contentId: "virabhadrasana-i", duration: 60, stage: "asanas" },
      { contentId: "virabhadrasana-ii", duration: 60, stage: "asanas" },
      { contentId: "utthita-trikonasana", duration: 60, stage: "asanas" },
      { contentId: "utthita-parsvakonasana", duration: 60, stage: "asanas" },
      { contentId: "prasarita-padottanasana", duration: 45, stage: "asanas" },
      { contentId: "utkatasana", duration: 30, stage: "asanas" },
      { contentId: "baddha-konasana", duration: 30, stage: "cool-down" },
      { contentId: "setu-bandha-sarvangasana", duration: 45, stage: "cool-down" },
      { contentId: "savasana", duration: 180, stage: "savasana" },
    ],
  ),
  sequence(
    {
      id: "hatha-whole-body",
      name: l("Hatha · cuerpo completo", "Hatha · whole body"),
      style: "hatha",
      level: "advanced",
      duration: 1200,
      description: l(
        "Una práctica de 20 minutos con permanencias moderadas, alternancia entre posiciones de pie y suelo, y pausas para reorganizar los apoyos. Avanzado describe la continuidad y la autonomía para regular la práctica; no hace falta profundizar ni forzar ninguna postura.",
        "A 20-minute practice with moderate holds, alternation between standing and floor work, and pauses to reset your support. Advanced describes continuity and the ability to self-regulate; there is no need to deepen or force any pose.",
      ),
      objective: l(
        "Integrar equilibrio, movilidad de caderas, flexión y extensión suaves con una respiración estable.",
        "Integrate balance, hip mobility, gentle folding and extension with a steady breath.",
      ),
    },
    [
      { contentId: "sukhasana", duration: 60, stage: "centering" },
      { contentId: "tadasana", duration: 45, stage: "warm-up" },
      { contentId: "urdhva-hastasana", duration: 35, stage: "warm-up" },
      { contentId: "uttanasana", duration: 50, stage: "warm-up" },
      { contentId: "ardha-uttanasana", duration: 50, stage: "warm-up" },
      { contentId: "utkatasana", duration: 90, stage: "asanas" },
      { contentId: "virabhadrasana-i", duration: 110, stage: "asanas" },
      { contentId: "virabhadrasana-ii", duration: 110, stage: "asanas" },
      { contentId: "utthita-trikonasana", duration: 110, stage: "asanas" },
      { contentId: "utthita-parsvakonasana", duration: 110, stage: "asanas" },
      { contentId: "prasarita-padottanasana", duration: 80, stage: "asanas" },
      { contentId: "dandasana", duration: 60, stage: "cool-down" },
      { contentId: "baddha-konasana", duration: 60, stage: "cool-down" },
      { contentId: "setu-bandha-sarvangasana", duration: 70, stage: "cool-down" },
      { contentId: "savasana", duration: 160, stage: "savasana" },
    ],
  ),
  sequence(
    {
      id: "yin-grounding",
      name: l("Yin · enraizar y soltar", "Yin · ground and release"),
      style: "yin",
      level: "intermediate",
      duration: 1800,
      description: l(
        "Una práctica de 30 minutos con formas pasivas en el suelo, apoyos y pausas neutras. En Dragón y Torsión tumbada, distribuí el intervalo entre ambos lados y el descanso. El temporizador incluye las transiciones: no sostengas una forma si aparece dolor, hormigueo o adormecimiento.",
        "A 30-minute practice of passive floor shapes, props, and neutral pauses. In Dragon and Reclined Twist, share the interval between both sides and rest. The timer includes transitions: do not hold a shape if you feel pain, tingling, or numbness.",
      ),
      objective: l(
        "Observar sensaciones en caderas, parte anterior del torso y columna, sin buscar intensidad ni estiramiento máximo.",
        "Notice sensations in the hips, front body, and spine without seeking intensity or a maximum stretch.",
      ),
    },
    [
      { contentId: "sukhasana", duration: 120, stage: "centering" },
      { contentId: "butterfly", duration: 300, stage: "warm-up" },
      { contentId: "dragon", duration: 360, stage: "asanas" },
      { contentId: "sphinx", duration: 240, stage: "asanas" },
      { contentId: "reclined-twist", duration: 360, stage: "asanas" },
      { contentId: "supported-child", duration: 180, stage: "cool-down" },
      { contentId: "savasana", duration: 240, stage: "savasana" },
    ],
  ),
  sequence(
    {
      id: "yin-long-rest",
      name: l("Yin · descanso prolongado", "Yin · extended rest"),
      style: "yin",
      level: "advanced",
      duration: 2400,
      description: l(
        "Una práctica de 40 minutos con permanencias largas y apoyos generosos. Elegí variaciones que te permitan respirar con comodidad y salir sin prisa. Cada intervalo contempla ambos lados cuando corresponde, la salida y una pausa de rebote; reducilo si el cuerpo lo pide.",
        "A 40-minute practice with longer holds and generous support. Choose variations that let you breathe comfortably and leave without rushing. Each interval includes both sides when relevant, the exit, and a rebound pause; shorten it whenever your body asks.",
      ),
      objective: l(
        "Practicar quietud con atención a la respuesta individual, manteniendo una sensación tolerable y estable.",
        "Practice stillness while attending to your individual response and maintaining a tolerable, steady sensation.",
      ),
    },
    [
      { contentId: "sukhasana", duration: 120, stage: "centering" },
      { contentId: "butterfly", duration: 300, stage: "warm-up" },
      { contentId: "dragon", duration: 480, stage: "asanas" },
      { contentId: "sphinx", duration: 300, stage: "asanas" },
      { contentId: "reclined-twist", duration: 480, stage: "asanas" },
      { contentId: "supported-child", duration: 300, stage: "cool-down" },
      { contentId: "savasana", duration: 420, stage: "savasana" },
    ],
  ),
  sequence(
    {
      id: "aerial-intermediate-study",
      name: l("Aerial · apoyos y preparación", "Aerial · support and preparation"),
      style: "aerial",
      level: "intermediate",
      duration: 600,
      description: l(
        "Repaso teórico de 10 minutos, en el suelo y en una silla, para una clase presencial de nivel intermedio. No incluye montajes, carga de peso ni formas invertidas. El contenido de la hamaca debe practicarse únicamente con una persona instructora y equipo revisado.",
        "A 10-minute theory review on the floor and in a chair for an in-person intermediate class. It does not include rigging, weight-bearing, or inverted shapes. Hammock work must only be practiced with an instructor and inspected equipment.",
      ),
      objective: l(
        "Repasar consentimiento, revisión del equipo y señales para detener una práctica asistida.",
        "Review consent, equipment checks, and cues for stopping an assisted practice.",
      ),
    },
    [
      { contentId: "sukhasana", duration: 90, stage: "centering" },
      { contentId: "tadasana", duration: 90, stage: "warm-up" },
      { contentId: "supported-seat", duration: 180, stage: "asanas" },
      { contentId: "sukhasana", duration: 90, stage: "cool-down" },
      { contentId: "savasana", duration: 150, stage: "savasana" },
    ],
  ),
  sequence(
    {
      id: "aerial-advanced-study",
      name: l("Aerial · práctica avanzada supervisada", "Aerial · supervised advanced study"),
      style: "aerial",
      level: "advanced",
      duration: 900,
      description: l(
        "Repaso educativo de 15 minutos previo a una clase avanzada presencial. Revisa el consentimiento, la inspección profesional y los criterios para que el instructor determine si una inversión es apropiada. No es una secuencia de inversiones: la app no puede comprobar el montaje, asegurar asistencia física ni valorar condiciones de salud.",
        "A 15-minute educational review before an in-person advanced class. Review consent, professional inspection, and the criteria an instructor uses to decide whether an inversion is appropriate. This is not an inversion sequence: the app cannot check rigging, provide physical spotting, or assess health conditions.",
      ),
      objective: l(
        "Identificar límites de la práctica remota y preparar preguntas de seguridad para una persona instructora cualificada.",
        "Recognize the limits of remote practice and prepare safety questions for a qualified instructor.",
      ),
    },
    [
      { contentId: "sukhasana", duration: 120, stage: "centering" },
      { contentId: "tadasana", duration: 120, stage: "warm-up" },
      { contentId: "supported-seat", duration: 240, stage: "asanas" },
      { contentId: "sukhasana", duration: 120, stage: "cool-down" },
      { contentId: "savasana", duration: 300, stage: "savasana" },
    ],
  ),
];

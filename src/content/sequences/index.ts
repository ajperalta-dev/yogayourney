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
        "Una práctica Yin de 28 minutos con apoyos y pausas neutras explícitas de 30 segundos entre posturas. Empezá sentada, abrí caderas, continuá en el suelo y cerrá con Savasana. El tiempo de Dragón bajo y Torsión tumbada contempla ambos lados; salí ante dolor, hormigueo o adormecimiento.",
        "A 28-minute supported Yin practice with explicit 30-second neutral pauses between poses. Begin seated, explore the hips and floor shapes, and close with Savasana. Low Dragon and Reclined Twist timers include both sides; leave for pain, tingling, or numbness.",
      ),
      objective: l(
        "Explorar quietud y movilidad cómoda de caderas y columna, usando el apoyo y la respiración para reconocer cuándo conviene reducir el rango.",
        "Explore stillness and comfortable hip and spine mobility, using support and breath to notice when to reduce your range.",
      ),
    },
    [
      { contentId: "sukhasana", duration: 150, stage: "centering" },
      { contentId: "butterfly", duration: 240, stage: "warm-up" },
      { contentId: "savasana", duration: 30, stage: "warm-up" },
      { contentId: "dragon", duration: 360, stage: "asanas" },
      { contentId: "savasana", duration: 30, stage: "asanas" },
      { contentId: "sphinx", duration: 180, stage: "asanas" },
      { contentId: "savasana", duration: 30, stage: "asanas" },
      { contentId: "supported-child", duration: 180, stage: "cool-down" },
      { contentId: "savasana", duration: 30, stage: "cool-down" },
      { contentId: "reclined-twist", duration: 330, stage: "cool-down" },
      { contentId: "savasana", duration: 30, stage: "cool-down" },
      { contentId: "savasana", duration: 90, stage: "savasana" },
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
        "Una práctica de 30 minutos con formas pasivas, apoyos y pausas neutras explícitas de 30 segundos. Distribuí Dragón y Torsión tumbada entre ambos lados. Detente si aparece dolor, hormigueo o adormecimiento.",
        "A 30-minute practice of passive floor shapes, props, and explicit 30-second neutral pauses. Share Dragon and Reclined Twist across both sides. Leave if you feel pain, tingling, or numbness.",
      ),
      objective: l(
        "Observar sensaciones en caderas, parte anterior del torso y columna, sin buscar intensidad ni estiramiento máximo.",
        "Notice sensations in the hips, front body, and spine without seeking intensity or a maximum stretch.",
      ),
    },
    [
      { contentId: "sukhasana", duration: 120, stage: "centering" },
      { contentId: "butterfly", duration: 300, stage: "warm-up" },
      { contentId: "savasana", duration: 30, stage: "warm-up" },
      { contentId: "dragon", duration: 360, stage: "asanas" },
      { contentId: "savasana", duration: 30, stage: "asanas" },
      { contentId: "sphinx", duration: 240, stage: "asanas" },
      { contentId: "savasana", duration: 30, stage: "asanas" },
      { contentId: "reclined-twist", duration: 360, stage: "asanas" },
      { contentId: "savasana", duration: 30, stage: "asanas" },
      { contentId: "supported-child", duration: 180, stage: "cool-down" },
      { contentId: "savasana", duration: 30, stage: "cool-down" },
      { contentId: "savasana", duration: 90, stage: "savasana" },
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
        "Una práctica de 40 minutos con apoyos generosos y pausas neutras explícitas de 30 segundos. Elegí variaciones que permitan respirar y salir sin prisa. Los intervalos largos pueden acortarse en cualquier momento.",
        "A 40-minute practice with generous support and explicit 30-second neutral pauses. Choose shapes that let you breathe and leave without rushing. Long holds can be shortened at any time.",
      ),
      objective: l(
        "Practicar quietud con atención a la respuesta individual, manteniendo una sensación tolerable y estable.",
        "Practice stillness while attending to your individual response and maintaining a tolerable, steady sensation.",
      ),
    },
    [
      { contentId: "sukhasana", duration: 120, stage: "centering" },
      { contentId: "butterfly", duration: 300, stage: "warm-up" },
      { contentId: "savasana", duration: 30, stage: "warm-up" },
      { contentId: "dragon", duration: 480, stage: "asanas" },
      { contentId: "savasana", duration: 30, stage: "asanas" },
      { contentId: "sphinx", duration: 300, stage: "asanas" },
      { contentId: "savasana", duration: 30, stage: "asanas" },
      { contentId: "reclined-twist", duration: 480, stage: "asanas" },
      { contentId: "savasana", duration: 30, stage: "asanas"},
      { contentId: "supported-child", duration: 300, stage: "cool-down" },
      { contentId: "savasana", duration: 30, stage: "cool-down" },
      { contentId: "savasana", duration: 270, stage: "savasana" },
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
  sequence(
    {
      id: "yin-15-minute-reset",
      name: l("Yin · pausa de 15 minutos", "Yin · 15-minute reset"),
      style: "yin", level: "beginner", duration: 900,
      description: l("Una práctica breve para principiantes: tres formas cómodas, una pausa neutra de 30 segundos entre ellas y Savasana. Usa apoyos y reduce cualquier permanencia que no permita respirar con facilidad.", "A brief beginner practice with three comfortable shapes, a 30-second neutral pause between them, and Savasana. Use props and shorten any hold that makes breathing uncomfortable."),
      objective: l("Bajar el ritmo y explorar caderas y columna sin buscar amplitud máxima.", "Slow down and explore the hips and spine without seeking maximum range."),
    },
    [
      { contentId: "sukhasana", duration: 60, stage: "centering" },
      { contentId: "butterfly", duration: 180, stage: "warm-up" },
      { contentId: "savasana", duration: 30, stage: "warm-up" },
      { contentId: "caterpillar", duration: 180, stage: "asanas" },
      { contentId: "savasana", duration: 30, stage: "asanas" },
      { contentId: "reclined-twist", duration: 120, stage: "cool-down" },
      { contentId: "savasana", duration: 300, stage: "savasana" },
    ],
  ),
  sequence(
    {
      id: "yin-hips-45",
      name: l("Yin · caderas con apoyo", "Yin · supported hips"),
      style: "yin", level: "beginner", duration: 2700,
      description: l("Práctica de 45 minutos para caderas, con siete permanencias de hasta cinco minutos, pausas neutras de 30 segundos y cierre en Savasana. Dragón se reparte entre ambos lados; saddle es opcional y puede sustituirse por descanso.", "A 45-minute hip practice with seven holds of up to five minutes, 30-second neutral pauses, and Savasana. Share Dragon across both sides; Saddle is optional and may be replaced with rest."),
      objective: l("Explorar rotación y flexión de cadera, priorizando comodidad de rodillas y respiración libre.", "Explore hip rotation and flexion while prioritizing comfortable knees and easy breathing."),
    },
    [
      { contentId: "sukhasana", duration: 120, stage: "centering" },
      { contentId: "butterfly", duration: 300, stage: "warm-up" }, { contentId: "savasana", duration: 30, stage: "warm-up" },
      { contentId: "shoelace", duration: 300, stage: "asanas" }, { contentId: "savasana", duration: 30, stage: "asanas" },
      { contentId: "dragon", duration: 300, stage: "asanas" }, { contentId: "savasana", duration: 30, stage: "asanas" },
      { contentId: "saddle", duration: 300, stage: "asanas" }, { contentId: "savasana", duration: 30, stage: "asanas" },
      { contentId: "banana-pose", duration: 300, stage: "asanas" }, { contentId: "savasana", duration: 30, stage: "asanas" },
      { contentId: "reclined-twist", duration: 300, stage: "cool-down" }, { contentId: "savasana", duration: 30, stage: "cool-down" },
      { contentId: "butterfly", duration: 300, stage: "cool-down" },
      { contentId: "savasana", duration: 300, stage: "savasana" },
    ],
  ),
  sequence(
    {
      id: "yin-legs-55",
      name: l("Yin · piernas y cadena posterior", "Yin · legs and back body"),
      style: "yin", level: "intermediate", duration: 3300,
      description: l("Sesión de 55 minutos para piernas y espalda posterior. Mantén rodillas blandas en Oruga, usa una pausa neutra de 30 segundos entre formas y termina en Savasana.", "A 55-minute session for the legs and back body. Keep the knees soft in Caterpillar, take a 30-second neutral pause between shapes, and finish in Savasana."),
      objective: l("Observar sensaciones en isquiotibiales, caderas y muslos sin tirar de las articulaciones.", "Notice hamstring, hip, and thigh sensations without pulling on the joints."),
    },
    [
      { contentId: "sukhasana", duration: 180, stage: "centering" },
      { contentId: "caterpillar", duration: 360, stage: "warm-up" }, { contentId: "savasana", duration: 30, stage: "warm-up" },
      { contentId: "dragon", duration: 360, stage: "asanas" }, { contentId: "savasana", duration: 30, stage: "asanas" },
      { contentId: "shoelace", duration: 360, stage: "asanas" }, { contentId: "savasana", duration: 30, stage: "asanas" },
      { contentId: "butterfly", duration: 360, stage: "asanas" }, { contentId: "savasana", duration: 30, stage: "asanas" },
      { contentId: "banana-pose", duration: 360, stage: "asanas" }, { contentId: "savasana", duration: 30, stage: "asanas" },
      { contentId: "saddle", duration: 360, stage: "cool-down" }, { contentId: "savasana", duration: 30, stage: "cool-down" },
      { contentId: "supported-child", duration: 360, stage: "cool-down" },
      { contentId: "savasana", duration: 420, stage: "savasana" },
    ],
  ),
  sequence(
    {
      id: "yin-spine-60",
      name: l("Yin · columna y hombros", "Yin · spine and shoulders"),
      style: "yin", level: "intermediate", duration: 3600,
      description: l("Práctica de 60 minutos que alterna extensión suave, apertura de hombros, flexión y formas laterales. Descansa 30 segundos en neutral entre posturas; ninguna forma debe comprimir cuello o zona lumbar.", "A 60-minute practice alternating gentle extension, shoulder opening, folding, and side-body shapes. Rest in neutral for 30 seconds between poses; no shape should compress the neck or lower back."),
      objective: l("Dar atención a la movilidad cómoda de columna torácica y cintura escapular, con opciones de apoyo.", "Attend to comfortable thoracic-spine and shoulder-girdle movement with supported options."),
    },
    [
      { contentId: "sukhasana", duration: 120, stage: "centering" },
      { contentId: "melting-heart", duration: 330, stage: "warm-up" }, { contentId: "savasana", duration: 30, stage: "warm-up" },
      { contentId: "sphinx", duration: 330, stage: "asanas" }, { contentId: "savasana", duration: 30, stage: "asanas" },
      { contentId: "banana-pose", duration: 330, stage: "asanas" }, { contentId: "savasana", duration: 30, stage: "asanas" },
      { contentId: "caterpillar", duration: 330, stage: "asanas" }, { contentId: "savasana", duration: 30, stage: "asanas" },
      { contentId: "reclined-twist", duration: 330, stage: "asanas" }, { contentId: "savasana", duration: 30, stage: "asanas" },
      { contentId: "supported-child", duration: 330, stage: "cool-down" }, { contentId: "savasana", duration: 30, stage: "cool-down" },
      { contentId: "melting-heart", duration: 330, stage: "cool-down" },
      { contentId: "savasana", duration: 30, stage: "cool-down" },
      { contentId: "shoelace", duration: 330, stage: "cool-down" },
      { contentId: "savasana", duration: 630, stage: "savasana" },
    ],
  ),
  sequence(
    {
      id: "yin-evening-75",
      name: l("Yin · relajación nocturna de cuerpo completo", "Yin · full-body evening unwind"),
      style: "yin", level: "advanced", duration: 4500,
      description: l("Práctica extensa de 75 minutos. Alterna suelo, flexiones y apoyos; haz Dragón y Torsión tumbada a ambos lados, con pausas neutras de 30 segundos y Savasana final. Los minutos son máximos orientativos: puedes salir o descansar antes.", "An extended 75-minute practice alternating floor shapes, folds, and support; practice Dragon and Reclined Twist on both sides, with 30-second neutral pauses and final Savasana. Listed times are upper guides: leave or rest sooner whenever needed."),
      objective: l("Cerrar el día con atención tranquila a todo el cuerpo, sin interpretar meridianos como anatomía ni buscar una respuesta energética garantizada.", "Close the day with quiet whole-body attention, without treating meridians as anatomy or expecting a guaranteed energetic effect."),
    },
    [
      { contentId: "sukhasana", duration: 120, stage: "centering" },
      { contentId: "butterfly", duration: 300, stage: "warm-up" }, { contentId: "savasana", duration: 30, stage: "warm-up" },
      { contentId: "shoelace", duration: 300, stage: "asanas" }, { contentId: "savasana", duration: 30, stage: "asanas" },
      { contentId: "dragon", duration: 300, stage: "asanas" }, { contentId: "savasana", duration: 30, stage: "asanas" },
      { contentId: "dragon", duration: 300, stage: "asanas" }, { contentId: "savasana", duration: 30, stage: "asanas" },
      { contentId: "caterpillar", duration: 300, stage: "asanas" }, { contentId: "savasana", duration: 30, stage: "asanas" },
      { contentId: "sphinx", duration: 300, stage: "asanas" }, { contentId: "savasana", duration: 30, stage: "asanas" },
      { contentId: "melting-heart", duration: 300, stage: "asanas" }, { contentId: "savasana", duration: 30, stage: "asanas" },
      { contentId: "banana-pose", duration: 300, stage: "asanas" }, { contentId: "savasana", duration: 30, stage: "asanas" },
      { contentId: "reclined-twist", duration: 300, stage: "cool-down" }, { contentId: "savasana", duration: 30, stage: "cool-down" },
      { contentId: "reclined-twist", duration: 300, stage: "cool-down" }, { contentId: "savasana", duration: 30, stage: "cool-down" },
      { contentId: "supported-child", duration: 300, stage: "cool-down" }, { contentId: "savasana", duration: 30, stage: "cool-down" },
      { contentId: "butterfly", duration: 300, stage: "cool-down" },
      { contentId: "savasana", duration: 450, stage: "savasana" },
    ],
  ),
];

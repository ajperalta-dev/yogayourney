import type { Flashcard, QuizQuestion } from "@/lib/models";
import { l } from "@/lib/utils";
const philosophyCards: Flashcard[] = ([
  ["fc-phil-01", "¿Qué significa darśana?", "What does darśana mean?", "Visión o perspectiva filosófica.", "A philosophical vision or perspective."],
  ["fc-phil-02", "¿Cuáles son los seis darśanas clásicos?", "What are the six classical darśanas?", "Nyāya, Vaiśeṣika, Sāṃkhya, Yoga, Pūrvamīmāṃsā y Vedānta.", "Nyāya, Vaiśeṣika, Sāṃkhya, Yoga, Pūrvamīmāṃsā, and Vedānta."],
  ["fc-phil-03", "¿Qué estudia Sāṃkhya?", "What does Sāṃkhya study?", "La distinción entre puruṣa y prakṛti y la evolución de la experiencia.", "The distinction between puruṣa and prakṛti and the unfolding of experience."],
  ["fc-phil-04", "¿Qué representa puruṣa en Sāṃkhya?", "What does puruṣa represent in Sāṃkhya?", "Conciencia o principio testigo.", "Consciousness or the witnessing principle."],
  ["fc-phil-05", "¿Qué representa prakṛti?", "What does prakṛti represent?", "Naturaleza primordial, caracterizada por los tres guṇas.", "Primordial nature, characterized by the three guṇas."],
  ["fc-phil-06", "Nombra los tres guṇas.", "Name the three guṇas.", "Sattva, rajas y tamas.", "Sattva, rajas, and tamas."],
  ["fc-phil-07", "¿Cuántos tattvas enumera habitualmente Sāṃkhya?", "How many tattvas does Sāṃkhya commonly enumerate?", "24 principios de prakṛti más puruṣa como el 25.º.", "24 prakṛti principles, with puruṣa as the 25th."],
  ["fc-phil-08", "¿Qué significa Advaita?", "What does Advaita mean?", "No dualidad.", "Non-duality."],
  ["fc-phil-09", "¿Qué relación postula Advaita entre ātman y brahman?", "What relationship does Advaita posit between ātman and brahman?", "En la lectura clásica, el sí mismo profundo no es distinto de brahman.", "In the classical reading, the deepest self is not distinct from brahman."],
  ["fc-phil-10", "¿Māyā significa que el mundo no existe?", "Does māyā mean the world does not exist?", "No; sus sentidos son más matizados y varían entre escuelas.", "No; its meanings are more nuanced and vary among schools."],
  ["fc-phil-11", "¿Qué escena enmarca la Bhagavad Gītā?", "What scene frames the Bhagavad Gītā?", "El diálogo entre Arjuna y Krishna antes de una batalla del Mahābhārata.", "The dialogue between Arjuna and Krishna before a Mahābhārata battle."],
  ["fc-phil-12", "¿Qué explora Arjuna en la Gītā?", "What does Arjuna explore in the Gītā?", "Un dilema sobre deber, acción, guerra y consecuencias.", "A dilemma about duty, action, war, and consequences."],
  ["fc-phil-13", "¿Qué propone karma-yoga?", "What does karma-yoga propose?", "Actuar con disciplina sin quedar dominado por el apego al fruto.", "Act with discipline without being ruled by attachment to results."],
  ["fc-phil-14", "¿Qué significa dharma?", "What does dharma mean?", "Puede significar deber, enseñanza, orden o conducta apropiada según contexto.", "It can mean duty, teaching, order, or appropriate conduct, by context."],
  ["fc-phil-15", "¿Qué son los kleśas?", "What are the kleśas?", "Aflicciones u obstáculos en el marco filosófico de Patañjali.", "Afflictions or obstacles in Patañjali's philosophical framework."],
  ["fc-phil-16", "Nombra los cinco kleśas.", "Name the five kleśas.", "Avidyā, asmitā, rāga, dveṣa y abhiniveśa.", "Avidyā, asmitā, rāga, dveṣa, and abhiniveśa."],
  ["fc-phil-17", "¿Qué significa citta?", "What does citta mean?", "El campo de la mente o de la experiencia mental en este sistema.", "The field of mind or mental experience in this system."],
  ["fc-phil-18", "¿Qué es una vṛtti?", "What is a vṛtti?", "Un movimiento o patrón mental.", "A mental movement or pattern."],
  ["fc-phil-19", "¿Cuáles son las cinco vṛttis?", "What are the five vṛttis?", "Pramāṇa, viparyaya, vikalpa, nidrā y smṛti.", "Pramāṇa, viparyaya, vikalpa, nidrā, and smṛti."],
  ["fc-phil-20", "¿Qué sugiere citta-vṛtti-nirodha?", "What does citta-vṛtti-nirodha suggest?", "Regular o aquietar los patrones de la mente; no necesariamente reprimirlos.", "Regulating or settling mental patterns; not necessarily suppressing them."],
  ["fc-phil-21", "¿Cuáles son los cuatro pādas de Yoga Sūtra?", "What are the four pādas of the Yoga Sūtra?", "Samādhi, Sādhana, Vibhūti y Kaivalya.", "Samādhi, Sādhana, Vibhūti, and Kaivalya."],
  ["fc-phil-22", "¿Qué enuncia Yoga Sūtra II.29?", "What does Yoga Sūtra II.29 list?", "Los ocho miembros del yoga.", "The eight limbs of yoga."],
  ["fc-phil-23", "Nombra los ocho miembros.", "Name the eight limbs.", "Yama, niyama, āsana, prāṇāyāma, pratyāhāra, dhāraṇā, dhyāna y samādhi.", "Yama, niyama, āsana, prāṇāyāma, pratyāhāra, dhāraṇā, dhyāna, and samādhi."],
  ["fc-phil-24", "¿Qué es ahiṃsā?", "What is ahiṃsā?", "No dañar o reducir el daño.", "Non-harming or reducing harm."],
  ["fc-phil-25", "¿Qué es satya?", "What is satya?", "Veracidad, atendiendo también a cómo comunicamos.", "Truthfulness, including how we communicate."],
  ["fc-phil-26", "¿Qué es asteya?", "What is asteya?", "No tomar lo que no se ha dado; también reconocer crédito y trabajo.", "Not taking what is not given; also crediting work and contributions."],
  ["fc-phil-27", "¿Qué es brahmacarya en interpretaciones diversas?", "What is brahmacarya across varied interpretations?", "Conducta disciplinada o continencia; su interpretación depende de tradición.", "Disciplined conduct or continence; interpretation depends on tradition."],
  ["fc-phil-28", "¿Qué es aparigraha?", "What is aparigraha?", "No acumular ni aferrarse a posesiones o resultados.", "Non-hoarding or non-clinging to possessions or outcomes."],
  ["fc-phil-29", "Nombra los cinco niyamas.", "Name the five niyamas.", "Śauca, santoṣa, tapas, svādhyāya e īśvara-praṇidhāna.", "Śauca, santoṣa, tapas, svādhyāya, and īśvara-praṇidhāna."],
  ["fc-phil-30", "¿Cómo define II.46 āsana?", "How does II.46 define āsana?", "Como estable y cómoda; las traducciones varían.", "As steady and comfortable; translations vary."],
  ["fc-phil-31", "¿Qué describe pratyāhāra?", "What does pratyāhāra describe?", "El recogimiento de los sentidos respecto de sus objetos.", "The senses withdrawing from their objects."],
  ["fc-phil-32", "¿En qué difieren dhāraṇā y dhyāna?", "How do dhāraṇā and dhyāna differ?", "Dhāraṇā fija la atención; dhyāna es su continuidad meditativa.", "Dhāraṇā fixes attention; dhyāna is its sustained meditative flow."],
  ["fc-phil-33", "¿Qué es īśvara en Patañjali?", "What is Īśvara in Patañjali?", "Un puruṣa especial según I.24; su interpretación teísta varía.", "A special puruṣa in I.24; theistic interpretations vary."],
  ["fc-phil-34", "¿Qué pares presenta I.12 como medios?", "Which pair does I.12 present as means?", "Abhyāsa y vairāgya: práctica persistente y desapego.", "Abhyāsa and vairāgya: sustained practice and nonattachment."],
  ["fc-phil-35", "¿Son kośas capas anatómicas?", "Are kośas anatomical layers?", "No; son envolturas de un mapa tradicional de experiencia.", "No; they are sheaths in a traditional map of experience."],
  ["fc-phil-36", "¿Qué es una nāḍī?", "What is a nāḍī?", "Un canal sutil de ciertos modelos tradicionales, no una estructura anatómica verificada.", "A subtle channel in certain traditional models, not a verified anatomical structure."],
  ["fc-phil-37", "¿Todos los textos usan el mismo sistema de cakras?", "Do all texts use the same cakra system?", "No; los sistemas y números varían históricamente.", "No; systems and numbers vary historically."],
  ["fc-phil-38", "¿Prāṇa es idéntico al oxígeno?", "Is prāṇa identical to oxygen?", "No; es un concepto tradicional de aliento o fuerza vital.", "No; it is a traditional concept of breath or life force."],
  ["fc-phil-39", "¿Cuáles son los tres cuerpos en algunas lecturas Vedānta?", "What are the three bodies in some Vedānta readings?", "Sthūla, sūkṣma y kāraṇa śarīra.", "Sthūla, sūkṣma, and kāraṇa śarīra."],
  ["fc-phil-40", "¿Qué presenta Māṇḍūkya como turīya?", "What does the Māṇḍūkya present as turīya?", "“El cuarto”, no reducible a los estados ordinarios de vigilia, sueño y sueño profundo.", "“The fourth,” not reducible to ordinary waking, dream, and deep-sleep states."],
] as const).map(([id, frontEs, frontEn, backEs, backEn]) => ({
  id,
  category: "Philosophy",
  front: l(frontEs, frontEn),
  back: l(backEs, backEn),
}));

export const flashcards: Flashcard[] = [
  {
    id: "fc-sanskrit",
    category: "Sanskrit",
    front: l("¿Qué significa Tāḍāsana?", "What does Tāḍāsana mean?"),
    back: l("Postura de la montaña.", "Mountain pose."),
  },
  {
    id: "fc-anatomy",
    category: "Anatomy",
    front: l("Nombra dos movimientos de la cadera.", "Name two hip movements."),
    back: l(
      "Por ejemplo: flexión y extensión.",
      "For example: flexion and extension.",
    ),
  },
  {
    id: "fc-asana",
    category: "Asanas",
    front: l(
      "¿Qué apoyo puede ayudar en Trikonasana?",
      "What support can help in Trikonasana?",
    ),
    back: l(
      "Un bloque bajo la mano, ajustando su altura.",
      "A block under the hand, with an appropriate height.",
    ),
  },
  {
    id: "fc-breath",
    category: "Pranayama",
    front: l(
      "¿Se incluyen retenciones en Sama Vritti?",
      "Does Sama Vritti include breath holds?",
    ),
    back: l(
      "No. Se usa un ritmo cómodo de entrada y salida.",
      "No. It uses a comfortable inhalation and exhalation rhythm.",
    ),
  },
  {
    id: "fc-ayurveda",
    category: "Ayurveda",
    front: l("¿Qué describe Dinacharya?", "What does Dinacharya describe?"),
    back: l(
      "Rutinas cotidianas dentro de Ayurveda.",
      "Daily routines within Ayurveda.",
    ),
  },
  {
    id: "fc-philosophy",
    category: "Philosophy",
    front: l("¿Qué significa ahimsa?", "What does ahimsa mean?"),
    back: l(
      "No violencia; una invitación a actuar sin causar daño.",
      "Non-harming; an invitation to act without causing harm.",
    ),
  },
  ...philosophyCards,
];
export const quizQuestions: QuizQuestion[] = [
  {
    id: "q-sanskrit",
    category: "Sanskrit",
    question: l(
      "¿Cuál es el nombre sánscrito de Montaña?",
      "What is the Sanskrit name of Mountain pose?",
    ),
    options: [
      l("Tāḍāsana", "Tāḍāsana"),
      l("Śavāsana", "Śavāsana"),
      l("Bhujaṅgāsana", "Bhujaṅgāsana"),
    ],
    correct: 0,
    explanation: l(
      "Tāḍāsana es la postura de la montaña.",
      "Tāḍāsana is Mountain pose.",
    ),
  },
  {
    id: "q-anatomy",
    category: "Anatomy",
    question: l(
      "¿Cuál es un movimiento de la cadera?",
      "Which is a hip movement?",
    ),
    options: [
      l("Pronación del antebrazo", "Forearm pronation"),
      l("Flexión", "Flexion"),
      l("Flexión del codo", "Elbow flexion"),
    ],
    correct: 1,
    explanation: l(
      "La cadera permite flexión, extensión y otros movimientos.",
      "The hip allows flexion, extension and other movements.",
    ),
  },
  {
    id: "q-yoga",
    category: "Yoga",
    question: l(
      "¿Qué hacer si una postura produce dolor?",
      "What should you do if a pose causes pain?",
    ),
    options: [
      l("Aguantar más", "Hold longer"),
      l("Contener la respiración", "Hold your breath"),
      l("Salir y adaptar la práctica", "Come out and adapt the practice"),
    ],
    correct: 2,
    explanation: l(
      "El dolor no es un objetivo de la práctica.",
      "Pain is not a goal of practice.",
    ),
  },
  {
    id: "q-breath",
    category: "Pranayama",
    question: l(
      "¿Cómo debe sentirse el ritmo respiratorio?",
      "How should the breathing rhythm feel?",
    ),
    options: [
      l("Cómodo y sin esfuerzo", "Comfortable and unforced"),
      l("Cada vez más intenso", "Increasingly intense"),
      l("Siempre igual para todos", "Always the same for everyone"),
    ],
    correct: 0,
    explanation: l(
      "El ritmo se adapta a cada persona.",
      "The rhythm is adapted to each person.",
    ),
  },
  {
    id: "q-ayurveda",
    category: "Ayurveda",
    question: l(
      "¿Cómo se presentan los doshas en esta app?",
      "How are doshas presented in this app?",
    ),
    options: [
      l("Como diagnósticos clínicos", "As clinical diagnoses"),
      l("Como conceptos tradicionales", "As traditional concepts"),
      l("Como recetas médicas", "As medical prescriptions"),
    ],
    correct: 1,
    explanation: l(
      "Se estudia su contexto cultural, sin diagnosticar.",
      "Their cultural context is studied without diagnosis.",
    ),
  },
];

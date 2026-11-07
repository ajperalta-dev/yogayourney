import type { Flashcard, QuizQuestion } from "@/lib/models";
import { l } from "@/lib/utils";
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

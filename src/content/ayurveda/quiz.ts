import type { Localized } from "@/lib/models";

export type Dosha = "vata" | "pitta" | "kapha";

export type DoshaQuizQuestion = {
  prompt: Localized;
  options: { dosha: Dosha; label: Localized }[];
};

export const doshaQuizQuestions: DoshaQuizQuestion[] = [
  {
    prompt: {
      es: "Pensando en tu forma habitual a lo largo del tiempo, ¿qué ritmo reconoces más?",
      en: "Thinking about your usual pattern over time, which rhythm feels most familiar?",
    },
    options: [
      { dosha: "vata", label: { es: "Rápido y variable", en: "Quick and changeable" } },
      { dosha: "pitta", label: { es: "Enfocado e intenso", en: "Focused and purposeful" } },
      { dosha: "kapha", label: { es: "Constante y pausado", en: "Steady and unhurried" } },
    ],
  },
  {
    prompt: {
      es: "Al comenzar un proyecto nuevo, sueles…",
      en: "When starting a new project, you tend to…",
    },
    options: [
      { dosha: "vata", label: { es: "Generar muchas ideas y cambiar de foco", en: "Generate many ideas and shift focus" } },
      { dosha: "pitta", label: { es: "Definir una meta y avanzar hacia ella", en: "Set a goal and work toward it" } },
      { dosha: "kapha", label: { es: "Observar primero y avanzar con constancia", en: "Observe first and move forward steadily" } },
    ],
  },
  {
    prompt: {
      es: "En un día ordinario, tu energía suele sentirse…",
      en: "On an ordinary day, your energy usually feels…",
    },
    options: [
      { dosha: "vata", label: { es: "En oleadas, con subidas y bajadas", en: "Changeable, with ups and downs" } },
      { dosha: "pitta", label: { es: "Concentrada y orientada a tareas", en: "Focused and task-oriented" } },
      { dosha: "kapha", label: { es: "Duradera, aunque tarda en arrancar", en: "Lasting, though slow to get started" } },
    ],
  },
  {
    prompt: {
      es: "Tu apetito típico, sin contar una enfermedad o un día excepcional, suele ser…",
      en: "Your typical appetite, aside from illness or an unusual day, is usually…",
    },
    options: [
      { dosha: "vata", label: { es: "Variable y a veces impredecible", en: "Variable and sometimes unpredictable" } },
      { dosha: "pitta", label: { es: "Marcado y bastante regular", en: "Noticeable and fairly regular" } },
      { dosha: "kapha", label: { es: "Más bien estable y moderado", en: "Fairly steady and moderate" } },
    ],
  },
  {
    prompt: {
      es: "¿Qué tipo de movimiento te atrae de forma natural?",
      en: "What kind of movement naturally appeals to you?",
    },
    options: [
      { dosha: "vata", label: { es: "Variado, creativo y en intervalos", en: "Varied, creative, and in shorter bouts" } },
      { dosha: "pitta", label: { es: "Con un objetivo o reto claro", en: "With a clear goal or challenge" } },
      { dosha: "kapha", label: { es: "Regular, sostenido y sin prisa", en: "Regular, sustained, and unhurried" } },
    ],
  },
  {
    prompt: {
      es: "Cuando tienes tiempo libre, prefieres…",
      en: "When you have free time, you prefer to…",
    },
    options: [
      { dosha: "vata", label: { es: "Probar algo nuevo o espontáneo", en: "Try something new or spontaneous" } },
      { dosha: "pitta", label: { es: "Avanzar en una actividad que te interesa", en: "Make progress on an activity you care about" } },
      { dosha: "kapha", label: { es: "Disfrutar una actividad conocida y tranquila", en: "Enjoy a familiar, relaxed activity" } },
    ],
  },
];

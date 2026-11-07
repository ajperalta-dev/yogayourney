import type { Localized } from "@/lib/models";
import { l } from "@/lib/utils";

export type PracticeWindow = 10 | 20 | 45 | 60;
export type TimeOfDay = "morning" | "midday" | "evening";

export type PlannerDay = {
  /** Monday is 1; Sunday is 7. */
  day: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  focus: Localized;
  availableMinutes?: PracticeWindow;
  rest?: boolean;
  sequenceIds: string[];
  pranayamaIds: string[];
  meditationIds: string[];
};

export type WeeklyPracticePlan = {
  id: string;
  name: Localized;
  description: Localized;
  rhythm: Localized;
  days: PlannerDay[];
};

export type RoutineSuggestion = {
  id: string;
  timeOfDay: TimeOfDay;
  availableMinutes: PracticeWindow;
  name: Localized;
  description: Localized;
  sequenceIds: string[];
  pranayamaIds: string[];
  meditationIds: string[];
};

export const weeklyPracticePlans: WeeklyPracticePlan[] = [
  {
    id: "beginner-week",
    name: l("Principiante · crear un ritmo", "Beginner · build a steady rhythm"),
    description: l(
      "Una semana amable con sesiones cortas, opciones de descanso y variedad entre movimiento, respiración y meditación.",
      "A gentle week with short sessions, rest options, and a mix of movement, breathing, and meditation.",
    ),
    rhythm: l(
      "Cinco prácticas opcionales y dos días de recuperación. Si recién empiezas, repite solo tres o cuatro días y deja al menos un día sin secuencia.",
      "Five optional practices and two recovery days. If you are new, repeat only three or four days and leave at least one day without a sequence.",
    ),
    days: [
      { day: 1, focus: l("Moverse y asentarse", "Move and settle"), availableMinutes: 20, sequenceIds: ["hatha-foundations"], pranayamaIds: ["dirga-pranayama"], meditationIds: ["breath-awareness"] },
      { day: 2, focus: l("Respiración y paseo consciente", "Breath and mindful walking"), availableMinutes: 20, sequenceIds: [], pranayamaIds: ["sama-vritti"], meditationIds: ["walking-meditation"] },
      { day: 3, focus: l("Descanso", "Rest"), rest: true, sequenceIds: [], pranayamaIds: [], meditationIds: ["guided-5-minutes"] },
      { day: 4, focus: l("Saludo al sol y pausa", "Sun salutation and a pause"), availableMinutes: 20, sequenceIds: ["surya-a"], pranayamaIds: ["sama-vritti"], meditationIds: ["guided-5-minutes"] },
      { day: 5, focus: l("Recuperación libre", "Open recovery"), rest: true, sequenceIds: [], pranayamaIds: [], meditationIds: [] },
      { day: 6, focus: l("Hatha con cierre tranquilo", "Hatha with a quiet close"), availableMinutes: 20, sequenceIds: ["hatha-foundations"], pranayamaIds: ["extended-exhale"], meditationIds: ["breath-awareness"] },
      { day: 7, focus: l("Quietud con apoyo", "Supported stillness"), availableMinutes: 45, sequenceIds: ["yin-stillness"], pranayamaIds: [], meditationIds: ["body-scan"] },
    ],
  },
  {
    id: "balanced-week",
    name: l("Equilibrio · alternar esfuerzos", "Balance · alternate effort and ease"),
    description: l(
      "Alterna Hatha, quietud, respiración y atención; conserva pausas para integrar la semana.",
      "Alternate Hatha, stillness, breathing, and attention, with pauses to integrate the week.",
    ),
    rhythm: l(
      "Cuatro sesiones variadas, una caminata opcional y dos días de descanso. Ajusta la intensidad antes de añadir duración.",
      "Four varied sessions, one optional walk, and two rest days. Adjust intensity before adding time.",
    ),
    days: [
      { day: 1, focus: l("Fuerza y estabilidad", "Strength and steadiness"), availableMinutes: 20, sequenceIds: ["hatha-steady-flow"], pranayamaIds: ["sama-vritti"], meditationIds: ["breath-awareness"] },
      { day: 2, focus: l("Descanso", "Rest"), rest: true, sequenceIds: [], pranayamaIds: [], meditationIds: ["body-scan"] },
      { day: 3, focus: l("Suelo y movilidad pausada", "Floor-based, measured mobility"), availableMinutes: 45, sequenceIds: ["yin-stillness"], pranayamaIds: ["extended-exhale"], meditationIds: ["body-scan"] },
      { day: 4, focus: l("Caminar con atención", "Walk with awareness"), availableMinutes: 20, sequenceIds: [], pranayamaIds: ["nadi-shodhana"], meditationIds: ["walking-meditation"] },
      { day: 5, focus: l("Día libre", "Open day"), rest: true, sequenceIds: [], pranayamaIds: [], meditationIds: [] },
      { day: 6, focus: l("Hatha y amabilidad", "Hatha and kindness"), availableMinutes: 45, sequenceIds: ["hatha-steady-flow"], pranayamaIds: ["dirga-pranayama"], meditationIds: ["loving-kindness"] },
      { day: 7, focus: l("Movimiento breve y descanso", "Brief movement and rest"), availableMinutes: 20, sequenceIds: ["surya-a"], pranayamaIds: ["sama-vritti"], meditationIds: ["body-scan"] },
    ],
  },
  {
    id: "energy-week",
    name: l("Energía · movimiento consciente", "Energy · mindful movement"),
    description: l(
      "Una semana más dinámica para quien ya conoce las posturas, con respiración natural y días de recuperación.",
      "A more dynamic week for people familiar with the poses, with natural breathing and recovery days.",
    ),
    rhythm: l(
      "Cuatro días de práctica y tres pausas. Elige la versión corta cuando tengas menos tiempo; no uses respiración forzada para aumentar la intensidad.",
      "Four practice days and three pauses. Choose the shorter version when time is limited; do not use forceful breathing to raise intensity.",
    ),
    days: [
      { day: 1, focus: l("Fluidez y atención", "Flow and attention"), availableMinutes: 20, sequenceIds: ["surya-b"], pranayamaIds: ["ujjayi"], meditationIds: ["breath-awareness"] },
      { day: 2, focus: l("Hatha dinámico y respiración", "Dynamic Hatha and breathing"), availableMinutes: 20, sequenceIds: ["hatha-steady-flow"], pranayamaIds: ["sama-vritti"], meditationIds: [] },
      { day: 3, focus: l("Recuperación", "Recovery"), rest: true, sequenceIds: [], pranayamaIds: [], meditationIds: ["walking-meditation"] },
      { day: 4, focus: l("Serie primaria · nivel intermedio", "Primary Series · intermediate"), availableMinutes: 45, sequenceIds: ["primary-series"], pranayamaIds: ["ujjayi"], meditationIds: ["guided-5-minutes"] },
      { day: 5, focus: l("Descanso", "Rest"), rest: true, sequenceIds: [], pranayamaIds: [], meditationIds: [] },
      { day: 6, focus: l("Saludo al sol y visualización", "Sun salutation and visualization"), availableMinutes: 20, sequenceIds: ["surya-a"], pranayamaIds: ["dirga-pranayama"], meditationIds: ["visualization"] },
      { day: 7, focus: l("Paseo opcional", "Optional walk"), rest: true, sequenceIds: [], pranayamaIds: [], meditationIds: ["walking-meditation"] },
    ],
  },
  {
    id: "relaxation-week",
    name: l("Relajación · bajar el ritmo", "Relaxation · slow the pace"),
    description: l(
      "Prioriza prácticas en el suelo, exhalaciones cómodas y meditación guiada; puedes omitir cualquier ejercicio que no te siente bien.",
      "Prioritize floor-based practice, comfortable exhalations, and guided meditation; skip any activity that does not feel right for you.",
    ),
    rhythm: l(
      "Tres o cuatro prácticas suaves y días sin secuencia. El descanso es parte del plan, no una tarea que haya que compensar.",
      "Three or four gentle practices and days without a sequence. Rest is part of the plan, not something to make up for.",
    ),
    days: [
      { day: 1, focus: l("Quietud y escaneo corporal", "Stillness and body scan"), availableMinutes: 45, sequenceIds: ["yin-stillness"], pranayamaIds: ["extended-exhale"], meditationIds: ["body-scan"] },
      { day: 2, focus: l("Descanso", "Rest"), rest: true, sequenceIds: [], pranayamaIds: [], meditationIds: [] },
      { day: 3, focus: l("Hatha suave", "Gentle Hatha"), availableMinutes: 20, sequenceIds: ["hatha-foundations"], pranayamaIds: ["extended-exhale"], meditationIds: ["guided-5-minutes"] },
      { day: 4, focus: l("Zumbido y atención", "Humming and awareness"), availableMinutes: 20, sequenceIds: [], pranayamaIds: ["bhramari"], meditationIds: ["body-scan"] },
      { day: 5, focus: l("Día libre", "Open day"), rest: true, sequenceIds: [], pranayamaIds: [], meditationIds: [] },
      { day: 6, focus: l("Permanencias con apoyo", "Supported holds"), availableMinutes: 45, sequenceIds: ["yin-grounding"], pranayamaIds: ["extended-exhale"], meditationIds: ["guided-10-minutes"] },
      { day: 7, focus: l("Yoga Nidra opcional", "Optional Yoga Nidra"), availableMinutes: 45, sequenceIds: [], pranayamaIds: ["extended-exhale"], meditationIds: ["yoga-nidra"] },
    ],
  },
  {
    id: "flexibility-week",
    name: l("Flexibilidad · movilidad y pausa", "Flexibility · mobility and pause"),
    description: l(
      "Combina Hatha y Yin con apoyos y rangos cómodos. Flexibilidad aquí significa explorar movilidad, no forzar una forma.",
      "Combine Hatha and Yin with support and comfortable ranges. Flexibility here means exploring mobility, not forcing a shape.",
    ),
    rhythm: l(
      "Cuatro sesiones con al menos dos días sin secuencia. En Yin, sigue los tiempos de entrada, salida y descanso descritos en cada ficha.",
      "Four sessions with at least two days without a sequence. In Yin, follow the entry, exit, and rest guidance in each pose entry.",
    ),
    days: [
      { day: 1, focus: l("Movilidad general", "Whole-body mobility"), availableMinutes: 20, sequenceIds: ["hatha-foundations"], pranayamaIds: ["dirga-pranayama"], meditationIds: ["breath-awareness"] },
      { day: 2, focus: l("Yin · explorar sin empujar", "Yin · explore without pushing"), availableMinutes: 45, sequenceIds: ["yin-stillness"], pranayamaIds: ["bhramari"], meditationIds: [] },
      { day: 3, focus: l("Descanso o paseo", "Rest or walk"), rest: true, sequenceIds: [], pranayamaIds: [], meditationIds: ["walking-meditation"] },
      { day: 4, focus: l("Hatha y control", "Hatha and control"), availableMinutes: 45, sequenceIds: ["hatha-steady-flow"], pranayamaIds: ["sama-vritti"], meditationIds: ["body-scan"] },
      { day: 5, focus: l("Día libre", "Open day"), rest: true, sequenceIds: [], pranayamaIds: [], meditationIds: [] },
      { day: 6, focus: l("Permanencias largas con apoyo", "Longer supported holds"), availableMinutes: 45, sequenceIds: ["yin-grounding"], pranayamaIds: ["extended-exhale"], meditationIds: ["body-scan"] },
      { day: 7, focus: l("Integración tranquila", "Quiet integration"), availableMinutes: 20, sequenceIds: ["hatha-foundations"], pranayamaIds: ["dirga-pranayama"], meditationIds: ["guided-5-minutes"] },
    ],
  },
];

export const routineSuggestions: RoutineSuggestion[] = [
  {
    id: "morning-10",
    timeOfDay: "morning",
    availableMinutes: 10,
    name: l("Despertar gradual", "A gradual start"),
    description: l("Un saludo breve y respiración cómoda; deja un minuto para organizar la esterilla.", "A short sun salutation and comfortable breathing; leave a minute to set up your mat."),
    sequenceIds: ["surya-a"],
    pranayamaIds: ["dirga-pranayama"],
    meditationIds: [],
  },
  {
    id: "midday-10",
    timeOfDay: "midday",
    availableMinutes: 10,
    name: l("Pausa caminando", "A walking break"),
    description: l("Camina con atención en un lugar seguro y a un ritmo natural.", "Walk mindfully in a safe place at a natural pace."),
    sequenceIds: [],
    pranayamaIds: [],
    meditationIds: ["walking-meditation"],
  },
  {
    id: "evening-10",
    timeOfDay: "evening",
    availableMinutes: 10,
    name: l("Cerrar el día", "Close the day"),
    description: l("Una exhalación sin esfuerzo y un guion corto; vuelve a respirar con naturalidad si el conteo incomoda.", "An unforced exhale and a short guided practice; return to natural breathing if counting feels uncomfortable."),
    sequenceIds: [],
    pranayamaIds: ["extended-exhale"],
    meditationIds: ["guided-5-minutes"],
  },
  {
    id: "morning-20",
    timeOfDay: "morning",
    availableMinutes: 20,
    name: l("Hatha y respiración completa", "Hatha and full breathing"),
    description: l("Una secuencia inicial con respiración y unos minutos de atención al cuerpo.", "A beginner sequence with breathing and a few minutes of body awareness."),
    sequenceIds: ["hatha-foundations"],
    pranayamaIds: ["dirga-pranayama"],
    meditationIds: ["breath-awareness"],
  },
  {
    id: "midday-20",
    timeOfDay: "midday",
    availableMinutes: 20,
    name: l("Movimiento breve y reinicio", "Brief movement and reset"),
    description: l("Un saludo al sol, respiración equilibrada y una pausa breve de atención.", "A sun salutation, even breathing, and a short attention practice."),
    sequenceIds: ["surya-a"],
    pranayamaIds: ["sama-vritti"],
    meditationIds: ["guided-5-minutes"],
  },
  {
    id: "evening-20",
    timeOfDay: "evening",
    availableMinutes: 20,
    name: l("Escaneo y exhalación cómoda", "Body scan and easy exhale"),
    description: l("Una práctica meditativa sentada o tumbada, sin necesidad de cambiar la respiración.", "A seated or lying meditation; there is no need to change your breathing."),
    sequenceIds: [],
    pranayamaIds: ["extended-exhale"],
    meditationIds: ["body-scan"],
  },
  {
    id: "morning-45",
    timeOfDay: "morning",
    availableMinutes: 45,
    name: l("Serie primaria a ritmo propio", "Primary Series at your own pace"),
    description: l("Para quien ya conoce la práctica; adapta el ritmo, omite pasos si hace falta y deja tiempo para transiciones.", "For practitioners familiar with the sequence; adjust the pace, skip steps if needed, and leave time for transitions."),
    sequenceIds: ["primary-series"],
    pranayamaIds: ["ujjayi"],
    meditationIds: ["breath-awareness"],
  },
  {
    id: "midday-45",
    timeOfDay: "midday",
    availableMinutes: 45,
    name: l("Hatha y descanso atento", "Hatha and mindful rest"),
    description: l("Una práctica de cuerpo completo de nivel avanzado seguida de una caminata o pausa consciente.", "An advanced whole-body practice followed by a walk or mindful pause."),
    sequenceIds: ["hatha-whole-body"],
    pranayamaIds: ["nadi-shodhana"],
    meditationIds: ["body-scan"],
  },
  {
    id: "evening-45",
    timeOfDay: "evening",
    availableMinutes: 45,
    name: l("Yin con cierre suave", "Yin with a gentle close"),
    description: l("Usa apoyos y sal de cada forma con calma; reserva tiempo para una pausa neutra.", "Use props and leave each shape slowly; reserve time for a neutral pause."),
    sequenceIds: ["yin-stillness"],
    pranayamaIds: ["extended-exhale"],
    meditationIds: ["body-scan"],
  },
  {
    id: "morning-60",
    timeOfDay: "morning",
    availableMinutes: 60,
    name: l("Práctica completa y meditación", "Full practice and meditation"),
    description: l("Una práctica intermedia con margen para transiciones, respiración y descanso; no es necesario ocupar toda la hora.", "An intermediate practice with room for transitions, breathing, and rest; you do not need to fill the whole hour."),
    sequenceIds: ["primary-series"],
    pranayamaIds: ["dirga-pranayama"],
    meditationIds: ["guided-20-minutes"],
  },
  {
    id: "midday-60",
    timeOfDay: "midday",
    availableMinutes: 60,
    name: l("Hatha, paseo y pausa", "Hatha, a walk, and a pause"),
    description: l("Para un día con más margen; deja espacios entre prácticas y reduce la secuencia si estás cansado.", "For a day with more room; leave gaps between practices and shorten the sequence if you feel tired."),
    sequenceIds: ["hatha-whole-body"],
    pranayamaIds: ["nadi-shodhana"],
    meditationIds: ["walking-meditation", "body-scan"],
  },
  {
    id: "evening-60",
    timeOfDay: "evening",
    availableMinutes: 60,
    name: l("Yin y descanso prolongado", "Yin and extended rest"),
    description: l("Una permanencia avanzada con pausas amplias; reduce el tiempo o elige Yin · Un espacio de quietud si prefieres una opción más breve.", "An advanced long-hold practice with generous pauses; shorten it or choose Yin · A space for stillness for a briefer option."),
    sequenceIds: ["yin-long-rest"],
    pranayamaIds: ["extended-exhale"],
    meditationIds: ["body-scan"],
  },
];

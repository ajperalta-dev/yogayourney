import type { Localized } from "@/lib/models";
import { l } from "@/lib/utils";

export interface MeditationPlanDay {
  day: number;
  minutes: number;
  practiceId: string;
  focus: Localized;
  reflection: Localized;
}

export interface MeditationPlan {
  id: string;
  name: Localized;
  description: Localized;
  days: MeditationPlanDay[];
}

export const meditationPlans: MeditationPlan[] = [
  {
    id: "seven-day-foundation",
    name: l("Plan inicial de 7 días", "7-day beginner plan"),
    description: l(
      "Una semana para probar distintas anclas y crear una rutina flexible. Repite o descansa un día cuando lo necesites.",
      "A week to try different anchors and build a flexible routine. Repeat a day or rest whenever you need.",
    ),
    days: [
      { day: 1, minutes: 5, practiceId: "breath-awareness", focus: l("Encontrar una postura cómoda", "Find a comfortable posture"), reflection: l("¿Qué apoyo hizo más fácil estar aquí?", "What support made it easier to be here?") },
      { day: 2, minutes: 5, practiceId: "breath-awareness", focus: l("Volver a una sensación de la respiración", "Return to one breathing sensation"), reflection: l("¿Qué ancla elegiste?", "Which anchor did you choose?") },
      { day: 3, minutes: 10, practiceId: "body-scan", focus: l("Notar sensaciones neutrales del cuerpo", "Notice neutral body sensations"), reflection: l("¿Qué zona fue cómoda de observar?", "Which area felt comfortable to notice?") },
      { day: 4, minutes: 10, practiceId: "walking-meditation", focus: l("Atender a los pasos en un trayecto seguro", "Attend to steps on a safe route"), reflection: l("¿Qué sonidos notaste al caminar?", "What sounds did you notice while walking?") },
      { day: 5, minutes: 5, practiceId: "mantra-meditation", focus: l("Explorar una palabra o sonido como ancla", "Explore a word or sound as an anchor"), reflection: l("¿Preferiste repetir en voz baja o mentalmente?", "Did you prefer repeating softly or silently?") },
      { day: 6, minutes: 10, practiceId: "loving-kindness", focus: l("Ofrecer una frase amable sin forzar emociones", "Offer a kind phrase without forcing emotion"), reflection: l("¿Qué frase te resultó más natural?", "Which phrase felt most natural?") },
      { day: 7, minutes: 5, practiceId: "guided-5-minutes", focus: l("Cerrar la semana con una práctica guiada breve", "Close the week with a short guided practice"), reflection: l("¿Qué práctica te gustaría repetir?", "Which practice would you like to repeat?") },
    ],
  },
  {
    id: "thirty-day-foundation",
    name: l("Plan progresivo de 30 días para principiantes", "Progressive 30-day beginner plan"),
    description: l(
      "Un mes flexible para principiantes que avanza desde sesiones breves hacia más variedad y una práctica más larga. Si un día no encaja, retómalo sin compensar ni duplicar sesiones.",
      "A flexible month for beginners that moves from brief sessions toward more variety and a longer practice. If a day does not fit, resume without catching up or doubling sessions.",
    ),
    days: [
      { day: 1, minutes: 5, practiceId: "breath-awareness", focus: l("Aprender la postura y el ancla", "Learn the posture and anchor"), reflection: l("¿Qué postura te sostuvo?", "Which posture supported you?") },
      { day: 2, minutes: 5, practiceId: "breath-awareness", focus: l("Volver una vez, sin exigirte", "Return once, without pressure"), reflection: l("¿Qué te ayudó a regresar?", "What helped you return?") },
      { day: 3, minutes: 5, practiceId: "guided-5-minutes", focus: l("Seguir una guía corta", "Follow a short guide"), reflection: l("¿Qué parte te resultó sencilla?", "Which part felt simple?") },
      { day: 4, minutes: 10, practiceId: "body-scan", focus: l("Recorrer el cuerpo con neutralidad", "Scan the body neutrally"), reflection: l("¿Qué sensación notaste sin cambiarla?", "What sensation did you notice without changing it?") },
      { day: 5, minutes: 5, practiceId: "breath-awareness", focus: l("Elegir un punto cómodo de la respiración", "Choose a comfortable breath point"), reflection: l("¿Qué ancla usarías otro día?", "Which anchor might you use another day?") },
      { day: 6, minutes: 10, practiceId: "walking-meditation", focus: l("Caminar con atención y seguridad", "Walk with attention and safety"), reflection: l("¿Qué cambió al caminar con más atención?", "What changed when you walked with more attention?") },
      { day: 7, minutes: 5, practiceId: "guided-5-minutes", focus: l("Revisar la primera semana", "Review the first week"), reflection: l("Elige repetir, descansar o continuar; todas son opciones válidas.", "Choose to repeat, rest, or continue; all are valid options.") },
      { day: 8, minutes: 10, practiceId: "body-scan", focus: l("Volver a los apoyos del cuerpo", "Return to the body's points of support"), reflection: l("¿Qué zona prefieres omitir o incluir?", "Which area would you skip or include?") },
      { day: 9, minutes: 5, practiceId: "mantra-meditation", focus: l("Usar una palabra breve como ancla", "Use a short word as an anchor"), reflection: l("¿Qué ritmo te resultó cómodo?", "What rhythm felt comfortable?") },
      { day: 10, minutes: 5, practiceId: "breath-awareness", focus: l("Practicar el regreso amable", "Practice a gentle return"), reflection: l("¿Cómo reconociste una distracción?", "How did you notice a distraction?") },
      { day: 11, minutes: 8, practiceId: "visualization", focus: l("Explorar una escena neutral o agradable", "Explore a neutral or pleasant scene"), reflection: l("¿Qué sentido, además de la vista, pudiste notar?", "Which sense besides sight could you notice?") },
      { day: 12, minutes: 10, practiceId: "walking-meditation", focus: l("Sentir los pasos y escuchar el entorno", "Feel the steps and listen to the surroundings"), reflection: l("¿Qué te ayudó a mantenerte presente y seguro?", "What helped you stay present and safe?") },
      { day: 13, minutes: 10, practiceId: "loving-kindness", focus: l("Elegir frases de buena voluntad", "Choose phrases of goodwill"), reflection: l("¿Qué frase pudiste ofrecer sin forzarla?", "Which phrase could you offer without forcing it?") },
      { day: 14, minutes: 10, practiceId: "guided-10-minutes", focus: l("Pausa de integración", "Integration pause"), reflection: l("Repite tu práctica preferida o toma un día de descanso.", "Repeat your preferred practice or take a rest day.") },
      { day: 15, minutes: 10, practiceId: "thought-observation", focus: l("Nombrar pensamientos brevemente", "Briefly label thoughts"), reflection: l("¿Qué etiqueta te ayudó a soltar una historia?", "Which label helped you release a story?") },
      { day: 16, minutes: 10, practiceId: "body-scan", focus: l("Observar sensaciones sin perseguirlas", "Notice sensations without chasing them"), reflection: l("¿Qué apoyo puedes ajustar para sentirte mejor?", "What support could you adjust to feel more comfortable?") },
      { day: 17, minutes: 5, practiceId: "mantra-meditation", focus: l("Escuchar una repetición cada vez", "Listen to one repetition at a time"), reflection: l("¿Qué cambió al bajar el ritmo?", "What changed when you slowed down?") },
      { day: 18, minutes: 10, practiceId: "walking-meditation", focus: l("Incluir sonidos y espacio", "Include sounds and space"), reflection: l("¿Cómo mantuviste conciencia del entorno?", "How did you stay aware of your surroundings?") },
      { day: 19, minutes: 10, practiceId: "loving-kindness", focus: l("Practicar buena voluntad con límites", "Practice goodwill with boundaries"), reflection: l("¿Qué límite hizo esta práctica más segura?", "What boundary made this practice safer?") },
      { day: 20, minutes: 20, practiceId: "yoga-nidra", focus: l("Explorar descanso guiado", "Explore guided rest"), reflection: l("¿Qué apoyo o temperatura necesitaste?", "What support or temperature did you need?") },
      { day: 21, minutes: 10, practiceId: "guided-10-minutes", focus: l("Descansar o repetir una práctica familiar", "Rest or repeat a familiar practice"), reflection: l("¿Qué forma de práctica te gustaría conservar?", "Which form of practice would you like to keep?") },
      { day: 22, minutes: 8, practiceId: "visualization", focus: l("Usar una imagen, palabra o sonido", "Use an image, word, or sound"), reflection: l("¿Qué alternativa usaste si no aparecieron imágenes?", "What alternative did you use if images did not arise?") },
      { day: 23, minutes: 10, practiceId: "thought-observation", focus: l("Regresar a un ancla externa cuando convenga", "Return to an external anchor when helpful"), reflection: l("¿Qué ancla te resultó más neutral?", "Which anchor felt most neutral?") },
      { day: 24, minutes: 5, practiceId: "breath-awareness", focus: l("Practicar sin cambiar la respiración", "Practice without changing the breath"), reflection: l("¿Qué notaste al dejarla en su propio ritmo?", "What did you notice when you let it keep its own pace?") },
      { day: 25, minutes: 10, practiceId: "walking-meditation", focus: l("Llevar la atención a una actividad diaria", "Bring attention to an everyday activity"), reflection: l("¿Qué actividad cotidiana podría ser una pausa consciente?", "What everyday activity could become a mindful pause?") },
      { day: 26, minutes: 10, practiceId: "loving-kindness", focus: l("Elegir frases propias y realistas", "Choose personal, realistic phrases"), reflection: l("¿Qué palabras se sintieron auténticas?", "Which words felt authentic?") },
      { day: 27, minutes: 10, practiceId: "body-scan", focus: l("Elegir una zona neutral y cómoda", "Choose a neutral, comfortable area"), reflection: l("¿Cómo adaptaste la práctica a tus necesidades?", "How did you adapt the practice to your needs?") },
      { day: 28, minutes: 10, practiceId: "guided-10-minutes", focus: l("Integrar el mes sin evaluarte", "Integrate the month without judging yourself"), reflection: l("No hay una racha que proteger; observa qué te sirve.", "There is no streak to protect; notice what serves you.") },
      { day: 29, minutes: 5, practiceId: "mantra-meditation", focus: l("Volver al ancla que prefieras", "Return to the anchor you prefer"), reflection: l("¿Qué práctica repetirías durante otra semana?", "Which practice would you repeat for another week?") },
      { day: 30, minutes: 20, practiceId: "guided-20-minutes", focus: l("Cerrar el ciclo con una práctica larga opcional", "Close the cycle with an optional longer practice"), reflection: l("Elige un ritmo sostenible para el siguiente mes, incluyendo días de descanso.", "Choose a sustainable rhythm for next month, including rest days.") },
    ],
  },
];

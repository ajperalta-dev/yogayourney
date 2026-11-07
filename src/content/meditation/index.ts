import type { MeditationPractice } from "@/lib/models";
import { l } from "@/lib/utils";
import { base } from "../shared";
export const meditation: MeditationPractice[] = [
  {
    ...base(
      "breath-awareness",
      "Atención a la respiración",
      "Breath awareness",
      "Mindfulness",
      l(
        "No hay nada que conseguir. Solo volver a observar.",
        "Nothing to achieve. Simply return to observing.",
      ),
    ),
    kind: "meditation",
    duration: 300,
    objective: l(
      "Practicar el regreso amable al presente.",
      "Practice returning gently to the present.",
    ),
    preparation: l(
      "Busca un lugar tranquilo. Puedes mantener los ojos abiertos.",
      "Find a quiet place. You may keep your eyes open.",
    ),
    instructions: l(
      "Observa la respiración sin cambiarla. Cuando notes distracción, vuelve suavemente. Puedes atender a los sonidos si la respiración resulta incómoda.",
      "Observe the breath without changing it. When you notice distraction, return gently. You may attend to sounds if the breath feels uncomfortable.",
    ),
    posture: l(
      "Sentado con apoyo, en silla o tumbado.",
      "Seated with support, in a chair or lying down.",
    ),
    benefits: l(
      "Explorar atención y conciencia del momento.",
      "Explore attention and present-moment awareness.",
    ),
    difficulties: l(
      "La distracción es normal. Si aparece malestar, abre los ojos y detente.",
      "Distraction is normal. If distress arises, open your eyes and stop.",
    ),
    tips: l(
      "Empieza con un tiempo corto y cómodo.",
      "Start with a short, comfortable duration.",
    ),
    relatedIds: ["sama-vritti", "sukhasana"],
  },
];

import type { AnatomyTopic } from "@/lib/models";
import { l } from "@/lib/utils";
import { base } from "../shared";
export const anatomy: AnatomyTopic[] = [
  {
    ...base(
      "hip-joint",
      "Articulación de la cadera",
      "Hip joint",
      "Joints",
      l(
        "La relación entre pelvis, fémur y movimiento.",
        "The relationship between pelvis, femur and movement.",
      ),
    ),
    kind: "anatomy",
    movements: l(
      "Flexión, extensión, abducción, aducción y rotaciones interna y externa.",
      "Flexion, extension, abduction, adduction, internal and external rotation.",
    ),
    muscles: l(
      "Glúteos, iliopsoas, aductores e isquiotibiales participan en diferentes movimientos.",
      "Gluteals, iliopsoas, adductors and hamstrings participate in different movements.",
    ),
    asanaIds: ["utthita-trikonasana", "baddha-konasana"],
    relatedIds: ["utthita-trikonasana", "baddha-konasana", "butterfly"],
    tags: [
      "hip",
      "cadera",
      "pelvis",
      "gluteals",
      "glúteos",
      "adductors",
      "flexion",
      "rotation",
      "anatomy",
    ],
  },
];

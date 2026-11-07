import type { AerialPose } from "@/lib/models";
import { l } from "@/lib/utils";
import { base, splitInstructionSteps } from "../shared";
const caution = l(
  "Solo con instructor de yoga aéreo y equipo instalado y revisado por profesionales. La app no verifica anclajes, carga ni montaje. Inversiones, wraps, transiciones, drops y movimientos avanzados requieren supervisión; no se guían aquí para práctica autónoma.",
  "Only with an aerial yoga instructor and professionally installed and inspected equipment. This app cannot verify anchors, load or rigging. Inversions, wraps, transitions, drops and advanced movements require supervision; they are not guided here for independent practice.",
);
const supportedSeatEntry = l(
  "Para repasar el apoyo en el suelo, sentate en una silla firme con ambos pies apoyados. Repartí el peso entre ambos lados de la pelvis y aflojá los hombros. Practicá la entrada a la hamaca únicamente con tu instructor.",
  "To review support on the ground, sit on a sturdy chair with both feet down. Share the weight between both sides of the pelvis and relax the shoulders. Practice entering the hammock only with your instructor.",
);
export const aerial: AerialPose[] = [
  {
    ...base(
      "supported-seat",
      "Asiento con apoyo",
      "Supported seat",
      "Foundations",
      l(
        "Estudia el apoyo de la tela antes de practicar con tu instructor.",
        "Study fabric support before practicing with your instructor.",
      ),
    ),
    kind: "aerial",
    sanskrit: null,
    duration: 60,
    instructionSteps: splitInstructionSteps(supportedSeatEntry),
    breathing: l(
      "Durante el minuto de repaso en el suelo, mantené una respiración cómoda y continua.",
      "During the one-minute ground-based review, keep breathing comfortably and continuously.",
    ),
    image: "/images/poses/supported-seat.webp",
    thumbnail: "/images/poses/supported-seat-thumb.webp",
    studyOnly: true,
    safety: caution,
    hammockSetup: l(
      "Hamaca de estudio; montaje definido por el profesional responsable.",
      "Study hammock; setup determined by the supervising professional.",
    ),
    height: l(
      "La determina el instructor según persona, equipo y espacio.",
      "Determined by the instructor for the person, equipment and space.",
    ),
    fabricContacts: l(
      "Apoyo amplio bajo la pelvis; no sobre el cuello.",
      "Broad support beneath the pelvis; not on the neck.",
    ),
    startingPosition: l(
      "En el suelo, junto a la hamaca, con el instructor.",
      "On the ground beside the hammock with the instructor.",
    ),
    entry: supportedSeatEntry,
    finalPosition: l(
      "Asiento apoyado y estable, supervisado.",
      "A stable supported seat under supervision.",
    ),
    exit: l(
      "Regresa al suelo siguiendo las indicaciones del instructor.",
      "Return to the floor following the instructor’s directions.",
    ),
    benefits: l(
      "Exploración de apoyos y percepción corporal.",
      "Exploration of support and body awareness.",
    ),
    muscles: l(
      "Estabilizadores del tronco; depende del apoyo.",
      "Trunk stabilizers; depends on the support.",
    ),
    contraindications: caution,
    precautions: caution,
    commonMistakes: l(
      "Confundir el repaso en el suelo con una autorización para cargar peso en una hamaca sin supervisión.",
      "Mistaking the ground-based review for permission to put weight in a hammock without supervision.",
    ),
    spotterRequired: true,
    modifications: l(
      "Elegí una silla con respaldo y apoyá las manos en los muslos. Acortá el repaso si perdés comodidad.",
      "Choose a chair with a backrest and rest your hands on your thighs. Shorten the review if you become uncomfortable.",
    ),
    progressions: l(
      "Solo por indicación del instructor.",
      "Only as directed by the instructor.",
    ),
    regressions: l("Asiento en una silla.", "Sit in a chair."),
    teachingCues: l(
      "Verifica consentimiento, equipo y supervisión.",
      "Check consent, equipment and supervision.",
    ),
    relatedIds: ["sukhasana"],
    tags: ["aerial", "support", "tela", "seguridad"],
  },
];

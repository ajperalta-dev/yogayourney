import type { AerialPose } from "@/lib/models";
import { l } from "@/lib/utils";
import { base, field, splitInstructionSteps } from "../shared";
const caution = l(
  "Solo con instructor de yoga aéreo y equipo instalado y revisado por profesionales; la app no verifica anclajes, carga ni montaje. Consulta con tu profesional sanitario antes de practicar con embarazo, presión alta, glaucoma, problemas cardíacos o vertebrales, vértigo o cirugía reciente; no practiques tras comer recientemente. Inversiones, wraps, transiciones, drops y movimientos avanzados requieren supervisión y spotter; no se guían aquí para práctica autónoma.",
  "Only with an aerial yoga instructor and professionally installed and inspected equipment; this app cannot verify anchors, load, or rigging. Seek healthcare guidance before practice with pregnancy, high blood pressure, glaucoma, heart or spinal conditions, vertigo, or recent surgery; do not practice soon after eating. Inversions, wraps, transitions, drops, and advanced movements require instructor and spotter; they are not guided here for independent practice.",
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
    image: "/images/poses/supported-seat.svg",
    thumbnail: "/images/poses/supported-seat.svg",
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
    fields: [field("Nivel de riesgo", "Risk level", l("Bajo · repaso sentado; práctica con instructor.", "Low · seated review; practice with an instructor."), "safety")],
    tags: ["aerial", "support", "tela", "seguridad"],
  },
];

function supervisedPose(input: {
  id: string; nameEs: string; nameEn: string; summaryEs: string; summaryEn: string; sanskrit?: string | null;
  risk: "Bajo" | "Medio" | "Alto · solo con instructor";
  riskEn: "Low" | "Medium" | "High · instructor only";
  startingEs: string; startingEn: string; contactEs: string; contactEn: string;
  entryEs: string; entryEn: string; exitEs: string; exitEn: string;
}) {
  const entry = l(input.entryEs, input.entryEn);
  const exit = l(input.exitEs, input.exitEn);
  const safety = l(
    `${caution.es} Riesgo: ${input.risk}. ${input.startingEs}`,
    `${caution.en} Risk: ${input.riskEn}. ${input.startingEn}`,
  );
  return {
    ...base(input.id, input.nameEs, input.nameEn, "Foundations", l(input.summaryEs, input.summaryEn)),
    kind: "aerial" as const,
    sanskrit: input.sanskrit ?? null,
    duration: 180,
    image: `/images/poses/${input.id}.svg`,
    thumbnail: `/images/poses/${input.id}.svg`,
    studyOnly: true,
    safety,
    instructionSteps: splitInstructionSteps(entry),
    contraindications: safety,
    breathing: l("Respira con naturalidad; detente si la tela comprime el pecho o limita el aire.", "Breathe naturally; stop if the fabric compresses the chest or limits airflow."),
    hammockSetup: l("Hamaca certificada, montada e inspeccionada por un profesional cualificado; nunca improvises anclajes.", "Rated hammock installed and inspected by a qualified professional; never improvise anchors."),
    height: l("Altura decidida por el instructor; la pelvis a la altura de la cadera es solo referencia inicial.", "Height set by the instructor; pelvis at hip height is only a starting reference."),
    fabricContacts: l(input.contactEs, input.contactEn),
    startingPosition: l(input.startingEs, input.startingEn),
    entry,
    finalPosition: l("Posición estable con asistencia cercana, sin inversión autónoma.", "Stable position with close assistance and no self-directed inversion."),
    exit,
    benefits: l("Explorar apoyo, orientación y movilidad de forma asistida; no promete descompresión ni resultados terapéuticos.", "Explore supported movement, orientation, and mobility; no decompression or therapeutic outcome is promised."),
    muscles: l("La demanda depende del apoyo y de la variación elegida.", "Demand depends on support and the chosen variation."),
    precautions: safety,
    spotterRequired: true,
    progressions: l("Solo el instructor decide una progresión tras revisar equipo, espacio y respuesta individual.", "Only the instructor may choose a progression after checking equipment, space, and individual response."),
    regressions: l("Reducir tensión de tela, mantener pies en el suelo o cambiar a una silla.", "Reduce fabric tension, keep feet grounded, or switch to a chair."),
    teachingCues: l("Pide permiso antes de asistir; confirma carga nominal, anclajes, espacio libre y señal para detenerse.", "Ask before assisting; confirm rated load, anchors, clear space, and a stop signal."),
    commonMistakes: l("Entrar sin señal del instructor, confiar en equipo sin revisar o contener la respiración.", "Entering without the instructor’s cue, trusting unchecked equipment, or holding the breath."),
    modifications: l("Haz el ensayo en silla sin cargar peso en la hamaca.", "Rehearse in a chair without loading the hammock."),
    fields: [field("Nivel de riesgo", "Risk level", l(input.risk, input.riskEn), "safety")],
    relatedIds: ["supported-seat"],
    tags: ["aerial", "supervised", "safety"],
  } satisfies AerialPose;
}

aerial.push(
  supervisedPose({
    id: "aerial-standing-support", nameEs: "De pie con apoyo", nameEn: "Supported standing", sanskrit: "Tāḍāsana · referencia en tierra",
    summaryEs: "Orientación inicial de pie junto a la tela, con el instructor.", summaryEn: "Initial standing orientation beside the fabric with an instructor.", risk: "Bajo", riskEn: "Low",
    startingEs: "De pie sobre colchoneta; tela baja y sin tensión hasta recibir indicación.", startingEn: "Stand on a mat; fabric stays low and unloaded until cued.", contactEs: "Manos en asas; pies permanecen en el suelo.", contactEn: "Hands on loops; feet stay on the floor.",
    entryEs: "Confirma el equipo y toma las asas solo cuando el instructor lo indique. Flexiona apenas las rodillas.", entryEn: "Confirm the equipment and take the loops only when cued. Soften the knees.", exitEs: "Suelta una mano a la vez y aléjate cuando el instructor confirme estabilidad.", exitEn: "Release one hand at a time and step away when the instructor confirms stability.",
  }),
  supervisedPose({
    id: "aerial-supported-lunge", nameEs: "Zancada asistida", nameEn: "Supported lunge", sanskrit: "Añjaneyāsana · variación en tierra",
    summaryEs: "Ensayo de movilidad con ambos pies en el suelo.", summaryEn: "A mobility rehearsal with both feet on the ground.", risk: "Medio", riskEn: "Medium",
    startingEs: "De pie bajo asas bajas, con colchoneta despejada.", startingEn: "Stand beneath low loops over a clear mat.", contactEs: "Manos sujetan asas; pies y rodilla trasera quedan en el suelo.", contactEn: "Hands hold loops; feet and back knee remain grounded.",
    entryEs: "Con asistencia, toma las asas y lleva un pie atrás en zancada corta; no cuelgues el peso.", entryEn: "With assistance, hold the loops and step one foot back into a short lunge; do not hang body weight.", exitEs: "Acorta la zancada, vuelve al centro y suelta las asas bajo indicación.", exitEn: "Shorten the stance, return to center, and release the loops when cued.",
  }),
  supervisedPose({
    id: "aerial-supported-recline", nameEs: "Reclinación con hamaca", nameEn: "Hammock-supported recline", sanskrit: "Supta Baddha Koṇāsana · referencia en tierra",
    summaryEs: "Apoyo amplio detrás del torso a poca altura, supervisado.", summaryEn: "Broad low support behind the torso under supervision.", risk: "Medio", riskEn: "Medium",
    startingEs: "Sentada en colchoneta, hamaca baja detrás de la pelvis y torso.", startingEn: "Sit on a mat with the hammock low behind the pelvis and torso.", contactEs: "Tela amplia bajo pelvis y espalda torácica; nunca sobre cuello.", contactEn: "Broad fabric under pelvis and thoracic back, never the neck.",
    entryEs: "El instructor coloca la tela; reclínate solo hasta donde puedas mantener pies apoyados y respiración libre.", entryEn: "The instructor positions the fabric; recline only while feet stay grounded and breathing remains easy.", exitEs: "Incorpora el torso con ayuda, descarga la tela y espera sentado antes de levantarte.", exitEn: "Rise with assistance, unload the fabric, and pause seated before standing.",
  }),
  supervisedPose({
    id: "aerial-core-study", nameEs: "Estabilidad del tronco · estudio", nameEn: "Trunk stability · study", sanskrit: "Tāḍāsana · ensayo en tierra",
    summaryEs: "Exploración breve de estabilidad sin suspensión ni inversión.", summaryEn: "Brief stability exploration without suspension or inversion.", risk: "Medio", riskEn: "Medium",
    startingEs: "De pie con ambas manos en asas bajas y pies firmes.", startingEn: "Stand with both hands on low loops and feet grounded.", contactEs: "Manos en asas; no se transfiere el peso corporal a la tela.", contactEn: "Hands on loops; body weight is not transferred to the fabric.",
    entryEs: "Alarga la columna y practica una ligera bisagra de cadera solo con el instructor a tu lado.", entryEn: "Lengthen the spine and rehearse a small hip hinge only with the instructor beside you.", exitEs: "Vuelve a estar de pie, apoya ambas manos y suelta las asas con calma.", exitEn: "Return upright, steady both feet, and release the loops calmly.",
  }),
  supervisedPose({
    id: "aerial-inversion-briefing", nameEs: "Inversiones · preparación teórica", nameEn: "Inversions · theory briefing",
    summaryEs: "Ficha educativa; no contiene instrucciones para invertir el cuerpo.", summaryEn: "Study entry; it contains no instructions for inverting the body.", risk: "Alto · solo con instructor", riskEn: "High · instructor only",
    startingEs: "En el suelo, junto al equipo sin cargarlo.", startingEn: "On the floor beside unloaded equipment.", contactEs: "Sin contacto de suspensión en esta ficha teórica.", contactEn: "No suspension contact in this theory-only entry.",
    entryEs: "Revisa riesgos, contraindicaciones, spotter y señales de salida con el instructor; no intentes una inversión desde esta ficha.", entryEn: "Review risks, contraindications, spotter, and exit cues with the instructor; do not attempt an inversion from this entry.", exitEs: "Permanece en el suelo y termina la revisión sentado; cualquier práctica posterior requiere evaluación presencial.", exitEn: "Stay grounded and finish seated; any later practice requires in-person assessment.",
  }),
  supervisedPose({
    id: "aerial-cocoon", nameEs: "Capullo · relajación asistida", nameEn: "Cocoon · supported rest", sanskrit: "Śavāsana · equivalente en tierra",
    summaryEs: "Descanso con la hamaca envolviendo el cuerpo a baja altura.", summaryEn: "Rest with the hammock loosely surrounding the body at low height.", risk: "Medio", riskEn: "Medium",
    startingEs: "Tumbada en colchoneta, hamaca suelta y baja; acceso libre para el instructor.", startingEn: "Lie on a mat with loose, low fabric and clear instructor access.", contactEs: "Tela alrededor del torso y piernas, nunca apretada en cuello o cara.", contactEn: "Fabric around torso and legs, never tight around the neck or face.",
    entryEs: "Con ayuda, deja que la tela cubra suavemente el cuerpo; mantén cara, cuello y vía respiratoria despejados.", entryEn: "With assistance, let the fabric rest loosely around the body; keep face, neck, and airway clear.", exitEs: "Abre la tela con ayuda, rueda de lado, siéntate despacio y espera a que pase cualquier mareo.", exitEn: "Open the fabric with assistance, roll to one side, sit up slowly, and wait for any dizziness to pass.",
  }),
  supervisedPose({
    id: "aerial-safe-exit", nameEs: "Salida gradual al suelo", nameEn: "Gradual return to the floor", sanskrit: "Sukhāsana · pausa sentada en tierra",
    summaryEs: "Cierre seguro después del descanso en capullo.", summaryEn: "Safe close after cocoon rest.", risk: "Bajo", riskEn: "Low",
    startingEs: "Capullo bajo y con el instructor al alcance.", startingEn: "Low cocoon with the instructor within reach.", contactEs: "Tela se abre sin tirones; pies llegan a la colchoneta antes de ponerse de pie.", contactEn: "Fabric opens without tugging; feet reach the mat before standing.",
    entryEs: "Abre la hamaca con el instructor, rueda de lado y apoya ambos pies en el suelo.", entryEn: "Open the hammock with the instructor, roll to one side, and place both feet on the floor.", exitEs: "Quédate sentada respirando con naturalidad; levántate solo cuando estés estable y sin mareo.", exitEn: "Remain seated and breathe naturally; stand only when steady and free of dizziness.",
  }),
);

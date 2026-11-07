import type { Kriya, Localized, LocalizedInstructionSteps } from "@/lib/models";
import { l } from "@/lib/utils";
import { base } from "../shared";

type KriyaGuideInput = {
  id: string;
  name: Localized;
  summary: Localized;
  category: string;
  level: Kriya["level"];
  description: Localized;
  objective: Localized;
  materials: Localized;
  preparation: Localized;
  instructionSteps: LocalizedInstructionSteps;
  frequency: Localized;
  benefits: Localized;
  risks: Localized;
  contraindications: Localized;
  precautions: Localized;
  safety: Localized;
  relatedIds?: string[];
};

function guidedKriya(input: KriyaGuideInput): Kriya {
  return {
    ...base(
      input.id,
      input.name.es,
      input.name.en,
      input.category,
      input.summary,
    ),
    kind: "kriya",
    level: input.level,
    studyOnly: true,
    description: input.description,
    objective: input.objective,
    materials: input.materials,
    preparation: input.preparation,
    instructionSteps: input.instructionSteps,
    frequency: input.frequency,
    benefits: input.benefits,
    risks: input.risks,
    contraindications: input.contraindications,
    precautions: input.precautions,
    safety: input.safety,
    relatedIds: input.relatedIds ?? [],
  };
}

export const kriyas: Kriya[] = [
  {
    ...base(
      "kriya-foundations",
      "Introducción a los kriyas",
      "Kriya foundations",
      "Foundations",
      l(
        "Contexto tradicional, filosofía de la limpieza y conciencia de riesgos.",
        "Traditional context, cleansing philosophy, and risk awareness.",
      ),
    ),
    kind: "kriya",
    studyOnly: true,
    description: l(
      "Los ṣaṭkarmas aparecen en textos de Haṭha Yoga como un grupo de seis acciones de purificación corporal, enseñadas de manera distinta según la escuela y la persona.",
      "The ṣaṭkarmas appear in Haṭha Yoga texts as a group of six bodily cleansing actions, taught differently across schools and according to the individual.",
    ),
    objective: l(
      "Distinguir el sentido histórico de la limpieza y las afirmaciones médicas actuales.",
      "Distinguish the historical meaning of cleansing from modern medical claims.",
    ),
    materials: l("Ninguno para esta lectura.", "None for this reading."),
    preparation: l(
      "Estudio teórico con una persona docente. No uses una ficha digital para iniciar una práctica física.",
      "Study the theory with a teacher. Do not use a digital entry to begin a physical practice.",
    ),
    steps: l(
      "1. Lee el contexto tradicional. 2. Identifica la variante que se describe. 3. Revisa riesgos y contraindicaciones. 4. Consulta a un profesional sanitario y a una persona instructora antes de considerar una práctica.",
      "1. Read the traditional context. 2. Identify the variation being described. 3. Review risks and contraindications. 4. Consult a healthcare professional and a qualified instructor before considering a practice.",
    ),
    frequency: l(
      "Lectura a tu ritmo; no se propone una pauta de práctica física.",
      "Read at your own pace; no physical-practice schedule is suggested.",
    ),
    benefits: l(
      "El estudio puede aportar contexto cultural. Las tradiciones atribuyen propósitos de purificación o preparación; no se afirman curas ni eliminación médica de toxinas.",
      "Study can offer cultural context. Traditions attribute purposes of purification or preparation; no cures or medical toxin removal are claimed.",
    ),
    risks: l(
      "Algunas técnicas implican agua en las fosas nasales, esfuerzo abdominal, manipulación de tejidos, vómito inducido o irrigación intestinal, con riesgos que varían según la persona y el método.",
      "Some techniques involve water in the nasal passages, abdominal exertion, tissue manipulation, induced vomiting, or intestinal irrigation, with risks that vary by person and method.",
    ),
    contraindications: l(
      "La idoneidad depende de la técnica. Embarazo, menstruación para ciertas prácticas abdominales, hipertensión, afecciones cardíacas o respiratorias, hernias, úlceras, enfermedad digestiva y cirugías recientes requieren evitar o consultar antes, según la práctica.",
      "Suitability depends on the technique. Pregnancy, menstruation for some abdominal practices, hypertension, heart or respiratory conditions, hernias, ulcers, digestive disease, and recent surgery require avoiding or seeking advice first, depending on the practice.",
    ),
    precautions: l(
      "Señales para detenerse: dolor, mareo, falta de aire, palpitaciones, sangrado, náuseas, debilidad o molestias en ojos, nariz o garganta. Detente y busca atención adecuada si los síntomas persisten o son intensos.",
      "Stop signals: pain, dizziness, shortness of breath, palpitations, bleeding, nausea, weakness, or eye, nose, or throat discomfort. Stop and seek appropriate care if symptoms persist or are severe.",
    ),
    safety: l(
      "Lectura teórica. Las kriyas deben aprenderse con una persona instructora cualificada y no sustituyen consejo médico. ‘Detox’ es una denominación tradicional, no una promesa de eliminar toxinas. No realices limpiezas a partir de esta ficha.",
      "Theoretical study. Kriyas must be learned with a qualified instructor and are not medical advice. ‘Detox’ is a traditional label, not a promise to remove toxins. Do not perform cleansing procedures from this entry.",
    ),
  },
  guidedKriya({
    id: "jala-neti",
    name: l("Jala Neti · lavado nasal con agua", "Jala Neti · water nasal rinse"),
    summary: l("Una práctica tradicional de higiene nasal con solución salina.", "A traditional nasal-hygiene practice using saline."),
    category: "Nasal cleansing",
    level: "beginner",
    description: l(
      "Neti es una de las seis acciones nombradas en Haṭha Yoga Pradīpikā 2.22. Jala Neti describe una variante con agua; el uso y el propósito cambian entre tradiciones. No es una cura para alergias ni un ‘detox’ del organismo.",
      "Neti is one of the six actions named in Haṭha Yoga Pradīpikā 2.22. Jala Neti describes a water-based variation; use and purpose differ among traditions. It is not a cure for allergies or a bodily ‘detox.’",
    ),
    objective: l("Estudiar una forma tradicional de cuidado nasal con énfasis en agua segura y flujo sin fuerza.", "Study a traditional form of nasal care with emphasis on safe water and an unforced flow."),
    materials: l(
      "Recipiente de lavado nasal limpio, agua destilada o estéril (o agua previamente hervida y enfriada) y sobres salinos premedidos. No uses agua del grifo sin tratar ni compartas el dispositivo.",
      "A clean nasal-rinse device, distilled or sterile water (or previously boiled and cooled water), and premeasured saline packets. Never use untreated tap water or share the device.",
    ),
    preparation: l(
      "Aprende el montaje y la postura con una persona instructora cualificada. Sigue las indicaciones del fabricante para preparar y limpiar el dispositivo; el agua potable del grifo no es necesariamente segura para irrigar la nariz.",
      "Learn setup and posture with a qualified instructor. Follow the device maker's instructions for preparation and cleaning; tap water that is safe to drink is not necessarily safe for nasal rinsing.",
    ),
    instructionSteps: {
      es: [
        "Consulta primero si tienes síntomas nasales persistentes, infección, sangrados frecuentes, cirugía reciente o una condición médica; la persona instructora debe valorar si esta práctica es adecuada.",
        "Usa únicamente agua destilada o estéril, o agua hervida durante un minuto y luego enfriada; prepara la solución con un sobre salino comercial siguiendo su etiqueta.",
        "Con una demostración presencial, adopta una inclinación suave y deja que la solución fluya sin presión; no la fuerces ni bloquees la nariz.",
        "Permite que el instructor te muestre cómo terminar y limpiar el recipiente según el fabricante. No compartas el dispositivo.",
        "Detente ante dolor, presión en los oídos, sangrado, tos, ardor persistente o sensación de ahogo.",
      ],
      en: [
        "Ask first if you have persistent nasal symptoms, an infection, frequent nosebleeds, recent surgery, or a medical condition; the instructor should assess whether this practice is suitable.",
        "Use only distilled or sterile water, or water boiled for one minute and then cooled; prepare the solution with a commercial saline packet according to its label.",
        "After an in-person demonstration, use a gentle tilt and let the solution flow without pressure; do not force it or block the nose.",
        "Ask the instructor to show you how to finish and clean the device according to its maker. Do not share the device.",
        "Stop for pain, ear pressure, bleeding, coughing, persistent burning, or a choking sensation.",
      ],
    },
    frequency: l(
      "No hay una frecuencia universal para la práctica y no se recomienda convertirla en rutina diaria sin motivo. Sigue la indicación individual de tu instructor o profesional sanitario; reduce o suspende si reseca o irrita.",
      "There is no universal practice frequency, and it is not recommended as a daily routine without a reason. Follow individual guidance from your instructor or healthcare professional; reduce or stop if it causes dryness or irritation.",
    ),
    benefits: l(
      "En algunas tradiciones se atribuye a Neti una sensación de limpieza nasal antes de la práctica. La irrigación no trata por sí sola una enfermedad ni elimina toxinas del cuerpo.",
      "Some traditions associate Neti with a feeling of nasal cleanliness before practice. Rinsing does not by itself treat disease or remove toxins from the body.",
    ),
    risks: l(
      "Agua contaminada puede causar infecciones graves aunque el agua sea segura para beber. Una solución inadecuada, el flujo forzado o el equipo sucio pueden irritar la nariz, causar sangrado o molestias en los oídos.",
      "Contaminated water can cause serious infections even when it is safe to drink. An unsuitable solution, forceful flow, or an unclean device can irritate the nose, cause bleeding, or create ear discomfort.",
    ),
    contraindications: l(
      "Evita la irrigación durante una obstrucción nasal completa, sangrado activo, infección aguda del oído o nariz, dolor intenso, o recuperación de cirugía nasal hasta recibir autorización clínica. En embarazo, menstruación con malestar u otra condición, consulta antes; no son exclusiones universales para el lavado suave.",
      "Avoid rinsing with complete nasal blockage, active bleeding, an acute ear or nasal infection, severe pain, or recovery from nasal surgery until medically cleared. During pregnancy, menstruation with discomfort, or another condition, seek advice first; these are not universal exclusions for a gentle rinse.",
    ),
    precautions: l(
      "Señales para detenerse: dolor, presión o líquido retenido en el oído, sangrado, fiebre, tos o ardor que no cede. Si tras una irrigación aparecen fiebre, dolor de cabeza, vómitos o confusión, busca atención médica urgente.",
      "Stop signals: pain, ear pressure or trapped fluid, bleeding, fever, coughing, or burning that does not settle. If fever, headache, vomiting, or confusion develops after a rinse, seek urgent medical attention.",
    ),
    safety: l(
      "Aprende Jala Neti con una persona instructora cualificada; esta ficha no sustituye consejo médico. Usa solo agua destilada o estéril, o previamente hervida y enfriada: nunca agua del grifo sin tratar. Detente ante irritación, dolor, sangrado o presión en los oídos.",
      "Learn Jala Neti with a qualified instructor; this entry is educational information, not medical advice. Use only distilled or sterile water, or water previously boiled and cooled—never untreated tap water. Stop for irritation, pain, bleeding, or ear pressure.",
    ),
  }),
  guidedKriya({
    id: "sutra-neti",
    name: l("Sūtra Neti · solo con instructor", "Sūtra Neti · instructor only"),
    summary: l("Variante mecánica de Neti incluida aquí solo para estudio.", "A mechanical Neti variation included here for study only."),
    category: "Nasal cleansing",
    level: "advanced",
    description: l(
      "Algunas escuelas describen Sūtra Neti como una variante de limpieza nasal con un material flexible. Las técnicas y los materiales varían; el paso por la nariz no debe aprenderse mediante texto o vídeo.",
      "Some schools describe Sūtra Neti as a nasal-cleansing variation using a flexible material. Methods and materials vary; passage through the nose must not be learned from text or video.",
    ),
    objective: l("Conocer el lugar de la variante en la tradición y por qué requiere una demostración presencial especializada.", "Understand the variation's place in the tradition and why it requires specialized in-person teaching."),
    materials: l(
      "Los relatos tradicionales mencionan un hilo suave; algunas escuelas modernas usan un catéter diseñado para este fin. Esta ficha no recomienda comprar ni insertar ningún objeto.",
      "Traditional accounts mention a soft thread; some modern schools use a purpose-designed catheter. This entry does not recommend buying or inserting any object.",
    ),
    preparation: l(
      "Nivel avanzado y solo con instructor cualificado con experiencia demostrable en la técnica. Requiere evaluación presencial y, ante cualquier condición nasal, autorización clínica.",
      "Advanced level and instructor-only, with a qualified teacher who has demonstrated experience in the technique. It requires an in-person assessment and, for any nasal condition, medical clearance.",
    ),
    instructionSteps: {
      es: [
        "Estudia primero la finalidad tradicional y pregunta por la formación de la persona instructora.",
        "Revisa con un profesional sanitario antecedentes de cirugía nasal, desviación del tabique, sangrados, infección o uso de anticoagulantes.",
        "Observa una explicación presencial del equipo, la anatomía y los riesgos; esta ficha no describe inserción ni manipulación.",
        "No intentes la técnica en casa ni permitas que una persona no formada inserte un objeto.",
        "Si se autoriza una sesión presencial, sigue exclusivamente la dirección directa del instructor y detente ante dolor, resistencia, tos o sangrado.",
      ],
      en: [
        "First study the traditional purpose and ask about the instructor's training.",
        "Review prior nasal surgery, septal problems, bleeding, infection, or anticoagulant use with a healthcare professional.",
        "Observe an in-person explanation of equipment, anatomy, and risks; this entry does not describe insertion or manipulation.",
        "Do not attempt the technique at home or allow an untrained person to insert an object.",
        "If an in-person session is approved, follow only the instructor's direct guidance and stop for pain, resistance, coughing, or bleeding.",
      ],
    },
    frequency: l("No se prescribe frecuencia en esta app. Solo una persona instructora puede decidir si procede y cuándo; no es una rutina de autocuidado diario.", "No frequency is prescribed in this app. Only a qualified instructor can decide whether or when it is appropriate; it is not a daily self-care routine."),
    benefits: l("Algunas escuelas le atribuyen una sensación de despeje nasal. No se afirma un beneficio médico y el riesgo mecánico requiere una valoración prudente.", "Some schools attribute a feeling of nasal openness to it. No medical benefit is claimed, and its mechanical risk warrants careful assessment."),
    risks: l("Puede irritar o lesionar mucosa, provocar sangrado, infección, tos o dolor, y agravar una lesión nasal. No se puede valorar la anatomía desde una pantalla.", "It can irritate or injure nasal tissue, cause bleeding, infection, coughing, or pain, and aggravate a nasal injury. Anatomy cannot be assessed from a screen."),
    contraindications: l("No practicar con obstrucción, lesión, sangrado, infección o cirugía nasal reciente; tampoco sin aprobación individual durante embarazo, hipertensión, enfermedad cardíaca/respiratoria, uso de anticoagulantes u otra condición relevante. La menstruación no es una contraindicación mecánica universal, pero consulta si tienes síntomas o dudas.", "Do not practice with blockage, injury, bleeding, infection, or recent nasal surgery, or without individual clearance during pregnancy, hypertension, heart/respiratory disease, anticoagulant use, or another relevant condition. Menstruation is not a universal mechanical contraindication, but seek advice if you have symptoms or concerns."),
    precautions: l("Señales para detenerse: dolor o resistencia, sangrado, lagrimeo intenso, tos, falta de aire, presión en el oído o sensación de pánico. No intentes repetir para ‘superar’ una molestia.", "Stop signals: pain or resistance, bleeding, heavy tearing, coughing, shortness of breath, ear pressure, or panic. Do not repeat an attempt to ‘push through’ discomfort."),
    safety: l("Solo con instructor cualificado y tras evaluación; no practiques ni insertes materiales por tu cuenta. Es información educativa, no consejo médico. Evítala con lesión, infección, sangrado o cirugía nasal reciente; consulta por embarazo u otras condiciones.", "Instructor only and only after assessment; do not practice or insert materials on your own. This is educational information, not medical advice. Avoid it with nasal injury, infection, bleeding, or recent surgery; seek guidance for pregnancy or other conditions."),
  }),
  guidedKriya({
    id: "dhauti",
    name: l("Dhauti · variantes digestivas", "Dhauti · digestive variations"),
    summary: l("Familia tradicional de métodos muy distintos; las variantes internas son solo estudio.", "A traditional family of varied methods; internal variations are for study only."),
    category: "Digestive cleansing",
    level: "advanced",
    description: l(
      "Dhauti es una de las seis acciones de Haṭha Yoga. Los textos y escuelas agrupan variantes orales, internas y de limpieza del tracto digestivo; no constituyen un único procedimiento ni una recomendación médica.",
      "Dhauti is one of the six Haṭha Yoga actions. Texts and schools group oral, internal, and digestive-tract cleansing variations under this name; they are not one procedure or a medical recommendation.",
    ),
    objective: l("Comprender que Dhauti incluye métodos de riesgo desigual y distinguir la higiene oral suave de las técnicas internas.", "Understand that Dhauti includes methods with different risk levels and distinguish gentle oral hygiene from internal techniques."),
    materials: l(
      "Las fuentes tradicionales mencionan materiales diferentes para algunas variantes, incluidos agua, tela o una sonda. No se proporciona una lista de compra ni preparación para métodos internos.",
      "Traditional sources mention different materials for some variations, including water, cloth, or a rod. No shopping or setup list is provided for internal methods.",
    ),
    preparation: l("Estudio teórico y evaluación clínica/docente. Dhauti interna, Vamana Dhauti y Vastra Dhauti no deben probarse a partir de una guía escrita.", "Theoretical study and clinical/teacher assessment. Internal Dhauti, Vamana Dhauti, and Vastra Dhauti must not be attempted from a written guide."),
    instructionSteps: {
      es: [
        "Pregunta qué variante nombra la escuela: el término Dhauti abarca prácticas muy diferentes.",
        "Solicita una explicación histórica y de riesgos a una persona docente con experiencia específica.",
        "Consulta con un profesional sanitario antes de considerar cualquier variante que implique ingestión, regurgitación, tela o instrumentos.",
        "No induzcas el vómito, no tragues tela y no introduzcas objetos siguiendo una descripción digital.",
        "Si estudias una variante oral suave, sigue la guía de cuidado oral y detente si hay dolor o sangrado.",
      ],
      en: [
        "Ask which variation a school means: Dhauti covers very different practices.",
        "Request a historical and risk explanation from a teacher with specific experience.",
        "Consult a healthcare professional before considering any variation involving ingestion, regurgitation, cloth, or instruments.",
        "Do not induce vomiting, swallow cloth, or insert objects by following a digital description.",
        "If studying a gentle oral variation, follow oral-care guidance and stop for pain or bleeding.",
      ],
    },
    frequency: l("No se recomienda frecuencia para las variantes internas. Solo una persona cualificada puede evaluar si alguna es adecuada; la app no prescribe ciclos ni purgas.", "No frequency is recommended for internal variations. Only a qualified professional can assess whether any is suitable; the app does not prescribe cycles or purging."),
    benefits: l("Las fuentes tradicionales atribuyen a algunas variantes un propósito de purificación y preparación. No hay aquí una afirmación de cura, limpieza de toxinas o mejora digestiva garantizada.", "Traditional sources attribute purification and preparation purposes to some variations. No cure, toxin-cleansing, or guaranteed digestive benefit is claimed here."),
    risks: l("La regurgitación o el uso de tela/instrumentos puede causar aspiración, deshidratación, alteraciones electrolíticas, irritación, desgarro o infección. No son prácticas de autocuidado de bajo riesgo.", "Regurgitation or use of cloth/instruments can cause aspiration, dehydration, electrolyte imbalance, irritation, tearing, or infection. These are not low-risk self-care practices."),
    contraindications: l("Evita métodos internos con embarazo, menstruación, hipertensión, enfermedad cardíaca o respiratoria, hernia hiatal o abdominal, reflujo severo, úlcera, enfermedad gastrointestinal, trastorno alimentario, problemas de deglución, anticoagulantes o cirugía reciente de abdomen/esófago. Se requiere evaluación clínica individual.", "Avoid internal methods with pregnancy, menstruation, hypertension, heart or respiratory disease, hiatal or abdominal hernia, severe reflux, ulcer, gastrointestinal disease, an eating disorder, swallowing problems, anticoagulants, or recent abdominal/esophageal surgery. Individual clinical assessment is required."),
    precautions: l("Señales para detenerse y pedir ayuda: arcadas persistentes, vómitos con sangre, dolor de pecho o abdomen, falta de aire, mareo, debilidad intensa, confusión o desmayo.", "Stop and seek help for persistent retching, blood in vomit, chest or abdominal pain, shortness of breath, dizziness, severe weakness, confusion, or fainting."),
    safety: l("Dhauti interna es avanzada y solo con instructor cualificado; esta ficha no enseña vómito inducido, ingestión de tela ni inserción de instrumentos. Es información educativa, no consejo médico. Evítala con embarazo, menstruación, hipertensión, enfermedad cardíaca, hernias, úlceras o cirugías recientes.", "Internal Dhauti is advanced and instructor-only; this entry does not teach induced vomiting, cloth ingestion, or instrument insertion. This is educational information, not medical advice. Avoid it with pregnancy, menstruation, hypertension, heart disease, hernias, ulcers, or recent surgery."),
    relatedIds: ["danta-dhauti"],
  }),
  guidedKriya({
    id: "nauli",
    name: l("Nauli · solo con instructor", "Nauli · instructor only"),
    summary: l("Técnica tradicional de aislamiento abdominal, incluida aquí sin instrucciones de ejecución.", "A traditional abdominal-isolation technique, included here without performance instructions."),
    category: "Abdominal technique",
    level: "advanced",
    description: l("Nauli figura entre los ṣaṭkarmas en Haṭha Yoga Pradīpikā 2.22. Se describe como una manipulación abdominal; las escuelas difieren en su progresión y requisitos.", "Nauli is listed among the ṣaṭkarmas in Haṭha Yoga Pradīpikā 2.22. It is described as abdominal manipulation; schools differ in progression and prerequisites."),
    objective: l("Estudiar su contexto y aprender a evaluar cuándo no practicarla.", "Study its context and learn to recognize when not to practice it."),
    materials: l("Espacio despejado y una persona instructora cualificada; no se requieren herramientas para esta lectura.", "A clear space and a qualified instructor; no tools are required for this study entry."),
    preparation: l("No es una práctica para aprender por texto. Requiere valoración presencial, una base sólida de yoga y autorización clínica si existe cualquier factor de riesgo.", "This is not a practice to learn from text. It requires in-person assessment, a solid yoga foundation, and clinical clearance when any risk factor is present."),
    instructionSteps: {
      es: [
        "Estudia la finalidad tradicional y conversa con una persona docente con experiencia real en Nauli.",
        "Antes de cualquier demostración práctica, revisa embarazo, ciclo menstrual, presión arterial, antecedentes cardíacos, hernias, salud digestiva y cirugías con profesionales pertinentes.",
        "Observa la explicación y los criterios de salida; esta ficha no da indicaciones para contraer, aislar o mover el abdomen.",
        "Solo si recibes autorización individual, sigue una progresión presencial definida por el instructor; no añadas retenciones ni esfuerzos por cuenta propia.",
        "Detente de inmediato ante dolor, mareo, presión, náuseas, palpitaciones o falta de aire.",
      ],
      en: [
        "Study the traditional context and speak with a teacher who has real experience in Nauli.",
        "Before any practical demonstration, review pregnancy, menstrual cycle, blood pressure, cardiac history, hernias, digestive health, and surgery with relevant professionals.",
        "Observe the explanation and stopping criteria; this entry does not cue abdominal contraction, isolation, or movement.",
        "Only if individually cleared, follow an in-person progression set by the teacher; do not add breath holds or effort on your own.",
        "Stop immediately for pain, dizziness, pressure, nausea, palpitations, or shortness of breath.",
      ],
    },
    frequency: l("No se recomienda una frecuencia autónoma. Si se considera apropiada, el instructor decide si se practica y con qué intervalo; no es una rutina diaria general.", "No unsupervised frequency is recommended. If considered appropriate, the teacher decides whether and how often it is practiced; it is not a general daily routine."),
    benefits: l("Algunas tradiciones describen Nauli como una disciplina abdominal y de preparación. No se afirma masaje terapéutico, pérdida de peso ni tratamiento digestivo.", "Some traditions describe Nauli as an abdominal and preparatory discipline. No therapeutic massage, weight-loss, or digestive-treatment claim is made."),
    risks: l("La presión abdominal y las maniobras forzadas pueden agravar una hernia, una lesión o una condición cardiovascular, y causar dolor, mareo o náuseas.", "Abdominal pressure and forced maneuvers can aggravate a hernia, injury, or cardiovascular condition, and cause pain, dizziness, or nausea."),
    contraindications: l("No practicar durante embarazo ni menstruación; evita con hipertensión, enfermedad cardíaca o vascular, hernias, úlcera/reflujo activo, enfermedad abdominal, prolapso, dolor pélvico o abdominal, o cirugía reciente. Consulta si tienes asma, vértigo o cualquier condición activa.", "Do not practice during pregnancy or menstruation; avoid it with hypertension, heart or vascular disease, hernias, active ulcer/reflux, abdominal disease, prolapse, pelvic or abdominal pain, or recent surgery. Seek advice with asthma, vertigo, or any active condition."),
    precautions: l("Señales para detenerse: dolor o tirón abdominal, náusea, mareo, visión borrosa, palpitaciones, presión en el pecho o falta de aire. No intentes compensar con más fuerza.", "Stop signals: abdominal pain or pulling, nausea, dizziness, blurred vision, palpitations, chest pressure, or shortness of breath. Do not try to compensate with more force."),
    safety: l("Avanzada y solo con instructor cualificado. No practiques a partir de una guía digital. Es información educativa, no consejo médico; está contraindicada en embarazo y menstruación y debe evitarse con hipertensión, cardiopatía, hernia, úlcera o cirugía reciente.", "Advanced and instructor-only. Do not practice from a digital guide. This is educational information, not medical advice; it is contraindicated during pregnancy and menstruation and should be avoided with hypertension, heart disease, hernia, ulcer, or recent surgery."),
  }),
  guidedKriya({
    id: "basti",
    name: l("Basti · solo con instructor", "Basti · instructor only"),
    summary: l("Método intestinal tradicional de alto riesgo; ficha exclusivamente teórica.", "A high-risk traditional intestinal method; theoretical entry only."),
    category: "Digestive cleansing",
    level: "advanced",
    description: l("Basti es una de las seis acciones citadas en Haṭha Yoga Pradīpikā 2.22. Las descripciones tradicionales incluyen métodos de limpieza intestinal; no son equivalentes a cuidados médicos modernos.", "Basti is one of the six actions cited in Haṭha Yoga Pradīpikā 2.22. Traditional descriptions include intestinal-cleansing methods; they are not equivalent to modern medical care."),
    objective: l("Reconocer el contexto histórico y los riesgos de irrigaciones intestinales no indicadas clínicamente.", "Recognize the historical context and risks of intestinal irrigation without clinical indication."),
    materials: l("Las fuentes históricas describen agua y dispositivos específicos. No se enumeran ni recomiendan materiales para uso propio.", "Historical sources describe water and specific devices. Materials for self-use are neither listed nor recommended."),
    preparation: l("Solo estudio teórico. No intentes una irrigación o enema y no compres equipo para practicar a partir de esta ficha.", "Theoretical study only. Do not attempt irrigation or an enema, and do not buy equipment for practice from this entry."),
    instructionSteps: {
      es: [
        "Aprende qué describe la tradición y distingue la práctica histórica de los procedimientos médicos actuales.",
        "Consulta a un profesional sanitario sobre riesgos personales antes de considerar cualquier limpieza intestinal.",
        "Si estudias el tema en una escuela de yoga, pide a una persona docente cualificada que explique límites y alternativas no invasivas.",
        "No introduzcas agua ni instrumentos en el recto a partir de una explicación en línea; esta ficha no aporta un protocolo.",
        "Busca atención médica si aparece dolor abdominal, sangrado, fiebre, debilidad, vómitos o desmayo tras cualquier procedimiento intestinal.",
      ],
      en: [
        "Learn what the tradition describes and distinguish historical practice from current medical procedures.",
        "Ask a healthcare professional about personal risks before considering any intestinal cleanse.",
        "If studying the topic in a yoga school, ask a qualified teacher to explain limits and noninvasive alternatives.",
        "Do not introduce water or instruments into the rectum from an online explanation; this entry provides no protocol.",
        "Seek medical care for abdominal pain, bleeding, fever, weakness, vomiting, or fainting after any intestinal procedure.",
      ],
    },
    frequency: l("No se recomienda frecuencia. La app no prescribe ni apoya la irrigación intestinal como hábito de bienestar.", "No frequency is recommended. The app does not prescribe or endorse intestinal irrigation as a wellness routine."),
    benefits: l("Los textos tradicionales le atribuyen una finalidad de purificación. La evidencia clínica para irrigación colónica es limitada y no se afirma que elimine toxinas ni cure enfermedades.", "Traditional texts attribute a purpose of purification. Clinical evidence for colonic irrigation is limited, and no toxin-removal or disease-cure claim is made."),
    risks: l("Las limpiezas intestinales pueden causar deshidratación, infección, alteraciones de electrolitos, sangrado o perforación; el riesgo puede ser mayor con enfermedad digestiva o cirugías previas.", "Intestinal cleanses can cause dehydration, infection, electrolyte imbalance, bleeding, or perforation; risk may be higher with digestive disease or prior surgery."),
    contraindications: l("No considerar con embarazo, menstruación, hipertensión, enfermedad cardíaca o renal, enfermedad gastrointestinal, hernia, úlcera, hemorroides severas, deshidratación o cirugía abdominal/intestinal reciente. Cualquier interés requiere evaluación clínica; no es una práctica autónoma.", "Do not consider it with pregnancy, menstruation, hypertension, heart or kidney disease, gastrointestinal disease, hernia, ulcer, severe hemorrhoids, dehydration, or recent abdominal/intestinal surgery. Any interest requires clinical assessment; this is not a self-practice."),
    precautions: l("Señales de alarma: dolor fuerte, abdomen distendido, sangre, fiebre, vómitos persistentes, debilidad marcada, confusión, reducción de orina o desmayo. Busca atención médica; no repitas la limpieza.", "Warning signs: severe pain, abdominal swelling, blood, fever, persistent vomiting, marked weakness, confusion, reduced urination, or fainting. Seek medical care; do not repeat the cleanse."),
    safety: l("Solo estudio con instructor cualificado; no realices Basti ni introduzcas agua o instrumentos por cuenta propia. Es información educativa, no consejo médico. Evítalo con embarazo, menstruación, hipertensión, enfermedad cardíaca/renal o digestiva, hernia, úlcera y cirugías recientes.", "Study only with a qualified instructor; do not perform Basti or introduce water or instruments on your own. This is educational information, not medical advice. Avoid it with pregnancy, menstruation, hypertension, heart/kidney/digestive disease, hernia, ulcer, or recent surgery."),
    relatedIds: ["shankhaprakshalana"],
  }),
  guidedKriya({
    id: "trataka-kriya",
    name: l("Trāṭaka · concentración visual", "Trāṭaka · visual concentration"),
    summary: l("Práctica tradicional de mirada estable en un objeto sencillo.", "Traditional practice of steady gazing at a simple object."),
    category: "Visual focus",
    level: "beginner",
    description: l("Trāṭaka aparece como una de las seis acciones en Haṭha Yoga Pradīpikā 2.22. Algunas escuelas usan una llama u otro punto fijo y varían la duración; aquí se propone solo una exploración suave de atención visual.", "Trāṭaka appears as one of the six actions in Haṭha Yoga Pradīpikā 2.22. Some schools use a flame or another fixed point and vary the duration; this entry offers only a gentle exploration of visual attention."),
    objective: l("Practicar atención visual sin tensar los ojos ni buscar efectos físicos.", "Practice visual attention without straining the eyes or seeking physical effects."),
    materials: l("Silla estable y un punto oscuro mate en una pared. La llama no es necesaria; evita objetos brillantes o parpadeantes.", "A steady chair and a matte dark dot on a wall. A flame is not needed; avoid bright or flickering objects."),
    preparation: l("Aprende el propósito tradicional con una persona instructora. Si tienes molestias oculares, consulta a un profesional de salud visual antes de probar incluso una mirada breve.", "Learn the traditional context with an instructor. If you have eye discomfort, consult an eye-care professional before trying even a brief gaze."),
    instructionSteps: {
      es: [
        "Siéntate cómodamente frente a un punto mate, a distancia y altura que no requieran levantar ni girar el cuello.",
        "Mira suavemente durante unos instantes y parpadea con normalidad; no fuerces la mirada ni evites las lágrimas.",
        "Aparta la mirada o cierra los ojos y descansa la vista mirando un espacio amplio.",
        "Si todo sigue cómodo, repite una vez; no aumentes la duración para conseguir una imagen residual.",
        "Termina mirando alrededor con naturalidad. Una persona docente cualificada puede corregir la técnica y el contexto tradicional.",
      ],
      en: [
        "Sit comfortably facing a matte point at a distance and height that do not require lifting or turning the neck.",
        "Gaze softly for a few moments and blink normally; do not strain or try to prevent tearing.",
        "Look away or close the eyes and rest them by looking into a wider space.",
        "If everything remains comfortable, repeat once; do not lengthen the gaze to create an after-image.",
        "Finish by looking around naturally. A qualified teacher can guide technique and traditional context.",
      ],
    },
    frequency: l("No hay una frecuencia médica recomendada. Si tu instructor la incluye, mantén intervalos breves y suspende si aparece sequedad o cansancio ocular.", "There is no medically recommended frequency. If your teacher includes it, keep intervals brief and stop if dryness or eye fatigue appears."),
    benefits: l("La tradición la presenta como entrenamiento de concentración. No se afirma que corrija la vista, trate enfermedades oculares ni mejore la memoria.", "Tradition presents it as concentration training. It is not claimed to correct vision, treat eye disease, or improve memory."),
    risks: l("Una mirada prolongada puede causar sequedad, lagrimeo, tensión ocular o dolor de cabeza. Una vela añade riesgo de incendio; no mires al sol ni a una fuente de luz intensa.", "Prolonged gazing can cause dryness, tearing, eye strain, or headache. A candle adds fire risk; never look at the sun or an intense light source."),
    contraindications: l("Evita con dolor ocular, lesión o cirugía reciente, ojo seco sintomático, migraña o sensibilidad a la luz hasta consultar a un profesional. En embarazo, menstruación, hipertensión o enfermedad cardíaca no hay una contraindicación específica por mirar un punto, pero consulta si una condición altera tu comodidad.", "Avoid it with eye pain, injury or recent surgery, symptomatic dry eye, migraine, or light sensitivity until you consult a professional. Pregnancy, menstruation, hypertension, and heart disease are not specific contraindications to looking at a dot, but seek advice if a condition affects your comfort."),
    precautions: l("Señales para detenerse: ardor, dolor, visión borrosa, dolor de cabeza, mareo o lagrimeo persistente. Parpadea, mira a lo lejos y termina; no frotes los ojos.", "Stop signals: burning, pain, blurred vision, headache, dizziness, or persistent tearing. Blink, look into the distance, and finish; do not rub the eyes."),
    safety: l("Aprende Trāṭaka con una persona instructora cualificada; es información educativa, no consejo médico ni tratamiento ocular. Usa un punto tenue, parpadea y detente ante molestias. Nunca mires al sol ni a una luz intensa.", "Learn Trāṭaka with a qualified instructor; this is educational information, not medical advice or eye treatment. Use a dim point, blink, and stop at discomfort. Never look at the sun or an intense light."),
  }),
  guidedKriya({
    id: "kapalabhati-shatkarma",
    name: l("Kapālabhāti · contexto de ṣaṭkarma", "Kapālabhāti · ṣaṭkarma context"),
    summary: l("Acción tradicional de respiración activa; la ficha práctica está en Pranayama.", "Traditional active-breathing action; the practice entry is in Pranayama."),
    category: "Breath cleansing",
    level: "advanced",
    description: l("Kapālabhāti completa la lista de seis acciones en Haṭha Yoga Pradīpikā 2.22. Algunas tradiciones la clasifican como kriya y otras la estudian junto a Prāṇāyāma; la clasificación no convierte la técnica en una limpieza médica.", "Kapālabhāti completes the list of six actions in Haṭha Yoga Pradīpikā 2.22. Some traditions classify it as a kriya and others study it with Prāṇāyāma; classification does not make it a medical cleanse."),
    objective: l("Entender su relación con los ṣaṭkarmas y acceder a la ficha de respiración existente sin duplicar instrucciones.", "Understand its relation to the ṣaṭkarmas and access the existing breath-practice entry without duplicating instructions."),
    materials: l("Una silla o asiento estable para una clase presencial; no uses dispositivos ni conteos de una app para acelerar la respiración.", "A stable chair or seat for an in-person class; do not use devices or app counts to speed up breathing."),
    preparation: l("Avanzada y solo con instructor. Consulta la ficha de Kapālabhāti en Pranayama para estudiar sus precauciones; no practiques usando esta ficha contextual.", "Advanced and instructor-only. See the Kapālabhāti entry in Pranayama for its precautions; do not practice from this contextual entry."),
    instructionSteps: {
      es: [
        "Lee la clasificación tradicional y reconoce que la técnica también está catalogada en Pranayama.",
        "Abre el enlace relacionado ‘Respiración de cráneo brillante’ para revisar las advertencias detalladas.",
        "Antes de aprenderla, pide evaluación a una persona instructora y consulta a un profesional sanitario si tienes alguna condición de riesgo.",
        "Aprende el patrón solo en una sesión presencial supervisada; esta ficha no prescribe velocidad, rondas ni retenciones.",
        "Detente ante mareo, dolor de pecho o abdomen, palpitaciones, falta de aire, visión borrosa o dolor de cabeza.",
      ],
      en: [
        "Read the traditional classification and note that the technique is also catalogued in Pranayama.",
        "Open the related ‘Skull-shining breath’ entry to review its detailed warnings.",
        "Before learning it, ask an instructor to assess suitability and consult a healthcare professional if you have a risk condition.",
        "Learn the pattern only in a supervised in-person session; this entry does not prescribe speed, rounds, or breath holds.",
        "Stop for dizziness, chest or abdominal pain, palpitations, shortness of breath, blurred vision, or headache.",
      ],
    },
    frequency: l("No se recomienda una pauta en esta entrada. El instructor decide si es apropiada; no se aconsejan rondas autónomas ni retenciones.", "No schedule is recommended in this entry. The instructor decides whether it is appropriate; unsupervised rounds or holds are not advised."),
    benefits: l("La tradición le atribuye una función de limpieza y activación. No se promete eliminación de toxinas ni beneficio médico; consulta la ficha de Pranayama para su estudio prudente.", "Tradition attributes cleansing and activating purposes to it. No toxin removal or medical benefit is promised; see the Pranayama entry for cautious study."),
    risks: l("La respiración rápida y activa puede provocar mareo, ansiedad, falta de aire y cambios cardiovasculares. El esfuerzo abdominal aumenta la presión interna.", "Rapid, active breathing can cause dizziness, anxiety, shortness of breath, and cardiovascular changes. Abdominal effort increases internal pressure."),
    contraindications: l("No practicar sin autorización clínica y docente con embarazo, menstruación, hipertensión, enfermedad cardíaca o vascular, arritmia, hernia, úlcera/reflujo, cirugía reciente, enfermedad respiratoria, glaucoma, vértigo o trastorno de pánico activo.", "Do not practice without clinical and teacher clearance with pregnancy, menstruation, hypertension, heart or vascular disease, arrhythmia, hernia, ulcer/reflux, recent surgery, respiratory disease, glaucoma, vertigo, or active panic disorder."),
    precautions: l("Señales para detenerse: mareo, hormigueo, dolor, náuseas, palpitaciones, visión borrosa, ansiedad creciente o falta de aire. Vuelve a respirar con naturalidad y pide ayuda si no se resuelve pronto.", "Stop signals: dizziness, tingling, pain, nausea, palpitations, blurred vision, increasing anxiety, or shortness of breath. Return to natural breathing and seek help if it does not resolve promptly."),
    safety: l("Avanzada y solo con instructor cualificado. No la practiques a partir de esta descripción; es información educativa, no consejo médico. Evítala o pide autorización clínica por embarazo, menstruación, hipertensión, problemas cardíacos, hernia, úlcera o cirugía reciente.", "Advanced and instructor-only. Do not practice from this description; this is educational information, not medical advice. Avoid it or seek medical clearance for pregnancy, menstruation, hypertension, heart problems, hernia, ulcer, or recent surgery."),
    relatedIds: ["kapalabhati"],
  }),
  guidedKriya({
    id: "shankhaprakshalana",
    name: l("Śaṅkhaprakṣālana · solo con instructor", "Śaṅkhaprakṣālana · instructor only"),
    summary: l("Limpieza intestinal prolongada descrita en algunas escuelas; lectura sin protocolo.", "Prolonged intestinal cleansing described in some schools; study entry without a protocol."),
    category: "Extended cleansing",
    level: "advanced",
    description: l("Śaṅkhaprakṣālana, también llamada Varisara Dhauti en algunas clasificaciones, se describe en ciertas tradiciones como una limpieza extensa del tracto digestivo. Los protocolos difieren y no constituyen atención médica.", "Śaṅkhaprakṣālana, also called Varisara Dhauti in some classifications, is described in certain traditions as an extensive digestive-tract cleanse. Protocols vary and are not medical care."),
    objective: l("Comprender por qué es una técnica avanzada y reconocer riesgos de grandes volúmenes de agua y evacuaciones repetidas.", "Understand why this is an advanced technique and recognize risks from large volumes of water and repeated bowel movements."),
    materials: l("Las escuelas describen agua con sal y una secuencia de movimientos; no se indica cantidad, receta, preparación ni duración para uso propio.", "Schools describe salted water and a sequence of movements; no amount, recipe, setup, or duration is provided for self-use."),
    preparation: l("Solo estudio con instructor cualificado y evaluación clínica individual. No es una práctica para realizar en casa ni seguir mediante un reto, video o aplicación.", "Study only with a qualified instructor and individual clinical assessment. This is not for home practice or following as a challenge, video, or app routine."),
    instructionSteps: {
      es: [
        "Conoce la descripción histórica y pregunta cómo varía entre escuelas; no asumas que existe un protocolo universal.",
        "Revisa con un profesional sanitario tu estado cardíaco, renal, digestivo, presión arterial, medicación y cirugías previas.",
        "Habla presencialmente con una persona docente con experiencia y pregunta por alternativas no invasivas.",
        "No prepares ni bebas una solución salina ni sigas secuencias de movimientos desde una fuente digital.",
        "Si alguien ha iniciado un protocolo y presenta debilidad, vómitos, dolor, confusión, palpitaciones o desmayo, detén la actividad y busca atención médica.",
      ],
      en: [
        "Learn the historical description and ask how it varies across schools; do not assume there is one universal protocol.",
        "Review heart, kidney, digestive health, blood pressure, medication, and prior surgery with a healthcare professional.",
        "Speak in person with an experienced teacher and ask about noninvasive alternatives.",
        "Do not prepare or drink a saline solution or follow movement sequences from a digital source.",
        "If someone has begun a protocol and develops weakness, vomiting, pain, confusion, palpitations, or fainting, stop and seek medical care.",
      ],
    },
    frequency: l("No se recomienda frecuencia; esta app no promueve limpiezas intestinales como rutina. Solo el equipo docente y clínico puede valorar el contexto.", "No frequency is recommended; this app does not promote intestinal cleanses as a routine. Only qualified teaching and clinical professionals can assess the context."),
    benefits: l("Algunas escuelas le atribuyen una finalidad ritual o de purificación. No se afirma que elimine toxinas, cure enfermedades o mejore la salud digestiva.", "Some schools attribute a ritual or purifying purpose to it. It is not claimed to remove toxins, cure disease, or improve digestive health."),
    risks: l("La ingestión de mucha agua salina y las evacuaciones repetidas pueden causar deshidratación, alteraciones de sodio/electrolitos, vómitos o descompensación; la irrigación intestinal puede tener efectos graves.", "Drinking large amounts of saline water and repeated bowel movements can cause dehydration, sodium/electrolyte imbalance, vomiting, or decompensation; intestinal cleansing can have serious effects."),
    contraindications: l("No practicar con embarazo, menstruación, hipertensión, cardiopatía, enfermedad renal, digestiva o intestinal, hernia, úlcera, hemorroides, trastorno alimentario, deshidratación, medicación que afecta líquidos/electrolitos o cirugía reciente. Requiere valoración médica individual y supervisión cualificada.", "Do not practice with pregnancy, menstruation, hypertension, heart disease, kidney, digestive, or intestinal disease, hernia, ulcer, hemorrhoids, an eating disorder, dehydration, medication affecting fluids/electrolytes, or recent surgery. Individual medical assessment and qualified supervision are required."),
    precautions: l("Señales para detenerse y buscar atención: confusión, desmayo, debilidad marcada, vómitos persistentes, calambres intensos, palpitaciones, dolor abdominal fuerte, sangre o incapacidad para retener líquidos.", "Stop and seek care for confusion, fainting, marked weakness, persistent vomiting, severe cramps, palpitations, severe abdominal pain, blood, or inability to keep fluids down."),
    safety: l("Avanzada y solo con instructor cualificado, con evaluación clínica. Esta ficha no incluye receta, cantidades ni protocolo; no la realices por cuenta propia. Es información educativa, no consejo médico. Está contraindicada en embarazo, menstruación y varias condiciones cardíacas, renales, digestivas o quirúrgicas.", "Advanced and instructor-only, with clinical assessment. This entry includes no recipe, amounts, or protocol; do not perform it on your own. This is educational information, not medical advice. It is contraindicated during pregnancy, menstruation, and with several cardiac, kidney, digestive, or surgical conditions."),
    relatedIds: ["basti", "dhauti"],
  }),
  guidedKriya({
    id: "danta-dhauti",
    name: l("Danta Dhauti · higiene oral suave", "Danta Dhauti · gentle oral hygiene"),
    summary: l("Cuidado cotidiano de dientes y lengua; adaptación higiénica, no ‘detox’.", "Everyday teeth and tongue care; a hygienic adaptation, not a ‘detox.’"),
    category: "Gentle related practice",
    level: "beginner",
    description: l("Algunos textos de Haṭha Yoga incluyen el cuidado oral dentro de Danta Dhauti. Esta ficha se limita a la higiene moderna habitual y no recomienda métodos internos tradicionales.", "Some Haṭha Yoga texts include oral care within Danta Dhauti. This entry is limited to ordinary modern hygiene and does not recommend traditional internal methods."),
    objective: l("Mantener una rutina oral cómoda y distinguirla de técnicas invasivas de Dhauti.", "Maintain a comfortable oral-care routine and distinguish it from invasive Dhauti techniques."),
    materials: l("Cepillo de cerdas suaves, pasta dental habitual y, si ya la utilizas sin molestia, un limpiador lingual limpio.", "A soft-bristled toothbrush, usual toothpaste, and, if already comfortable for you, a clean tongue scraper."),
    preparation: l("Sigue las pautas de tu dentista. No compartas utensilios ni introduzcas objetos hacia la garganta.", "Follow your dentist's advice. Do not share tools or insert objects toward the throat."),
    instructionSteps: {
      es: [
        "Lávate las manos y usa un cepillo personal limpio.",
        "Cepilla dientes y encías con suavidad según las recomendaciones de tu profesional dental.",
        "Si usas un limpiador lingual, pásalo con muy poca presión por la parte anterior y media de la lengua, sin alcanzar la garganta.",
        "Enjuaga y limpia el utensilio según sus instrucciones; no lo compartas.",
        "Detente ante dolor, náuseas, irritación o sangrado y consulta a un dentista si se repite.",
      ],
      en: [
        "Wash your hands and use a clean personal toothbrush.",
        "Brush teeth and gums gently according to your dental professional's advice.",
        "If using a tongue scraper, pass it with very light pressure over the front and middle of the tongue without reaching the throat.",
        "Rinse and clean the tool as directed; do not share it.",
        "Stop for pain, gagging, irritation, or bleeding and consult a dentist if it recurs.",
      ],
    },
    frequency: l("Sigue la rutina oral recomendada por tu dentista; la limpieza lingual es opcional y no necesita repetirse varias veces al día.", "Follow the oral-care routine recommended by your dentist; tongue cleaning is optional and need not be repeated several times a day."),
    benefits: l("Puede contribuir a una sensación cotidiana de limpieza oral. No limpia órganos internos ni elimina toxinas, y no es un sustituto del cuidado dental.", "May contribute to an everyday feeling of oral cleanliness. It does not cleanse internal organs or remove toxins, and it is not a substitute for dental care."),
    risks: l("La presión excesiva o un utensilio sucio puede irritar la lengua o las encías, causar sangrado o activar el reflejo nauseoso.", "Excessive pressure or an unclean tool can irritate the tongue or gums, cause bleeding, or trigger gagging."),
    contraindications: l("Evita limpiar la lengua con heridas, úlceras, infección, cirugía oral reciente o sangrado; consulta si tienes trastorno de coagulación, mucositis o dolor oral. Embarazo y menstruación no son contraindicaciones específicas para higiene externa suave.", "Avoid tongue scraping with wounds, ulcers, infection, recent oral surgery, or bleeding; seek advice with a bleeding disorder, mucositis, or oral pain. Pregnancy and menstruation are not specific contraindications to gentle external hygiene."),
    precautions: l("Señales para detenerse: dolor, náusea, irritación persistente o sangrado. No raspes hasta que la lengua cambie de color ni uses objetos afilados.", "Stop signals: pain, gagging, persistent irritation, or bleeding. Do not scrape until the tongue changes color or use sharp objects."),
    safety: l("El estudio tradicional de Danta Dhauti debe hacerse con una persona instructora cualificada; esta adaptación es higiene oral suave, no una limpieza médica ni un tratamiento. Sigue la guía dental y detente ante irritación o sangrado; no introduzcas utensilios en la garganta.", "Study the traditional Danta Dhauti context with a qualified instructor; this adaptation is gentle oral hygiene, not a medical cleanse or treatment. Follow dental guidance and stop for irritation or bleeding; do not insert tools into the throat."),
    relatedIds: ["kavala"],
  }),
  guidedKriya({
    id: "kavala",
    name: l("Kavala · enjuague bucal relacionado", "Kavala · related mouth rinse"),
    summary: l("Enjuague oral suave de tradición ayurvédica; no es uno de los seis ṣaṭkarmas.", "A gentle mouth rinse from an Ayurvedic context; not one of the six ṣaṭkarmas."),
    category: "Gentle related practice",
    level: "beginner",
    description: l("Kavala o Gandūṣa son términos usados en Ayurveda para prácticas de enjuague o retención oral, con variaciones entre escuelas. Se incluyen como práctica relacionada, no como un séptimo ṣaṭkarma ni como ‘detox’.", "Kavala or Gandūṣa are Ayurvedic terms for mouth-rinsing or holding practices, with variation across schools. They are included as related practices, not as a seventh ṣaṭkarma or a ‘detox.’"),
    objective: l("Explorar una pausa sencilla de higiene oral sin ingerir sustancias ni sustituir indicaciones dentales.", "Explore a simple oral-hygiene pause without ingesting substances or replacing dental advice."),
    materials: l("Un vaso de agua potable a temperatura cómoda y un lavabo. No se necesitan aceites, preparados ni ingredientes medicinales.", "A cup of drinking water at a comfortable temperature and a sink. Oils, medicinal preparations, and added ingredients are not needed."),
    preparation: l("Practica sentado o de pie con estabilidad. Omite el enjuague si tienes dificultades para tragar o controlar líquidos.", "Practice seated or standing steadily. Skip rinsing if you have difficulty swallowing or controlling liquids."),
    instructionSteps: {
      es: [
        "Usa una pequeña cantidad de agua potable y mantente sobre un lavabo.",
        "Mueve el agua suavemente dentro de la boca; no hagas gárgaras profundas ni retengas la respiración.",
        "Escúpela por completo y enjuaga el vaso o recipiente.",
        "No ingieras mezclas ni aceites como tratamiento y sigue la rutina oral indicada por tu dentista.",
        "Detente si toses, te atragantas, sientes náuseas o aparece irritación.",
      ],
      en: [
        "Use a small amount of drinking water and stay over a sink.",
        "Move the water gently around the mouth; do not gargle deeply or hold your breath.",
        "Spit it out completely and rinse the cup or container.",
        "Do not ingest mixtures or oils as treatment, and follow the oral-care routine advised by your dentist.",
        "Stop if you cough, choke, feel nauseated, or develop irritation.",
      ],
    },
    frequency: l("Opcional, no terapéutica; no hay una frecuencia necesaria para la práctica de yoga. No repitas si causa irritación o incomodidad.", "Optional and nontherapeutic; no frequency is required for yoga practice. Do not repeat if it causes irritation or discomfort."),
    benefits: l("Puede ofrecer una sensación breve de frescura oral. No se afirma que elimine toxinas, trate enfermedades bucales o mejore la digestión.", "May offer a brief feeling of oral freshness. It is not claimed to remove toxins, treat oral disease, or improve digestion."),
    risks: l("Existe riesgo de tos o aspiración si se retiene líquido, especialmente ante dificultades de deglución o control motor; algunos ingredientes pueden irritar la mucosa.", "There is a risk of coughing or aspiration if liquid is held, especially with swallowing or motor-control difficulties; some ingredients can irritate oral tissue."),
    contraindications: l("No practiques con disfagia, riesgo de aspiración, náusea activa, cirugía oral reciente, úlceras o dolor; consulta a un dentista si tienes una condición bucal. Embarazo, menstruación, hipertensión, hernia o cardiopatía no son contraindicaciones específicas para un enjuague suave con agua, pero considera tu comodidad y consulta si tienes dudas.", "Do not practice with dysphagia, aspiration risk, active nausea, recent oral surgery, ulcers, or pain; consult a dentist for an oral condition. Pregnancy, menstruation, hypertension, hernia, or heart disease are not specific contraindications to a gentle water rinse, but consider comfort and ask if unsure."),
    precautions: l("Señales para detenerse: tos, atragantamiento, falta de aire, irritación, náuseas o dolor. Escupe el agua y no reanudes hasta estar completamente cómodo.", "Stop signals: coughing, choking, shortness of breath, irritation, nausea, or pain. Spit out the water and do not resume until fully comfortable."),
    safety: l("Práctica oral relacionada y opcional, no uno de los ṣaṭkarmas ni una terapia. Aprende el contexto tradicional con una persona instructora cualificada. Usa solo agua potable, escúpela y evita retener líquido si hay dificultad para tragar. Es información educativa, no consejo médico o dental.", "Optional related oral practice, not one of the ṣaṭkarmas or a therapy. Learn its traditional context with a qualified instructor. Use only drinking water, spit it out, and avoid holding liquid if swallowing is difficult. This is educational information, not medical or dental advice."),
    relatedIds: ["danta-dhauti"],
  }),
];

import type { AyurvedaTopic, Field, Localized } from "@/lib/models";
import { l } from "@/lib/utils";
import { base, field } from "../shared";

type TopicInput = {
  id: string;
  nameEs: string;
  nameEn: string;
  summary: Localized;
  concept: Localized;
  tradition: Localized;
  reflection: Localized;
  fields: Field[];
  relatedIds?: string[];
  sequenceIds?: string[];
  tags?: string[];
};

const educationNotice = l(
  "Contenido educativo sobre ideas tradicionales; no sustituye la consulta médica ni debe usarse para prevenir, diagnosticar o tratar enfermedades. No suspendas medicación ni empieces dietas restrictivas, ayunos o suplementos por un dosha. Si tienes una condición, tomas medicación, estás embarazada o te preocupa un síntoma, consulta con un profesional sanitario cualificado.",
  "Educational content about traditional ideas, not medical advice. Do not use it to prevent, diagnose, or treat disease, or as a substitute for medical care. Do not stop medication or begin restrictive diets, fasting, or supplements based on a dosha. If you have a health condition, take medication, are pregnant, or are concerned about a symptom, consult a qualified healthcare professional.",
);

function textField(
  labelEs: string,
  labelEn: string,
  es: string,
  en: string,
  group: Field["group"] = "technique",
) {
  return field(labelEs, labelEn, l(es, en), group);
}

function listField(
  labelEs: string,
  labelEn: string,
  es: string[],
  en: string[],
  group: Field["group"] = "technique",
): Field {
  return { label: l(labelEs, labelEn), steps: { es, en }, group };
}

function topic(input: TopicInput): AyurvedaTopic {
  return {
    ...base(
      input.id,
      input.nameEs,
      input.nameEn,
      "Ayurveda",
      input.summary,
    ),
    kind: "ayurveda",
    concept: input.concept,
    tradition: input.tradition,
    reflection: input.reflection,
    fields: input.fields,
    relatedIds: input.relatedIds ?? [],
    sequenceIds: input.sequenceIds ?? [],
    tags: ["ayurveda", input.id, ...(input.tags ?? [])],
    safety: educationNotice,
  };
}

const elementList = listField(
  "Los cinco elementos y su lenguaje tradicional",
  "Five elements and their traditional language",
  [
    "Espacio (ākāśa): apertura y posibilidad de movimiento.",
    "Aire (vāyu): movimiento, ligereza y variabilidad.",
    "Fuego (agni/tejas): transformación y calor.",
    "Agua (jala): cohesión, fluidez y humedad.",
    "Tierra (pṛthvī): estructura, soporte y estabilidad.",
  ],
  [
    "Space (ākāśa): openness and room for movement.",
    "Air (vāyu): movement, lightness, and variability.",
    "Fire (agni/tejas): transformation and heat.",
    "Water (jala): cohesion, flow, and moisture.",
    "Earth (pṛthvī): structure, support, and stability.",
  ],
  "anatomy",
);

const doshaSummary = listField(
  "Combinaciones tradicionales de elementos",
  "Traditional element combinations",
  [
    "Vata reúne espacio y aire; se asocia con movimiento y cambio.",
    "Pitta reúne fuego y agua; se asocia con transformación y calor.",
    "Kapha reúne agua y tierra; se asocia con cohesión y estabilidad.",
  ],
  [
    "Vata combines space and air and is associated with movement and change.",
    "Pitta combines fire and water and is associated with transformation and heat.",
    "Kapha combines water and earth and is associated with cohesion and stability.",
  ],
  "anatomy",
);

export const ayurveda: AyurvedaTopic[] = [
  topic({
    id: "vata",
    nameEs: "Vata",
    nameEn: "Vata",
    summary: l(
      "En Ayurveda, Vata es el principio tradicional de movimiento, asociado con espacio y aire.",
      "In Ayurveda, Vata is the traditional principle of movement, associated with space and air.",
    ),
    concept: l(
      "Vata reúne ākāśa (espacio) y vāyu (aire). Se describe con cualidades móviles, ligeras, secas y frescas; estas palabras pertenecen al vocabulario ayurvédico y no describen un diagnóstico clínico.",
      "Vata combines ākāśa (space) and vāyu (air). It is described with mobile, light, dry, and cool qualities; these terms belong to Ayurvedic vocabulary and are not a clinical diagnosis.",
    ),
    tradition: l(
      "En textos y escuelas ayurvédicos, Vata expresa funciones de movimiento y comunicación. Las características individuales pueden mezclarse y las interpretaciones varían según la tradición.",
      "In Ayurvedic texts and schools, Vata expresses functions of movement and communication. Individual characteristics may overlap, and interpretations vary by tradition.",
    ),
    reflection: l(
      "¿Qué rutinas sencillas te ayudan a sentir continuidad y descanso, sin convertir una etiqueta de dosha en una regla?",
      "Which simple routines help you feel continuity and rest without turning a dosha label into a rule?",
    ),
    fields: [
      textField(
        "Cualidades y equilibrio en el marco tradicional",
        "Qualities and balance in the traditional framework",
        "Cuando se describe como equilibrado, Vata suele asociarse con adaptación, curiosidad y facilidad para iniciar movimiento. La tradición describe un exceso como mayor irregularidad, inquietud o sensación de sequedad/frío; no uses estas señales para identificar o tratar una enfermedad.",
        "When described as balanced, Vata is often associated with adaptability, curiosity, and ease of initiating movement. Traditional descriptions of excess include greater irregularity, restlessness, or a sense of dryness or cold; do not use these traits to identify or treat illness.",
        "benefits",
      ),
      textField(
        "Alimentación y hábitos cotidianos",
        "Food and everyday habits",
        "Como reflexión culinaria tradicional, puedes elegir comidas regulares y familiares, con preparaciones cocidas y húmedas si te resultan agradables. Mantén variedad nutricional, come según tu hambre y cultura, y bebe según la sed; no hace falta evitar alimentos ni seguir una dieta Vata.",
        "As a traditional culinary reflection, you might choose regular, familiar meals and cooked, moist preparations if they suit you. Keep nutritional variety, eat in response to your appetite and culture, and drink to thirst; there is no need to avoid foods or follow a Vata diet.",
        "teaching",
      ),
      textField(
        "Estaciones, yoga y respiración",
        "Seasons, yoga, and breathing",
        "Algunas escuelas prestan más atención a Vata en épocas frías, ventosas o cambiantes; el clima local importa más que el calendario. Prueba movimiento pausado, pausas y apoyo, como Hatha · Volver a las bases o Un espacio de quietud. Respiración completa o zumbido suave pueden ser opciones si son cómodas; no fuerces conteos.",
        "Some schools pay more attention to Vata in cold, windy, or changeable weather; local conditions matter more than the calendar. You might try measured movement, pauses, and support, such as Back to the foundations or A space for stillness. Full breathing or gentle humming may be options if comfortable; do not force counts.",
        "teaching",
      ),
      textField(
        "Uso responsable",
        "Responsible use",
        "Si un consejo alimentario o respiratorio causa malestar, no lo sigas. La variabilidad, el sueño o la digestión no determinan un dosha por sí solos; los síntomas persistentes requieren valoración clínica.",
        "If food or breathing advice causes discomfort, do not follow it. Variation, sleep, or digestion do not determine a dosha on their own; persistent symptoms need clinical assessment.",
        "safety",
      ),
    ],
    relatedIds: ["dirga-pranayama", "sama-vritti", "bhramari"],
    sequenceIds: ["hatha-foundations", "yin-stillness"],
    tags: ["vata dosha", "space", "air", "daily rhythm"],
  }),
  topic({
    id: "pitta",
    nameEs: "Pitta",
    nameEn: "Pitta",
    summary: l(
      "En Ayurveda, Pitta es el principio tradicional de transformación, asociado con fuego y agua.",
      "In Ayurveda, Pitta is the traditional principle of transformation, associated with fire and water.",
    ),
    concept: l(
      "Pitta reúne agni/tejas (fuego) y jala (agua). Se describe con cualidades cálidas, agudas y transformadoras; es un concepto tradicional, no una medida de metabolismo ni un diagnóstico.",
      "Pitta combines agni/tejas (fire) and jala (water). It is described with warm, sharp, and transformative qualities; it is a traditional concept, not a measure of metabolism or a diagnosis.",
    ),
    tradition: l(
      "La tradición vincula Pitta con transformación y discernimiento. Las cualidades descritas son metáforas de un sistema cultural y no determinan la personalidad ni la salud de una persona.",
      "The tradition links Pitta with transformation and discernment. Its described qualities are metaphors within a cultural system and do not determine anyone’s personality or health.",
    ),
    reflection: l(
      "¿Qué señales te recuerdan hacer una pausa y elegir un ritmo sostenible, en lugar de convertir cada práctica en un reto?",
      "What cues remind you to pause and choose a sustainable pace instead of turning every practice into a challenge?",
    ),
    fields: [
      textField(
        "Cualidades y equilibrio en el marco tradicional",
        "Qualities and balance in the traditional framework",
        "En descripciones tradicionales, Pitta equilibrado se asocia con claridad y organización. Un exceso se representa con irritación, intensidad o sensación de calor; no son criterios médicos ni pruebas de que exista un desequilibrio fisiológico.",
        "Traditional descriptions associate balanced Pitta with clarity and organization. Excess is portrayed through irritation, intensity, or a sense of heat; these are not medical criteria or proof of a physiological imbalance.",
        "benefits",
      ),
      textField(
        "Alimentación y hábitos cotidianos",
        "Food and everyday habits",
        "Si te sienta bien, combina sabores y alimentos variados y evita comer con prisa. Dentro del lenguaje ayurvédico se suele explorar comida menos picante y no demasiado caliente cuando el clima es caluroso; no elimines grupos de alimentos ni uses esto para tratar acidez, inflamación u otra condición.",
        "If it suits you, include varied foods and tastes and avoid rushing meals. In Ayurvedic language, people often explore less spicy and not overly hot food in hot weather; do not remove food groups or use this to treat reflux, inflammation, or another condition.",
        "teaching",
      ),
      textField(
        "Estaciones, yoga y respiración",
        "Seasons, yoga, and breathing",
        "Algunas tradiciones hacen ajustes durante épocas calurosas. Elige una práctica moderada, sin competencia ni sobrecalentamiento; Hatha · Volver a las bases y Yin · enraizar y soltar ofrecen ritmo regulable. Exhalación cómoda o Sitali/Sitkari pueden estudiarse sin retenciones; evita enfriar la respiración si te resulta incómodo.",
        "Some traditions adjust routines during hot weather. Choose moderate practice without competition or overheating; Back to the foundations and Yin · ground and release allow a measured pace. A comfortable exhale or Sitali/Sitkari may be explored without breath holds; skip cooling breath if it feels uncomfortable.",
        "teaching",
      ),
      textField(
        "Uso responsable",
        "Responsible use",
        "No busques señales de Pitta en una emoción o síntoma aislado. Si tienes intolerancia al calor, mareo, síntomas digestivos o una condición que afecte la respiración, adapta la actividad y consulta a un profesional sanitario.",
        "Do not infer Pitta from a single emotion or symptom. If you have heat intolerance, dizziness, digestive symptoms, or a condition affecting breathing, adapt activity and consult a healthcare professional.",
        "safety",
      ),
    ],
    relatedIds: ["extended-exhale", "sitali", "sitkari"],
    sequenceIds: ["hatha-foundations", "yin-grounding"],
    tags: ["pitta dosha", "fire", "water", "seasonal routine"],
  }),
  topic({
    id: "kapha",
    nameEs: "Kapha",
    nameEn: "Kapha",
    summary: l(
      "En Ayurveda, Kapha es el principio tradicional de cohesión y estabilidad, asociado con agua y tierra.",
      "In Ayurveda, Kapha is the traditional principle of cohesion and stability, associated with water and earth.",
    ),
    concept: l(
      "Kapha reúne jala (agua) y pṛthvī (tierra). Se describe con cualidades estables, pesadas, suaves y frescas; estos términos pertenecen a la teoría ayurvédica y no son categorías biomédicas.",
      "Kapha combines jala (water) and pṛthvī (earth). It is described with stable, heavy, smooth, and cool qualities; these terms belong to Ayurvedic theory and are not biomedical categories.",
    ),
    tradition: l(
      "En la tradición, Kapha se asocia con soporte, cohesión y continuidad. Una persona puede mostrar cualidades atribuidas a más de un dosha, y estas no sustituyen una evaluación de salud.",
      "In the tradition, Kapha is associated with support, cohesion, and continuity. A person may show qualities attributed to more than one dosha, and these do not replace a health assessment.",
    ),
    reflection: l(
      "¿Qué movimiento amable y constante te resulta agradable, sin convertir la actividad en una obligación o una forma de compensar la comida?",
      "What kind of gentle, steady movement feels enjoyable without turning activity into an obligation or a way to compensate for food?",
    ),
    fields: [
      textField(
        "Cualidades y equilibrio en el marco tradicional",
        "Qualities and balance in the traditional framework",
        "Kapha equilibrado suele asociarse en textos introductorios con paciencia, constancia y sensación de apoyo. Un exceso se describe como mayor pesadez o dificultad para iniciar cambios; son imágenes tradicionales, no diagnósticos de energía, peso o salud mental.",
        "Introductory descriptions often associate balanced Kapha with patience, consistency, and support. Excess may be described as greater heaviness or difficulty initiating change; these are traditional images, not diagnoses of energy, weight, or mental health.",
        "benefits",
      ),
      textField(
        "Alimentación y hábitos cotidianos",
        "Food and everyday habits",
        "Prioriza comidas variadas y suficientes que se adapten a tu cultura, presupuesto y necesidades. En la tradición se exploran preparaciones calientes y sabores intensos, amargos o astringentes; especias y cambios alimentarios pueden no convenir a todas las personas. No ayunes ni restrinjas alimentos por tu dosha.",
        "Choose varied, adequate meals that fit your culture, budget, and needs. Traditional teaching explores warm preparations and pungent, bitter, or astringent tastes; spices and food changes may not suit everyone. Do not fast or restrict food based on your dosha.",
        "teaching",
      ),
      textField(
        "Estaciones, yoga y respiración",
        "Seasons, yoga, and breathing",
        "Algunas escuelas prestan atención a Kapha en épocas frescas, húmedas o de transición a la primavera. Si te sienta bien, prueba movimiento algo más dinámico y pausas suficientes; Hatha · equilibrio y alineación o Surya Namaskar A breve son opciones ajustables. Ujjayi suave puede acompañar el movimiento; omite cualquier respiración forzada.",
        "Some schools pay attention to Kapha in cool, damp, or early spring weather. If it feels good, try somewhat more dynamic movement with adequate pauses; Hatha · balance and alignment or the brief Surya Namaskar A are adjustable options. Gentle Ujjayi may accompany movement; skip any forceful breathing.",
        "teaching",
      ),
      textField(
        "Uso responsable",
        "Responsible use",
        "No infieras un dosha a partir del tamaño corporal, somnolencia o estado de ánimo. Aumenta la actividad gradualmente y busca orientación clínica ante fatiga persistente, cambios de peso involuntarios o síntomas nuevos.",
        "Do not infer a dosha from body size, sleepiness, or mood. Increase activity gradually and seek clinical guidance for persistent fatigue, unintentional weight change, or new symptoms.",
        "safety",
      ),
    ],
    relatedIds: ["ujjayi", "sama-vritti", "bhramari"],
    sequenceIds: ["hatha-steady-flow", "surya-a"],
    tags: ["kapha dosha", "earth", "water", "movement"],
  }),
  topic({
    id: "prakriti",
    nameEs: "Prakriti y los cinco elementos",
    nameEn: "Prakriti and the five elements",
    summary: l(
      "Prakriti es una idea tradicional de constitución; los elementos son un lenguaje filosófico para describir cualidades.",
      "Prakriti is a traditional idea of constitution; the elements are a philosophical language for describing qualities.",
    ),
    concept: l(
      "En Ayurveda, los cinco mahābhūtas (elementos) se usan como principios interpretativos. Sus combinaciones forman el lenguaje tradicional de Vata, Pitta y Kapha; no corresponden literalmente a elementos químicos dentro del cuerpo.",
      "In Ayurveda, the five mahābhūtas (elements) are used as interpretive principles. Their combinations form the traditional language of Vata, Pitta, and Kapha; they are not literal chemical elements inside the body.",
    ),
    tradition: l(
      "Prakriti suele referirse a la constitución descrita en un marco ayurvédico. Las escuelas pueden diferir en cómo la interpretan; una ficha digital no puede establecerla de forma clínica o definitiva.",
      "Prakriti usually refers to constitution as described within an Ayurvedic framework. Schools may differ in interpretation; a digital entry cannot establish it clinically or definitively.",
    ),
    reflection: l(
      "¿Qué cualidades notas en tus preferencias sin tratarlas como rasgos fijos o como una explicación de tu salud?",
      "Which qualities do you notice in your preferences without treating them as fixed traits or explanations of your health?",
    ),
    fields: [
      elementList,
      doshaSummary,
      textField(
        "Constitución mixta y variación",
        "Mixed patterns and variation",
        "Las descripciones tradicionales permiten combinaciones y matices; no todas las personas encajan en un tipo único. La cultura, edad, entorno, experiencia y el método de valoración influyen en cómo se cuentan estas cualidades.",
        "Traditional descriptions allow combinations and nuance; not everyone fits one type. Culture, age, environment, experience, and assessment method influence how these qualities are described.",
        "teaching",
      ),
      textField(
        "Límite de interpretación",
        "Limits of interpretation",
        "El cuestionario de esta sección es una actividad breve de reflexión y no determina Prakriti ni Vikriti. No uses una puntuación para explicar síntomas, elegir medicamentos o cambiar un tratamiento.",
        "The short questionnaire in this section is a reflection activity and does not determine Prakriti or Vikriti. Do not use a score to explain symptoms, choose remedies, or change treatment.",
        "safety",
      ),
    ],
    relatedIds: ["vata", "pitta", "kapha"],
    tags: ["prakriti", "five elements", "dosha", "tradition"],
  }),
  topic({
    id: "vikriti",
    nameEs: "Vikriti y cambio cotidiano",
    nameEn: "Vikriti and everyday change",
    summary: l(
      "Vikriti describe, en el marco tradicional, un estado presente que puede diferir de la constitución llamada Prakriti.",
      "Vikriti describes, within the traditional framework, a current state that may differ from the constitution called Prakriti.",
    ),
    concept: l(
      "Algunas escuelas usan Vikriti para hablar de cualidades que parecen predominantes en el momento y Prakriti para hablar de una constitución de base. Esta distinción es parte del pensamiento ayurvédico, no un método biomédico para detectar desequilibrios.",
      "Some schools use Vikriti for qualities that seem prominent in the moment and Prakriti for a baseline constitution. This distinction belongs to Ayurvedic thought; it is not a biomedical method for detecting imbalance.",
    ),
    tradition: l(
      "La lectura de estado actual puede variar entre practicantes y tradiciones. Este material no asigna puntuaciones diagnósticas ni recomienda tratamientos ayurvédicos.",
      "Interpretations of current state vary among practitioners and traditions. This material assigns no diagnostic scores and recommends no Ayurvedic treatments.",
    ),
    reflection: l(
      "¿Qué cambios de rutina o de entorno has notado, y cuáles puedes observar sin etiquetarlos como enfermedad?",
      "What changes in routine or surroundings have you noticed, and which can you observe without labeling them as illness?",
    ),
    fields: [
      textField(
        "Una práctica de observación neutral",
        "A neutral observation practice",
        "Durante una semana, anota de manera opcional sueño, comidas, movimiento y estado de ánimo con palabras neutrales. Busca patrones útiles para conversar con tu profesional de salud; no atribuyas cambios a un dosha ni sustituyas una consulta.",
        "For one week, optionally note sleep, meals, movement, and mood in neutral language. Look for patterns that may help you talk with a healthcare professional; do not attribute changes to a dosha or replace an appointment.",
        "teaching",
      ),
      textField(
        "Cuándo pedir ayuda",
        "When to seek help",
        "Síntomas nuevos, intensos o persistentes merecen valoración sanitaria. No esperes a completar una rutina ni a corregir un dosha antes de pedir ayuda.",
        "New, severe, or persistent symptoms warrant clinical assessment. Do not wait to complete a routine or correct a dosha before seeking help.",
        "safety",
      ),
    ],
    relatedIds: ["prakriti", "dinacharya"],
    tags: ["vikriti", "self-reflection", "health boundaries"],
  }),
  topic({
    id: "agni",
    nameEs: "Agni y hábitos digestivos",
    nameEn: "Agni and eating habits",
    summary: l(
      "Agni es una metáfora central en el lenguaje ayurvédico sobre digestión y transformación; no es un órgano ni una prueba clínica.",
      "Agni is a central metaphor in Ayurvedic language about digestion and transformation; it is not an organ or a clinical test.",
    ),
    concept: l(
      "Agni significa fuego y se usa tradicionalmente para conversar sobre digestión, apetito y transformación. Las clasificaciones de Agni varían por fuente; ninguna puede confirmar por sí sola cómo funciona tu aparato digestivo.",
      "Agni means fire and is traditionally used to discuss digestion, appetite, and transformation. Agni classifications vary by source; none can confirm how your digestive system functions.",
    ),
    tradition: l(
      "En lugar de una medición biomédica, Agni es un modelo interpretativo del Ayurveda. Se presenta aquí para estudiar vocabulario cultural, sin prometer efectos fisiológicos.",
      "Rather than a biomedical measurement, Agni is an interpretive model in Ayurveda. It is presented here to study cultural vocabulary, without promising physiological effects.",
    ),
    reflection: l(
      "¿Qué condiciones te permiten comer con calma y reconocer hambre y saciedad sin reglas rígidas?",
      "What helps you eat calmly and notice hunger and fullness without rigid rules?",
    ),
    fields: [
      listField(
        "Hábitos amables alrededor de las comidas",
        "Gentle habits around meals",
        [
          "Si es posible, reserva tiempo suficiente para comer sentado y sin prisa.",
          "Mastica a un ritmo cómodo y elige porciones que se ajusten a tus necesidades.",
          "Bebe según la sed y tus indicaciones clínicas; no es necesario forzar agua caliente ni cantidades fijas.",
          "Respeta horarios flexibles y tus preferencias culturales; no conviertas la rutina en una norma moral.",
        ],
        [
          "When possible, allow enough time to sit and eat without rushing.",
          "Chew at a comfortable pace and choose portions that fit your needs.",
          "Drink to thirst and follow clinical advice; there is no need to force hot water or fixed amounts.",
          "Respect flexible schedules and cultural preferences; do not turn routine into a moral rule.",
        ],
        "teaching",
      ),
      textField(
        "Síntomas digestivos",
        "Digestive symptoms",
        "Dolor frecuente, dificultad para tragar, vómitos, sangre, pérdida de peso involuntaria o cambios intestinales persistentes requieren evaluación médica. No intentes corregirlos con ayuno, hierbas o una lectura de Agni.",
        "Frequent pain, difficulty swallowing, vomiting, blood, unintentional weight loss, or persistent bowel changes require medical assessment. Do not try to correct them with fasting, herbs, or an Agni interpretation.",
        "safety",
      ),
    ],
    relatedIds: ["food", "six-tastes", "simple-recipes"],
    tags: ["agni", "digestion", "meals", "eating habits"],
  }),
  topic({
    id: "ama",
    nameEs: "Ama como concepto tradicional",
    nameEn: "Ama as a traditional concept",
    summary: l(
      "Ama es un término clásico ayurvédico con distintos usos; no equivale a toxinas identificables por una prueba médica.",
      "Ama is a classical Ayurvedic term with different uses; it is not equivalent to toxins identifiable by a medical test.",
    ),
    concept: l(
      "Algunas fuentes ayurvédicas usan Ama para hablar de residuos o procesos digestivos incompletos dentro de su teoría. No es una sustancia única que pueda diagnosticarse o eliminarse con una limpieza.",
      "Some Ayurvedic sources use Ama to discuss residue or incomplete digestion within their theory. It is not one substance that can be diagnosed or removed with a cleanse.",
    ),
    tradition: l(
      "El término y su interpretación cambian entre textos y escuelas. La medicina moderna no confirma un “Ama” universal que requiera detox; el cuerpo gestiona desechos por sus órganos y sistemas fisiológicos.",
      "The term and its interpretation vary among texts and schools. Modern medicine does not establish a universal “Ama” that requires detox; the body handles waste through its physiological organs and systems.",
    ),
    reflection: l(
      "¿Cómo puedes estudiar un concepto tradicional con curiosidad, sin convertirlo en una explicación médica?",
      "How can you study a traditional concept with curiosity without turning it into a medical explanation?",
    ),
    fields: [
      textField(
        "Qué evitar",
        "What to avoid",
        "Evita ayunos, laxantes, purgas, suplementos o dietas “detox” para eliminar Ama. Pueden causar efectos adversos e interacciones. Si te preocupa una exposición o un síntoma, consulta a un profesional sanitario.",
        "Avoid fasting, laxatives, purges, supplements, or “detox” diets to remove Ama. They can cause adverse effects and interactions. If you are concerned about an exposure or symptom, consult a healthcare professional.",
        "safety",
      ),
      textField(
        "Relación con el autocuidado",
        "Connection with self-care",
        "Puedes usar la ficha para conocer una idea histórica y optar por hábitos ordinarios como comidas variadas, descanso y movimiento que te resulte agradable; estos hábitos no son una limpieza ni una promesa de prevenir enfermedades.",
        "Use this entry to learn a historical idea and choose ordinary habits such as varied meals, rest, and enjoyable movement; these habits are not a cleanse or a promise to prevent illness.",
        "teaching",
      ),
    ],
    relatedIds: ["agni", "food", "simple-recipes"],
    tags: ["ama", "traditional vocabulary", "detox caution"],
  }),
  topic({
    id: "gunas",
    nameEs: "Gunas",
    nameEn: "Gunas",
    summary: l(
      "Sattva, rajas y tamas son cualidades de tradiciones filosóficas indias, distintas de los tres doshas.",
      "Sattva, rajas, and tamas are qualities in Indian philosophical traditions, distinct from the three doshas.",
    ),
    concept: l(
      "En varios marcos filosóficos, sattva se asocia con claridad, rajas con actividad y tamas con inercia. Ayurveda y otras tradiciones los interpretan de maneras diversas; no son diagnósticos ni una jerarquía del valor de las personas.",
      "In several philosophical frameworks, sattva is associated with clarity, rajas with activity, and tamas with inertia. Ayurveda and other traditions interpret them in different ways; they are not diagnoses or a ranking of people's worth.",
    ),
    tradition: l(
      "Los gunas pertenecen a un lenguaje filosófico más amplio y no deben confundirse con Vata, Pitta y Kapha. La relación entre ambos marcos depende de la escuela y del texto.",
      "The gunas belong to a broader philosophical vocabulary and should not be confused with Vata, Pitta, and Kapha. Relationships between these frameworks depend on the school and text.",
    ),
    reflection: l(
      "¿Qué cualidades reconoces en tu día de hoy sin etiquetarte como una persona de un solo tipo?",
      "Which qualities do you notice in your day today without labeling yourself as one fixed type?",
    ),
    fields: [
      listField(
        "Una lectura flexible",
        "A flexible reading",
        [
          "Sattva: claridad, equilibrio o atención en ciertos textos.",
          "Rajas: actividad, impulso o movimiento en ciertos textos.",
          "Tamas: descanso, estabilidad o inercia según el contexto del texto.",
          "Las tres pueden describir estados cambiantes; ninguna define por completo una persona.",
        ],
        [
          "Sattva: clarity, balance, or attentiveness in some texts.",
          "Rajas: activity, drive, or movement in some texts.",
          "Tamas: rest, stability, or inertia depending on the text and context.",
          "All three may describe changing states; none fully defines a person.",
        ],
        "teaching",
      ),
    ],
    relatedIds: ["prakriti", "vikriti", "breath-awareness"],
    tags: ["sattva", "rajas", "tamas", "philosophy"],
  }),
  topic({
    id: "dinacharya",
    nameEs: "Dinacharya: rutina diaria flexible",
    nameEn: "Dinacharya: a flexible daily rhythm",
    summary: l(
      "Dinacharya nombra rutinas cotidianas en Ayurveda; aquí se presenta como una invitación adaptable, no como horario obligatorio.",
      "Dinacharya names daily routines in Ayurveda; here it is offered as an adaptable invitation, not a mandatory schedule.",
    ),
    concept: l(
      "Dinacharya significa rutina o régimen diario. Las prácticas descritas varían entre fuentes; el sueño, el trabajo, la cultura, el acceso a alimentos y las necesidades de salud deben guiar cualquier adaptación.",
      "Dinacharya means a daily routine or regimen. Practices differ across sources; sleep, work, culture, food access, and health needs should guide any adaptation.",
    ),
    tradition: l(
      "Las rutinas ayurvédicas se han enseñado como parte del autocuidado tradicional. Esta ficha selecciona hábitos cotidianos de bajo riesgo y no prescribe prácticas de limpieza ni procedimientos corporales.",
      "Ayurvedic routines have been taught as part of traditional self-care. This entry selects low-risk everyday habits and does not prescribe cleansing practices or bodily procedures.",
    ),
    reflection: l(
      "¿Qué pequeño hábito te aporta continuidad y puedes adaptar a tu vida real esta semana?",
      "What small habit brings continuity and can you realistically adapt this week?",
    ),
    fields: [
      listField(
        "Ideas para una rutina posible",
        "Ideas for a workable routine",
        [
          "Al despertar, busca luz natural y un momento tranquilo si tu horario y entorno lo permiten.",
          "Mantén higiene oral cotidiana con cepillo e hilo dental según la recomendación de tu profesional dental.",
          "Incluye comidas suficientes y variadas, y una pausa de movimiento que disfrutes.",
          "Reserva un cierre gradual del día y una oportunidad regular de descanso acorde con tu edad y necesidades.",
          "Si trabajas por turnos, cuidas a alguien o tienes una condición, adapta la secuencia; no hace falta seguir un horario solar rígido.",
        ],
        [
          "On waking, seek natural light and a quiet moment if your schedule and setting allow.",
          "Keep everyday oral care with brushing and flossing as advised by your dental professional.",
          "Include adequate, varied meals and a movement break you enjoy.",
          "Allow a gradual end to the day and a regular opportunity for rest that fits your age and needs.",
          "If you work shifts, care for someone, or have a health condition, adapt the sequence; a rigid sunrise schedule is not required.",
        ],
        "teaching",
      ),
      textField(
        "Práctica sin perfeccionismo",
        "Practice without perfectionism",
        "Empieza con una acción pequeña y evalúa si te facilita el día. No uses una rutina para retrasar atención médica, dormir menos o sentir culpa por las circunstancias que no puedes controlar.",
        "Begin with one small action and notice whether it makes your day easier. Do not use routine to delay medical care, sleep less, or feel guilty about circumstances you cannot control.",
        "safety",
      ),
    ],
    relatedIds: ["prakriti", "vikriti"],
    sequenceIds: ["hatha-foundations"],
    tags: ["dinacharya", "daily routine", "sleep", "self-care"],
  }),
  topic({
    id: "food",
    nameEs: "Alimentación: seis sabores y digestión",
    nameEn: "Food: six tastes and digestion",
    summary: l(
      "La teoría ayurvédica de los seis sabores puede estudiarse junto a hábitos de alimentación flexibles y culturalmente propios.",
      "Ayurvedic teaching on six tastes can be studied alongside flexible, culturally grounded eating habits.",
    ),
    concept: l(
      "Ṣaḍrasa (seis sabores) es una clasificación tradicional: dulce, ácido, salado, picante, amargo y astringente. Las listas alimentarias cambian por cultura y preparación; ningún sabor es obligatorio ni cura una condición.",
      "Ṣaḍrasa (six tastes) is a traditional classification: sweet, sour, salty, pungent, bitter, and astringent. Food examples vary by culture and preparation; no taste is compulsory or a cure.",
    ),
    tradition: l(
      "La tradición relaciona los sabores con cualidades y doshas. Estas asociaciones no sustituyen guías de nutrición basadas en salud, preferencias, alergias, presupuesto o cultura alimentaria.",
      "Tradition relates tastes to qualities and doshas. These associations do not replace nutrition guidance based on health, preferences, allergies, budget, or food culture.",
    ),
    reflection: l(
      "¿Qué alimentos variados y accesibles disfrutas, y cómo puedes comerlos con menos prisa y menos reglas?",
      "Which varied, accessible foods do you enjoy, and how could you eat them with less rush and fewer rules?",
    ),
    fields: [
      listField(
        "Los seis sabores y ejemplos cotidianos",
        "Six tastes and everyday examples",
        [
          "Dulce: arroz, avena, frutas maduras o algunos tubérculos; no significa que debas añadir azúcar.",
          "Ácido: cítricos, yogur o alimentos fermentados, si forman parte de tu alimentación y los toleras.",
          "Salado: sal y algunos alimentos salados; la cantidad debe seguir tus necesidades y orientación clínica.",
          "Picante: jengibre, pimienta o chile usados como condimentos; omítelos si te irritan.",
          "Amargo: algunas hojas verdes y verduras; el sabor depende de variedad y preparación.",
          "Astringente: legumbres, té o algunas frutas; describe una sensación de sequedad en la boca, no un nutriente.",
        ],
        [
          "Sweet: rice, oats, ripe fruit, or some root vegetables; it does not mean you need to add sugar.",
          "Sour: citrus, yogurt, or fermented foods if they fit your diet and you tolerate them.",
          "Salty: salt and some savory foods; amounts should fit your needs and clinical guidance.",
          "Pungent: ginger, pepper, or chili used as seasonings; leave them out if irritating.",
          "Bitter: some leafy greens and vegetables; the taste varies with the plant and preparation.",
          "Astringent: legumes, tea, or some fruits; it describes a drying mouthfeel, not a nutrient.",
        ],
        "anatomy",
      ),
      listField(
        "Hábitos digestivos generales",
        "General eating habits",
        [
          "Busca variedad a lo largo del tiempo, no una lista perfecta de sabores en cada comida.",
          "Si te ayuda, siéntate y come a un ritmo cómodo; adapta la textura y el tamaño de porción a tus necesidades.",
          "Respeta alergias, intolerancias, preferencias religiosas, cultura, presupuesto y consejos médicos.",
          "No necesitas separar alimentos, tomar infusiones específicas ni esperar un intervalo fijo para beber.",
        ],
        [
          "Aim for variety over time, not a perfect checklist of tastes at every meal.",
          "If helpful, sit and eat at a comfortable pace; adapt texture and portion size to your needs.",
          "Respect allergies, intolerances, religious preferences, culture, budget, and medical advice.",
          "You do not need to combine foods in a special way, drink a particular infusion, or wait a fixed interval before drinking.",
        ],
        "teaching",
      ),
      textField(
        "Alimentación segura",
        "Food safety",
        "Lava productos frescos, cocina alimentos de riesgo hasta que estén bien hechos y refrigera sobras con prontitud. Si tienes alergias, embarazo, enfermedad crónica o necesidades nutricionales especiales, sigue las indicaciones de tu equipo sanitario.",
        "Wash fresh produce, cook higher-risk foods thoroughly, and refrigerate leftovers promptly. If you have allergies, are pregnant, live with a chronic condition, or have specific nutrition needs, follow your healthcare team's guidance.",
        "safety",
      ),
    ],
    relatedIds: ["agni", "simple-recipes", "six-tastes"],
    tags: ["six tastes", "food", "nutrition", "digestive habits"],
  }),
  topic({
    id: "seasons",
    nameEs: "Ritucharya: rutinas estacionales",
    nameEn: "Ritucharya: seasonal rhythms",
    summary: l(
      "Ritucharya propone observar los cambios de estación; las adaptaciones deben seguir el clima local y las necesidades reales.",
      "Ritucharya proposes noticing seasonal changes; adaptations should follow local weather and real needs.",
    ),
    concept: l(
      "Ritucharya significa régimen estacional en Ayurveda. Las seis estaciones descritas en algunos textos corresponden a contextos geográficos específicos; no se trasladan de forma exacta a todos los climas o hemisferios.",
      "Ritucharya means seasonal regimen in Ayurveda. The six seasons described in some texts reflect particular geographic contexts and do not map exactly to every climate or hemisphere.",
    ),
    tradition: l(
      "En la enseñanza tradicional se relacionan épocas del año con cambios de cualidad. Aquí se ofrecen observaciones de bajo riesgo, no prescripciones para prevenir o tratar enfermedades.",
      "Traditional teaching relates parts of the year to changing qualities. This entry offers low-risk observations, not prescriptions to prevent or treat illness.",
    ),
    reflection: l(
      "¿Qué cambio local de luz, temperatura o actividad notas, y qué ajuste pequeño te resultaría cómodo?",
      "What local change in daylight, temperature, or activity do you notice, and what small adjustment would feel comfortable?",
    ),
    fields: [
      listField(
        "Ajustes sencillos por condiciones del clima",
        "Simple adjustments for local conditions",
        [
          "Con frío o viento: usa capas cómodas y calienta gradualmente antes de moverte.",
          "Con calor: reduce intensidad, busca sombra y toma pausas; sigue orientación sanitaria sobre hidratación.",
          "Con humedad o lluvia: adapta el movimiento al suelo y al calzado para evitar resbalones.",
          "Durante transiciones: conserva horarios de descanso razonables y ajusta la actividad a cómo te sientes.",
          "Elige productos de temporada si son accesibles, agradables y compatibles con tus necesidades; no hagas cambios drásticos por un calendario dosha.",
        ],
        [
          "In cold or windy weather: use comfortable layers and warm up gradually before moving.",
          "In heat: reduce intensity, seek shade, and take breaks; follow clinical guidance about hydration.",
          "In damp or rainy weather: adapt movement and footwear to avoid slipping.",
          "During transitions: keep reasonable rest routines and adjust activity to how you feel.",
          "Choose seasonal produce when accessible, enjoyable, and suited to your needs; do not make drastic changes from a dosha calendar.",
        ],
        "teaching",
      ),
      textField(
        "Estaciones en la teoría de doshas",
        "Seasons in dosha theory",
        "Algunas escuelas vinculan Vata con frío y viento, Pitta con calor y Kapha con frío húmedo o primavera. Estas asociaciones varían por texto y lugar; observa el clima real, no una estación importada de otra región.",
        "Some schools associate Vata with cold and wind, Pitta with heat, and Kapha with cool damp weather or spring. These associations vary by text and place; observe actual weather rather than importing another region's season.",
        "anatomy",
      ),
    ],
    relatedIds: ["vata", "pitta", "kapha", "dinacharya"],
    tags: ["ritucharya", "seasons", "climate", "adaptation"],
  }),
  topic({
    id: "yoga-ayurveda",
    nameEs: "Yoga y Ayurveda: una relación flexible",
    nameEn: "Yoga and Ayurveda: a flexible relationship",
    summary: l(
      "Las tradiciones de Yoga y Ayurveda comparten contextos históricos, pero una categoría de dosha no prescribe una práctica única.",
      "Yoga and Ayurveda share historical contexts, but a dosha category does not prescribe one fixed practice.",
    ),
    concept: l(
      "Una lectura ayurvédica puede invitar a ajustar ritmo, temperatura, apoyo y descanso. La práctica de yoga debe elegirse según experiencia, preferencias, condiciones de salud y seguridad, no solo según un resultado de cuestionario.",
      "An Ayurvedic lens may invite adjustments to pace, temperature, support, and rest. Yoga should be chosen for experience, preferences, health conditions, and safety—not only from a questionnaire result.",
    ),
    tradition: l(
      "Los vínculos entre Yoga y Ayurveda se explican de maneras distintas en escuelas modernas y textos tradicionales. Las sugerencias de esta biblioteca son opciones de práctica, no tratamientos personalizados.",
      "Links between Yoga and Ayurveda are explained differently across modern schools and traditional texts. Suggestions in this library are practice options, not personalized treatment.",
    ),
    reflection: l(
      "¿Qué intensidad, duración y tipo de apoyo te permiten practicar con respiración cómoda hoy?",
      "What intensity, duration, and support let you practice with comfortable breathing today?",
    ),
    fields: [
      textField(
        "Elige por contexto, no por etiqueta",
        "Choose by context, not by label",
        "Usa nivel, experiencia, descanso, entorno y sensaciones para seleccionar una secuencia. Puedes descansar, modificar o parar en cualquier momento. El cuestionario de dosha no reemplaza una evaluación de movilidad ni de salud.",
        "Use level, experience, rest, surroundings, and sensation to choose a sequence. You may rest, modify, or stop at any time. The dosha questionnaire does not replace a mobility or health assessment.",
        "teaching",
      ),
      listField(
        "Opciones suaves para explorar",
        "Gentle options to explore",
        [
          "Para una práctica tranquila: Hatha · Volver a las bases (`hatha-foundations`) o Yin · Un espacio de quietud (`yin-stillness`).",
          "Para una práctica de ritmo moderado: Hatha · equilibrio y alineación (`hatha-steady-flow`).",
          "Respiración guiada sin retención: Respiración completa (`dirga-pranayama`), exhalación extendida (`extended-exhale`) o respiración equilibrada (`sama-vritti`).",
          "Sitali, Sitkari, Ujjayi y Bhramari son opciones tradicionales distintas; consulta sus fichas y detente si aparece incomodidad.",
        ],
        [
          "For a quiet practice: Back to the foundations (`hatha-foundations`) or A space for stillness (`yin-stillness`).",
          "For a moderate pace: Hatha · balance and alignment (`hatha-steady-flow`).",
          "Guided breathing without holds: Full breathing (`dirga-pranayama`), extended exhale (`extended-exhale`), or equal breathing (`sama-vritti`).",
          "Sitali, Sitkari, Ujjayi, and Bhramari are distinct traditional options; read their entries and stop if discomfort appears.",
        ],
        "teaching",
      ),
      textField(
        "Precaución con la respiración",
        "Breathing precautions",
        "Elige respiración natural o una técnica suave. No empieces respiración rápida ni retenciones por un dosha; las técnicas intensas o con pausas tienen precauciones específicas y pueden requerir supervisión docente y valoración sanitaria.",
        "Choose natural breathing or a gentle technique. Do not begin fast breathing or breath holds because of a dosha; forceful techniques and holds have specific precautions and may require teacher supervision and clinical advice.",
        "safety",
      ),
    ],
    relatedIds: [
      "dirga-pranayama",
      "extended-exhale",
      "sama-vritti",
      "sitali",
      "sitkari",
      "ujjayi",
      "bhramari",
    ],
    sequenceIds: [
      "hatha-foundations",
      "yin-stillness",
      "hatha-steady-flow",
    ],
    tags: ["yoga", "sequence", "pranayama", "self-regulation"],
  }),
  topic({
    id: "six-tastes",
    nameEs: "Ṣaḍrasa: los seis sabores",
    nameEn: "Ṣaḍrasa: the six tastes",
    summary: l(
      "Una ficha de consulta sobre los seis sabores del Ayurveda y sus ejemplos en alimentos cotidianos.",
      "A reference to Ayurveda's six tastes and their everyday food examples.",
    ),
    concept: l(
      "Los seis rasas son dulce, ácido, salado, picante, amargo y astringente. La clasificación explica una teoría tradicional del gusto; no es una guía de nutrientes ni un plan alimentario clínico.",
      "The six rasas are sweet, sour, salty, pungent, bitter, and astringent. This classification explains a traditional theory of taste; it is not a nutrient guide or clinical meal plan.",
    ),
    tradition: l(
      "Las fuentes clásicas asignan cualidades a cada sabor y los relacionan con doshas. La traducción de ejemplos depende de alimentos locales, preparación y contexto cultural.",
      "Classical sources assign qualities to each taste and relate them to doshas. Examples depend on local foods, preparation, and cultural context.",
    ),
    reflection: l(
      "¿Qué sabores disfrutas y cuáles aparecen naturalmente en los alimentos que ya forman parte de tu vida?",
      "Which tastes do you enjoy, and which naturally appear in the foods already part of your life?",
    ),
    fields: [
      listField(
        "Sabores y ejemplos",
        "Tastes and examples",
        [
          "Dulce: avena, arroz, frutas maduras y verduras naturalmente dulces.",
          "Ácido: limón, naranja, yogur o alimentos fermentados tolerados.",
          "Salado: sal y alimentos condimentados con sal; modera según indicación clínica.",
          "Picante: pimienta, jengibre, ajo o chile como condimentos opcionales.",
          "Amargo: rúcula, algunas hojas verdes y ciertas verduras.",
          "Astringente: lentejas, frijoles, té y algunas frutas como la granada.",
        ],
        [
          "Sweet: oats, rice, ripe fruit, and naturally sweet vegetables.",
          "Sour: lemon, orange, yogurt, or tolerated fermented foods.",
          "Salty: salt and foods seasoned with salt; moderate it as clinically advised.",
          "Pungent: pepper, ginger, garlic, or chili as optional seasonings.",
          "Bitter: arugula, some leafy greens, and certain vegetables.",
          "Astringent: lentils, beans, tea, and some fruit such as pomegranate.",
        ],
        "anatomy",
      ),
      textField(
        "Un principio flexible",
        "A flexible principle",
        "No necesitas incluir los seis sabores en cada comida. Considera disponibilidad, alergias, condiciones médicas y placer; saborizar no es una obligación terapéutica.",
        "You do not need all six tastes at every meal. Consider availability, allergies, medical conditions, and enjoyment; flavor is not a therapeutic requirement.",
        "teaching",
      ),
    ],
    relatedIds: ["food", "simple-recipes"],
    tags: ["rasa", "six tastes", "food", "reference"],
  }),
  topic({
    id: "simple-recipes",
    nameEs: "Recetas cotidianas sencillas",
    nameEn: "Simple everyday recipes",
    summary: l(
      "Ideas sencillas de comida casera inspiradas en ingredientes comunes, sin atribuirles efectos médicos.",
      "Simple home-food ideas using common ingredients, without assigning medical effects.",
    ),
    concept: l(
      "Estas recetas son ejemplos culinarios generales, no dietas dosha ni tratamientos. Ajusta cantidades y texturas a tus necesidades; usa sustituciones seguras para alergias y preferencias.",
      "These are general cooking examples, not dosha diets or treatments. Adjust amounts and textures to your needs; use safe substitutions for allergies and preferences.",
    ),
    tradition: l(
      "Las preparaciones caseras varían ampliamente entre familias y regiones. Las recetas no intentan representar toda la cocina del sur de Asia ni una prescripción tradicional única.",
      "Home preparations vary widely across families and regions. These recipes do not represent all South Asian cooking or one definitive traditional prescription.",
    ),
    reflection: l(
      "¿Qué ingrediente local, accesible y conocido podrías añadir para que una comida sea agradable y suficiente?",
      "What familiar, affordable local ingredient could you add to make a meal enjoyable and adequate?",
    ),
    fields: [
      listField(
        "Tres ideas básicas",
        "Three simple ideas",
        [
          "Avena con pera (1 porción): combina ½ taza de avena arrollada y 1 taza de agua o leche que toleres. Cocina según el envase; incorpora 1 pera picada al final y canela opcional. Ajusta la textura y deja enfriar antes de comer.",
          "Sopa de arroz y verduras (2 porciones): enjuaga ½ taza de arroz y cocínalo con 1 zanahoria picada, 1 calabacín picado y 4 tazas de agua o caldo hasta que el arroz y las verduras estén tiernos. Sazona al gusto; añade una proteína cocida que uses habitualmente, si quieres.",
          "Lentejas con arroz (2 porciones): enjuaga ½ taza de lentejas y ½ taza de arroz. Cocina las lentejas en agua hasta que estén completamente tiernas y prepara el arroz según el envase. Sirve con verduras cocidas opcionales; cambia ingredientes según tolerancia y preferencia.",
        ],
        [
          "Pear porridge (1 serving): combine ½ cup rolled oats with 1 cup water or a milk you tolerate. Cook according to the package; stir in 1 chopped pear near the end and optional cinnamon. Adjust the texture and let it cool before eating.",
          "Rice and vegetable soup (2 servings): rinse ½ cup rice and cook it with 1 chopped carrot, 1 chopped zucchini, and 4 cups water or broth until the rice and vegetables are tender. Season to taste; add a cooked protein you commonly eat if you like.",
          "Lentils with rice (2 servings): rinse ½ cup lentils and ½ cup rice. Cook the lentils in water until fully tender and prepare the rice according to its package. Serve with optional cooked vegetables; swap ingredients to suit tolerance and preference.",
        ],
        "teaching",
      ),
      textField(
        "Sustituciones y seguridad",
        "Substitutions and safety",
        "Sustituye cualquier ingrediente que provoque alergia, intolerancia o rechazo. Mantén utensilios y superficies limpios, cocina bien los alimentos y guarda sobras de forma segura. Si necesitas una dieta terapéutica, sigue el plan de un dietista-nutricionista o profesional sanitario.",
        "Replace any ingredient that causes an allergy, intolerance, or dislike. Keep utensils and surfaces clean, cook food thoroughly, and store leftovers safely. If you need a therapeutic diet, follow a plan from a registered dietitian or healthcare professional.",
        "safety",
      ),
      textField(
        "Infusiones",
        "Infusions",
        "No se recomiendan hierbas medicinales ni dosis de suplementos. Una bebida caliente corriente es opcional; toma en cuenta sensibilidad, embarazo, medicación y consejo clínico, y no la uses para tratar síntomas.",
        "Medicinal herbs and supplement doses are not recommended here. An ordinary warm drink is optional; consider sensitivities, pregnancy, medication, and clinical advice, and do not use it to treat symptoms.",
        "safety",
      ),
    ],
    relatedIds: ["food", "six-tastes", "agni"],
    tags: ["recipes", "food safety", "everyday cooking"],
  }),
];

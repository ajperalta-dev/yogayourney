import { l } from "@/lib/utils";
import type { SectionId } from "@/lib/models";
export const sections: {
  id: SectionId;
  name: ReturnType<typeof l>;
  description: ReturnType<typeof l>;
  introduction?: ReturnType<typeof l>;
  icon: string;
  color: string;
}[] = [
  {
    id: "schedule",
    name: l("Horario", "Schedule"),
    description: l("Un ritmo para tu día", "A rhythm for your day"),
    icon: "calendar",
    color: "sand",
  },
  {
    id: "ashtanga",
    name: l("Ashtanga", "Ashtanga"),
    description: l("Respiración en movimiento", "Breath in motion"),
    introduction: l(
      "El Ashtanga Vinyasa moderno se asocia con la enseñanza de K. Pattabhi Jois en Mysore, India, dentro de una historia más amplia del yoga postural. Une posturas en un orden progresivo mediante vinyasa: cada transición se coordina con una respiración, mientras drishti (un punto de mirada) y la atención corporal sostienen la concentración. Puede servir a quienes disfrutan de una práctica regular y activa; sus beneficios posibles incluyen fuerza, movilidad y constancia, sin prometer resultados médicos. Una clase suele incluir saludos al sol, posturas de pie, trabajo sentado y un cierre. Adaptá el ritmo y practicá las series avanzadas con una persona docente cualificada.",
      "Modern Ashtanga Vinyasa is associated with K. Pattabhi Jois’s teaching in Mysore, India, within a broader history of postural yoga. It links postures in a progressive order through vinyasa: transitions follow the breath, while drishti (a gaze point) and body awareness support concentration. It may suit people who enjoy regular, active practice; possible benefits include strength, mobility, and consistency, without promising medical outcomes. A class often includes sun salutations, standing poses, seated work, and a closing sequence. Adapt the pace and learn advanced series with a qualified teacher.",
    ),
    icon: "sun",
    color: "sage",
  },
  {
    id: "hatha",
    name: l("Hatha", "Hatha"),
    description: l("Las bases de tu práctica", "Ground your practice"),
    introduction: l(
      "Hatha reúne tradiciones de práctica física del yoga desarrolladas en India durante siglos; en las clases actuales suele describir un ritmo pausado que combina posturas, respiración y atención. Puede ser una entrada accesible para explorar la alineación y también una práctica completa para distintos niveles. Las posturas se mantienen varias respiraciones, con tiempo para ajustar apoyos y observar sensaciones. Una clase equilibrada suele alternar estar de pie, flexiones, extensiones suaves, giros, trabajo en el suelo y relajación. La intensidad se adapta a cada cuerpo.",
      "Hatha gathers physical yoga practice traditions developed in India over centuries; in contemporary classes it often describes a measured pace combining postures, breath, and attention. It can be an accessible way to explore alignment and a complete practice for different levels. Poses are held for several breaths, with time to adjust support and notice sensations. A balanced class often alternates standing, folds, gentle backbends, twists, floor work, and relaxation. Intensity is adapted to each body.",
    ),
    icon: "person",
    color: "peach",
  },
  {
    id: "yin",
    name: l("Yin Yoga", "Yin Yoga"),
    description: l("Espacio para la quietud", "Make room for stillness"),
    introduction: l(
      "Yin Yoga es un enfoque moderno, influido por prácticas taoístas y por el yoga postural, que propone formas mayormente pasivas en el suelo. Se usan apoyos y permanencias de tres a cinco minutos en un rango tolerable, con salidas lentas y pausas neutras; la práctica pone atención en la respuesta de los tejidos conectivos, sin prometer cambios estructurales. Sus mapas de meridianos pertenecen a marcos tradicionales y no describen estructuras anatómicas demostradas. Puede interesar a quien desea una clase menos dinámica. No fuerces una sensación intensa: salí ante dolor, hormigueo o adormecimiento, y adaptá cada forma a tus articulaciones.",
      "Yin Yoga is a modern approach influenced by Taoist practices and postural yoga that uses mostly passive floor-based shapes. Props support three-to-five-minute holds within a tolerable range, followed by slow exits and neutral pauses; the practice attends to connective-tissue response without promising structural change. Meridian maps belong to traditional frameworks and do not describe established anatomical structures. It may appeal to people seeking a less dynamic class. Do not chase intense sensation: come out if you feel pain, tingling, or numbness, and adapt each shape to your joints.",
    ),
    icon: "moon",
    color: "lavender",
  },
  {
    id: "aerial",
    name: l("Aerial Yoga", "Aerial Yoga"),
    description: l("Explora con apoyo", "Explore with support"),
    introduction: l(
      "Aerial Yoga adapta posturas de yoga con una hamaca textil suspendida. El método y la altura varían entre escuelas; anclajes, tela y montaje deben ser seleccionados, instalados e inspeccionados por profesionales competentes para el equipo y el espacio. Puede ofrecer apoyo y nuevas referencias de movimiento, pero la tela no elimina el riesgo de caída o compresión. Es una práctica presencial, con instrucción y asistencia cercana; no montes el equipo ni pruebes inversiones, transiciones o caídas a partir de una guía de pantalla. Consultá antes si tenés condiciones médicas, embarazo, glaucoma, presión arterial no controlada, cirugías recientes o sensibilidad al mareo.",
      "Aerial Yoga adapts yoga poses with a suspended fabric hammock. Methods and heights vary by school; anchors, fabric, and rigging must be selected, installed, and inspected by professionals qualified for the equipment and space. The fabric can offer support and new movement references, but it does not remove fall or compression risks. This is an in-person practice with instruction and close assistance; do not rig equipment or try inversions, transitions, or drops from an on-screen guide. Seek professional advice first if you have a medical condition, are pregnant, have glaucoma, uncontrolled blood pressure, recent surgery, or motion sensitivity.",
    ),
    icon: "wind",
    color: "blue",
  },
  {
    id: "pranayama",
    name: l("Pranayama", "Pranayama"),
    description: l("El arte de respirar", "The art of breathing"),
    introduction: l(
      "Prāṇa suele traducirse en la tradición yóguica como aliento o energía vital; prāṇāyāma es la regulación consciente de la respiración. Esta biblioteca empieza con observación, respiración completa y exhalación suave, continúa con Ujjayi, respiración alterna y zumbido, y deja las técnicas rápidas y las retenciones para el aprendizaje con instructor. Los conteos son referencias flexibles, nunca una meta: respirá sin esfuerzo y volvé al ritmo natural si aparece falta de aire, mareo, ansiedad o malestar. Las prácticas respiratorias pueden acompañar el bienestar, pero no reemplazan atención médica.",
      "In yogic tradition, prāṇa is often translated as breath or vital energy; prāṇāyāma is the conscious regulation of breathing. This library begins with observation, full breathing, and a soft extended exhale, continues with Ujjayi, alternate-nostril breathing, and humming, and reserves fast techniques and breath retention for instruction with a teacher. Counts are flexible cues, never a target: breathe without strain and return to a natural rhythm if you feel short of breath, dizzy, anxious, or unwell. Breathing practices may support well-being but do not replace medical care.",
    ),
    icon: "wind",
    color: "sage",
  },
  {
    id: "mantras",
    name: l("Mantras", "Mantras"),
    description: l("Sonido e intención", "Sound and intention"),
    introduction: l(
      "Un mantra es una sílaba, palabra o verso que se recita o contempla dentro de una tradición espiritual. Acercate a cada texto con respeto por su contexto; las traducciones expresan una lectura posible, no agotan todos sus sentidos. Elegí una intención, sentate cómodamente y pronunciá sin forzar la voz. Podés cantar en voz audible, murmurar o repetir mentalmente; son formas distintas y ninguna es obligatoria. Empezá con 3 o 9 repeticiones y, si te resulta útil, probá 27 o una vuelta de 108 cuentas con una mala. Mové una cuenta por repetición y seguí el método de tu tradición; algunas malas incluyen una cuenta principal que se honra sin cruzarla. Las categorías agrupan los mantras por intención. Sat Nām se presenta aparte como frase de la tradición sij en panyabí y escritura gurmukhi, no como sánscrito.",
      "A mantra is a syllable, word, or verse recited or contemplated within a spiritual tradition. Approach each text with respect for its context; translations offer one possible reading and cannot hold every nuance. Choose an intention, sit comfortably, and use an unforced voice. You may chant aloud, murmur, or repeat mentally; these are distinct options and none is required. Begin with 3 or 9 repetitions, then try 27 or one 108-bead mala round if useful. Move one bead per repetition and follow your tradition’s method; some malas have a main bead that practitioners honor without crossing. Categories group the mantras by intention. Sat Nām is identified separately as a Sikh phrase in Punjabi and Gurmukhi script, not as Sanskrit.",
    ),
    icon: "music",
    color: "peach",
  },
  {
    id: "anatomy",
    name: l("Anatomía", "Anatomy"),
    description: l("Comprende el movimiento", "Understand movement"),
    icon: "activity",
    color: "blue",
  },
  {
    id: "kriyas",
    name: l("Detox / Kriyas", "Detox / Kriyas"),
    description: l("Tradición y seguridad", "Tradition and safety"),
    introduction: l(
      "En algunas tradiciones de Haṭha Yoga, los ṣaṭkarmas son seis acciones de purificación que preparan la práctica y se enseñan según la persona y la escuela; no se consideran obligatorios para todo el mundo. Textos como Haṭha Yoga Pradīpikā los sitúan dentro de un marco tradicional de disciplina corporal, no de una promesa moderna de eliminar toxinas. ‘Detox’ es aquí un nombre de sección, no una afirmación médica. Esta biblioteca distingue el contexto histórico de lo que puede recomendarse con seguridad: las técnicas invasivas, intensas o de presión abdominal no son para aprender a solas, y algunos métodos solo se presentan como lectura. Una práctica suave de higiene tampoco limpia el organismo ni trata enfermedades. Si te interesa una kriya, conversa primero con una persona instructora cualificada y con tu profesional sanitario cuando tengas una condición médica.",
      "In some Haṭha Yoga traditions, the ṣaṭkarmas are six cleansing actions taught according to the person and school; they are not considered compulsory for everyone. Texts such as the Haṭha Yoga Pradīpikā place them within a traditional framework of bodily discipline, not a modern promise to remove toxins. ‘Detox’ is the section name, not a medical claim. This library separates historical context from what can be responsibly recommended: invasive, forceful, or abdominal-pressure techniques are not for self-teaching, and some methods are included for study only. Gentle hygiene does not cleanse the body or treat disease either. If you are interested in a kriya, first speak with a qualified instructor and with your healthcare professional when you have a medical condition.",
    ),
    icon: "drop",
    color: "sand",
  },
  {
    id: "meditation",
    name: l("Meditación", "Meditation"),
    description: l("Vuelve al presente", "Return to the present"),
    introduction: l(
      "La meditación reúne prácticas de atención y contemplación: puedes descansar la atención en la respiración, el cuerpo, un sonido, una imagen o el movimiento, y volver al ancla elegida cada vez que la mente se distraiga. No se trata de dejar la mente en blanco ni de conseguir una sensación especial. Puede ofrecer un espacio para observar la experiencia con más claridad; los efectos varían y no sustituye apoyo médico o psicológico. Busca una postura estable y cómoda: silla con los pies apoyados, cojín que eleve la pelvis, o tumbado si lo necesitas. Deja las manos descansando, suaviza la mirada o cierra los ojos si eso se siente seguro. Empieza con 3–5 minutos, usa un temporizador amable y termina moviendo el cuerpo despacio. Si aparece ansiedad, dolor o desconexión, abre los ojos, siente los pies, cambia a un ancla externa o detente; no es necesario perseverar.",
      "Meditation brings together practices of attention and contemplation: you can rest attention on the breath, body, a sound, an image, or movement, and return to your chosen anchor whenever the mind wanders. The aim is not to empty the mind or produce a special feeling. It can offer space to observe experience more clearly; effects vary, and meditation does not replace medical or psychological support. Choose a steady, comfortable posture: a chair with feet supported, a cushion that raises the pelvis, or lying down if needed. Let the hands rest, soften the gaze, or close the eyes if that feels safe. Begin with 3–5 minutes, use a gentle timer, and finish by moving slowly. If anxiety, pain, or disconnection arises, open the eyes, feel the feet, switch to an external anchor, or stop; you do not need to push through.",
    ),
    icon: "flower",
    color: "lavender",
  },
  {
    id: "ayurveda",
    name: l("Ayurveda", "Ayurveda"),
    description: l("Ritmos de vida", "Rhythms of living"),
    icon: "leaf",
    color: "sage",
  },
];
export const hathaCategories = [
  "Standing",
  "Sitting",
  "Forward bends",
  "Backbends",
  "Twists",
  "Balance",
  "Inversions",
  "Relaxation",
];
export const aerialCategories = [
  "Foundations",
  "Standing",
  "Supported",
  "Seated",
  "Backbends",
  "Hip Openers",
  "Inversions",
  "Flips / Transitions",
  "Relaxation",
  "Aerial Savasana",
];

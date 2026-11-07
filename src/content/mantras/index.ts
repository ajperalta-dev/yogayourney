import type { Mantra } from "@/lib/models";
import { l } from "@/lib/utils";
import { base } from "../shared";
export const mantras: Mantra[] = [
  {
    ...base(
      "om-shanti",
      "Om Shanti",
      "Om Shanti",
      "Mantra",
      l("Una breve invocación de paz.", "A brief invocation of peace."),
    ),
    kind: "mantra",
    sanskrit: "ॐ शान्तिः शान्तिः शान्तिः",
    transliteration: "Oṃ śāntiḥ śāntiḥ śāntiḥ",
    translation: l("Om, paz, paz, paz.", "Om, peace, peace, peace."),
    meaning: l(
      "Invocación tradicional de paz.",
      "A traditional invocation of peace.",
    ),
    context: l(
      "Puede usarse para cerrar una práctica; cantar es opcional.",
      "May be used to close a practice; chanting is optional.",
    ),
  },
  {
    ...base(
      "opening-mantra",
      "Mantra de apertura",
      "Opening mantra",
      "Ashtanga",
      l(
        "Ficha reservada para el mantra de apertura de Ashtanga.",
        "Reserved entry for the Ashtanga opening mantra.",
      ),
    ),
    kind: "mantra",
    sanskrit:
      "ॐ वन्दे गुरूणां चरणारविन्दे सन्दर्शितस्वात्मसुखावबोधे । निःश्रेयसे जाङ्गलिकायमाने संसारहालाहलमोहशान्त्यै ॥ आ बाहुपुरुषाकारं शङ्खचक्रासिधारिणम् । सहस्रशिरसं श्वेतं प्रणमामि पतञ्जलिम् ॐ ॥",
    transliteration:
      "Oṃ vande gurūṇāṃ caraṇāravinde sandarśita svātma sukhāvabodhe. Niḥśreyase jāṅgalikāyamāne saṃsāra hālāhala mohaśāntyai. Ābāhu puruṣākāraṃ śaṅkhacakrāsi dhāriṇam. Sahasraśirasaṃ śvetaṃ praṇamāmi patañjalim. Oṃ.",
    translation: l(
      "Me inclino ante los pies de loto del maestro. Que la enseñanza disipe la confusión. Rindo homenaje a Patañjali, representado con atributos simbólicos.",
      "I bow to the lotus feet of the teacher. May the teaching dispel confusion. I honor Patañjali, represented with symbolic attributes.",
    ),
    meaning: l(
      "Reconocimiento a la transmisión del conocimiento.",
      "Acknowledgment of the transmission of knowledge.",
    ),
    context: l(
      "Tradición oral con variantes de transliteración y pronunciación. Aprende el canto con una persona docente.",
      "Oral tradition with transliteration and pronunciation variants. Learn the chant with a teacher.",
    ),
  },
  {
    ...base(
      "closing-mantra",
      "Mantra de cierre",
      "Closing mantra",
      "Ashtanga",
      l(
        "Ficha reservada para el mantra de cierre de Ashtanga.",
        "Reserved entry for the Ashtanga closing mantra.",
      ),
    ),
    kind: "mantra",
    sanskrit:
      "ॐ स्वस्तिप्रजाभ्यः परिपालयन्तां न्यायेन मार्गेण महीं महीशाः । गोब्राह्मणेभ्यः शुभमस्तु नित्यं लोकाः समस्ताः सुखिनो भवन्तु ॥ ॐ शान्तिः शान्तिः शान्तिः ॥",
    transliteration:
      "Oṃ svasti prajābhyaḥ paripālayantāṃ nyāyena mārgeṇa mahīṃ mahīśāḥ. Gobrāhmaṇebhyaḥ śubham astu nityaṃ lokāḥ samastāḥ sukhino bhavantu. Oṃ śāntiḥ śāntiḥ śāntiḥ.",
    translation: l(
      "Deseo de bienestar, justicia y paz para todos los seres.",
      "A wish for well-being, justice and peace for all beings.",
    ),
    meaning: l(
      "El Mangala Mantra cierra algunas prácticas de Ashtanga con una invocación de bienestar y paz.",
      "The Mangala Mantra closes some Ashtanga practices with an invocation for well-being and peace.",
    ),
    context: l(
      "La transliteración y el canto pueden variar entre linajes. El audio de apoyo no está disponible.",
      "Transliteration and chanting may vary between lineages. Supporting audio is unavailable.",
    ),
  },
];

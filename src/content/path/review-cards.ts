import { flashcards } from "../study";
import { byId, sectionFor } from "../catalog";
import type { FlashcardExercise } from "@/lib/path/models";
const legacy: Record<string,string>={"fc-sanskrit":"tadasana","fc-anatomy":"hip-joint","fc-asana":"utthita-trikonasana","fc-breath":"sama-vritti","fc-ayurveda":"dinacharya","fc-philosophy":"yamas-and-niyamas"};
const topics=["six-darshanas","six-darshanas","samkhya-purusha-prakriti","samkhya-purusha-prakriti","samkhya-purusha-prakriti","samkhya-purusha-prakriti","samkhya-purusha-prakriti","advaita-vedanta","advaita-vedanta","advaita-vedanta","bhagavad-gita","bhagavad-gita","yoga-paths","key-yoga-concepts","kleshas","kleshas","citta-vritti-nirodha","citta-vritti-nirodha","citta-vritti-nirodha","citta-vritti-nirodha","yoga-sutras-introduction","eight-limbs-ashtanga","eight-limbs-ashtanga","yamas-and-niyamas","yamas-and-niyamas","yamas-and-niyamas","yamas-and-niyamas","yamas-and-niyamas","yamas-and-niyamas","limbs-three-to-eight","limbs-three-to-eight","limbs-three-to-eight","abhyasa-vairagya-ishvara","practice-and-nonattachment","traditional-yogic-maps","traditional-yogic-maps","traditional-yogic-maps","traditional-yogic-maps","three-bodies-four-states","three-bodies-four-states"];
export const reviewCards:FlashcardExercise[]=flashcards.map(card=>{
 const contentId=legacy[card.id]??topics[Number(card.id.replace("fc-phil-",""))-1];
 if(!byId[contentId])throw new Error(`Unmapped flashcard: ${card.id}`);
 return {id:`review-${card.id}`,type:"flashcard",flashcardId:card.id,contentId,unitId:sectionFor(byId[contentId]),lessonId:"personal-review",difficulty:1,prompt:card.front,explanation:card.back};
});

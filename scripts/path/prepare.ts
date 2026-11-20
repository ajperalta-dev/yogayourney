import { writeFileSync,mkdirSync,existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { pathUnits,pathExercises } from "../../src/content/path";
import { reviewCards } from "../../src/content/path/review-cards";
import { catalog,sectionFor } from "../../src/content/catalog";
const pool=[...pathExercises,...reviewCards];
const entries=pool.map(({id,unitId,lessonId,type,contentId})=>({id,unitId,lessonId,type,contentId}));
const fingerprints:Record<string,string>={};
mkdirSync("public/data/path",{recursive:true});
for(const unit of pathUnits){
 const exercises=pool.filter(e=>e.unitId===unit.id).map(e=>{
  const image=(i:{src:string;alt:{es:string;en:string}})=>{
   const src=i.src.replace(/\.svg$/u,".webp");
   return {...i,src:existsSync(`public${src}`)&&[400,800,1200].every(n=>existsSync(`public${src.replace(/\.webp$/u,`-${n}.webp`)}`))?src:i.src};
  };
  return { ...e,...("image"in e&&e.image?{image:image(e.image)}:{}),...("optionImages"in e&&e.optionImages?{optionImages:e.optionImages.map(image)}:{})};
 });
 const payload=JSON.stringify({unit,exercises});fingerprints[unit.id]=createHash("sha256").update(payload).digest("hex").slice(0,16);
 writeFileSync(`public/data/path/${unit.id}.json`,payload+"\n");
}
writeFileSync("src/content/path/manifest.json",JSON.stringify({units:pathUnits,entries,fingerprints,links:Object.fromEntries(catalog.map(item=>[item.id,`/${sectionFor(item)}/${item.id}/`]))},null,2)+"\n");
console.log(`Runtime preparado: ${pathUnits.length} bancos locales diferidos; ${pathExercises.length} ejercicios y ${reviewCards.length} flashcards.`);

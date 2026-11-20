import manifest from "@/content/path/manifest.json";
import type { Exercise,Unit } from "./models";
import { validExercise } from "./grading";
export const runtimeUnits=manifest.units as Unit[];
export const runtimeEntries=manifest.entries as Pick<Exercise,"id"|"unitId"|"lessonId"|"type"|"contentId">[];
export const contentLinks:Record<string,string>=manifest.links;
const loaded=new Map<string,Promise<Exercise[]>>();
export function loadUnit(id:string):Promise<Exercise[]> {
 if(!runtimeUnits.some(u=>u.id===id))return Promise.reject(new Error("Unknown unit"));
 if(!loaded.has(id))loaded.set(id,(async()=>{
  const version=manifest.fingerprints[id as keyof typeof manifest.fingerprints];
  const url=`/data/path/${id}.json?v=${version}`;
  let response:Response;
  try {response=await fetch(url,{signal:AbortSignal.timeout(5000)});if(!response.ok)throw new Error("Fetch failed");}
  catch {const cached=typeof caches!=="undefined"?await caches.match(url):undefined;if(!cached)throw new Error("Bank unavailable offline");response=cached;}
  if(!response.ok)throw new Error("Bank unavailable");
  const value=await response.json();
  const expected=runtimeEntries.filter(e=>e.unitId===id);
  if(value.unit?.id!==id||!Array.isArray(value.exercises)||value.exercises.length!==expected.length||new Set(value.exercises.map((e:Exercise)=>e.id)).size!==expected.length||!value.exercises.every((e:Exercise)=>expected.some(x=>x.id===e.id)&&validExercise(e)))throw new Error("Invalid bank");
  if(typeof caches!=="undefined")try {const cache=await caches.open("yoga-path-banks-v1");await cache.put(url,new Response(JSON.stringify(value),{headers:{"Content-Type":"application/json"}}));}catch{/* Optional cache; in-memory practice still works. */}
  return value.exercises as Exercise[];
 })().catch(error=>{loaded.delete(id);throw error;}));
 return loaded.get(id)!;
}
export const loadAllBanks=async()=> (await Promise.all(runtimeUnits.map(u=>loadUnit(u.id)))).flat();
export const loadExerciseBanks=async(ids:string[])=> (await Promise.all([...new Set(runtimeEntries.filter(e=>ids.includes(e.id)).map(e=>e.unitId))].map(loadUnit))).flat();

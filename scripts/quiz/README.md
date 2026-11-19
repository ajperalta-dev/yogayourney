# Generación del banco Camino

## Tanda actual

Hatha: seis lecciones de diez ejercicios. Cuarenta se generan leyendo el catálogo y las secuencias; veinte son escenarios y conceptos redactados específicamente en ES/EN (diez por lección curada). Cada lección incluye al menos tres tipos. Las demás unidades mantienen su banco inicial y quedan pendientes de una tanda propia.

## Uso

Desde la raíz del repositorio:

```text
npm run quiz:generate -- hatha
npm run quiz:validate
npx tsx --test tests/quiz-generation.test.ts
```

La generación es determinista. Escribe el JSON de Hatha solo después de validarlo. El validador informa exclusivamente cantidades e IDs y escribe `coverage.json` con la distribución de tipos; no imprime preguntas. `QUIZ_REVIEW.md` contiene los ejercicios sensibles y sus claves para revisión docente. Regenerar ese informe sobrescribe las notas manuales, por lo que deben mantenerse en un documento separado vinculado por ID.

## Fuentes y límites de automatización

- Se leen nombres ES/EN, sánscrito, nivel, imágenes, beneficios, categorías y enlaces a contraposturas/anatomía desde las fichas. No se reescribe a mano ese contenido.
- Se prefiere la categoría compartida al buscar distractores; si no hay cuatro opciones distintas, se usa la misma biblioteca de asanas. El script falla si no puede construir cuatro opciones únicas en ambos idiomas.
- Las relaciones de beneficio, contrapostura, anatomía y nivel se preguntan como datos de una ficha identificada. No se afirma que una región o beneficio sea exclusivo de una postura ni que una contrapostura sea una prescripción individual. Se evita deducir diagnósticos o contraindicaciones automáticamente de palabras sueltas.
- Las secuencias se preguntan por nombre y tramo concreto: no se impone su orden como universal ni se convierte una secuencia de la app en una serie tradicional que no está documentada.
- Las preguntas de imágenes usan recursos locales y descripciones accesibles derivadas de instrucciones. La revisión de la exactitud anatómica de las ilustraciones sigue siendo necesaria.
- Los órdenes de palabras se limitan a traducciones cortas ya presentes, con palabras sin repetición para que la clave sea única; se permiten cantidades de palabras diferentes en ES/EN.
- Hay comprobación de claves en ambos idiomas, duplicados, referencias, imágenes, procedencia, pertenencia a lecciones y snapshot desactualizado. La validación estructural no puede certificar por sí sola ausencia de ambigüedad semántica.
- Pranayama, mantras, kriyas, términos filosóficos, doshas, kośas, guṇas y asociaciones anatómicas más amplias se trabajarán en sus unidades correspondientes. No se crean preguntas ni atribuciones si falta una fuente estructurada inequívoca.
- Sustituir los antiguos nodos `hatha-recognition-*` conserva los datos guardados anteriores. No se asigna su dominio a temas nuevos sin evidencia; la pantalla de Camino deberá conservarlos como historial al integrarse.

## Referencias para los escenarios curados

Texto y explicaciones originales. Referencias de alcance/consentimiento y señales para detener una práctica:

- [Yoga Alliance, Code of Conduct](https://yogaalliance.org/policies-priorities-progress/code-of-conduct/).
- [Yoga Alliance, Scope of Practice](https://yogaalliance.org/policies-priorities-progress/scope-of-practice/).
- [Newcastle Hospitals NHS Foundation Trust, Exercise and your health](https://www.newcastle-hospitals.nhs.uk/services/newcastle-occupational-health-service/information-for-staff/physiotherapy/self-help-leaflets/exercise-and-your-health-a-guide-to-getting-started/).

Estos códigos profesionales y recomendaciones generales no reemplazan evaluación clínica, protocolos del centro ni normativa local. Las preguntas clínicas y de consentimiento se mantienen en el informe de revisión docente.

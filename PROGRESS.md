# Auditoría y plan de Yoga Journey

**Fecha:** 2026-11-07
**Alcance de la fase inicial:** auditoría de solo lectura del repositorio. En esa fase no se modificaron código, contenido ni assets; solo se documentó el inventario.

## Inventario de secciones y categorías

Hay 11 secciones en `src/content/sections.ts`. El catálogo principal contiene 51 fichas con IDs únicos. Ashtanga reutiliza para su biblioteca las 26 fichas de asanas que también aparecen en Hatha; no son 26 registros adicionales.

| Sección | Fichas/clases | Categorías presentes en los datos o filtros | Secuencias integradas |
| --- | ---: | --- | --- |
| Horario (`schedule`) | 5 clases en `src/content/schedule/index.ts` | Días de la semana y franjas horarias; no usa categorías de catálogo | Ninguna |
| Ashtanga | 26 asanas compartidas con Hatha | Standing, Forward bends, Sitting, Backbends, Relaxation, Balance, Inversions, Twists | 5 |
| Hatha | 26 asanas | Standing, Sitting, Forward bends, Backbends, Twists, Balance, Inversions, Relaxation | 1 |
| Yin Yoga | 5 fichas | Hip Openers, Supported | 1 |
| Aerial Yoga | 1 ficha | Foundations; la UI también ofrece los filtros Standing, Supported, Seated, Backbends, Hip Openers, Inversions, Flips / Transitions, Relaxation y Aerial Savasana, hoy sin fichas asignadas | 1 |
| Pranayama | 1 técnica | Pranayama | Ninguna |
| Mantras | 3 fichas | Mantra, Ashtanga | Ninguna |
| Anatomía | 1 tema | Joints | Ninguna |
| Detox / Kriyas | 1 ficha | Foundations | Ninguna |
| Meditación | 1 práctica | Mindfulness | Ninguna |
| Ayurveda | 12 temas | Ayurveda | Ninguna |

El selector de categorías de Hatha y Aerial está fijado en `src/content/sections.ts`; las demás bibliotecas toman sus filtros de `category` en los datos. Las categorías están almacenadas en inglés, aunque los textos de interfaz usan localización español/inglés.

## Pantallas y rutas existentes

- `/`: panel de inicio, actividad, accesos y progreso.
- `/learn/`: biblioteca de secciones; se sirve desde la ruta dinámica `[section]`.
- `/[section]/`: biblioteca con búsqueda, filtros, fichas y, cuando corresponde, tarjetas de secuencias.
- `/[section]/[id]/`: detalle de una ficha; las asanas están disponibles tanto en Hatha como en Ashtanga.
- `/schedule/`: horario.
- `/practice/`: catálogo de secuencias.
- `/practice/[id]/`: reproductor guiado de una secuencia.
- `/practice/custom/`: reproductor de secuencias propias.
- `/study/`: accesos a herramientas de estudio.
- `/study/favorites/`, `/study/flashcards/`, `/study/quiz/`, `/study/progress/`: favoritos, tarjetas, cuestionario y progreso.
- `/teach/`, `/teach/builder/`, `/teach/sequences/`, `/teach/notes/`: inicio de enseñanza, constructor, secuencias propias y notas docentes.
- `/search/` y pantalla `not-found`.

## Almacenamiento y esquema

El contenido de la aplicación es estático y está escrito en TypeScript bajo `src/content/`; no se encontró una conexión de persistencia de contenido con Supabase. `src/content/catalog.ts` combina las fichas y crea índices `byId` y `searchIndex`.

Los tipos están en `src/lib/models.ts`:

- `ContentBase`: `id`, nombres y resumen localizados (`es`/`en`), categoría, nivel, `image`, `thumbnail`, etiquetas, campos editoriales, relaciones, duración, respiración y seguridad.
- Tipos de ficha: `Asana`, `YinPose`, `AerialPose`, `PranayamaTechnique`, `Mantra`, `AnatomyTopic`, `Kriya`, `MeditationPractice` y `AyurvedaTopic`, con los campos específicos definidos en el modelo.
- `Sequence`: `id`, `name`, `description`, `style`, `level`, `duration` (segundos), `objective`, `image`, `steps[]` y `demo`. Cada paso contiene `key`, `contentId`, `duration` (segundos) y `stage`.
- `ScheduleItem`: horario, nombre, sección, ubicación y días. `Flashcard` y `QuizQuestion` contienen el material de estudio estático.
- `PersonalState`: preferencias, favoritos, notas, historial, resultados, tarjetas y secuencias creadas por el usuario.

El estado personal se guarda en `localStorage` bajo `yoga-journey:v1`, con validación y valores iniciales en `src/lib/storage.ts` y `src/components/providers.tsx`. El horario, las tarjetas y las preguntas también se definen como arreglos TypeScript; hay 5 entradas de horario, 6 tarjetas y 5 preguntas de quiz.

## Estado de secuencias en la auditoría inicial

**Criterio de esta auditoría:** “Completa” indica que la ficha de secuencia tiene sus metadatos requeridos, cada paso resuelve a una ficha de asana con datos de práctica, y la suma de pasos coincide con la duración declarada. No significa validación docente ni arte final. “Incompleta” indica una brecha respecto del detalle solicitado para cada postura. No hay secuencias definidas vacías.

| Sección | Secuencia | Estado | Imagen | Notas |
| --- | --- | --- | --- | --- |
| Ashtanga | Surya Namaskar A · adaptación breve (`surya-a`) | Completa | Ruta local existe; ilustración provisional | 12 pasos, 360 s (6 min). Referencias y suma verificadas. Descripción y objetivo son genéricos y compartidos. |
| Ashtanga | Surya Namaskar B · adaptación breve (`surya-b`) | Completa | Ruta local existe; ilustración provisional | 18 pasos, 540 s (9 min). Referencias y suma verificadas. Descripción y objetivo son genéricos y compartidos. |
| Ashtanga | Fundamentos de pie (`standing`) | Completa | Ruta local existe; ilustración provisional | 11 pasos, 660 s (11 min). Referencias y suma verificadas; revisar asignación automática de fases. |
| Ashtanga | Fundamentos de la serie primaria (`primary-series`) | Completa | Ruta local existe; ilustración provisional | 17 pasos, 1.530 s (25,5 min). Referencias y suma verificadas; revisar asignación automática de fases. |
| Ashtanga | Cierre · suelo y descanso (`finishing`) | Completa | Ruta local existe; ilustración provisional | 8 pasos, 480 s (8 min). Incluye Savasana; el algoritmo etiqueta sus tres primeros pasos como calentamiento aunque sea una secuencia de cierre. |
| Hatha | Volver a las bases (`hatha-foundations`) | Completa | Ruta local existe; ilustración provisional | 11 pasos, 495 s (8 min 15 s). Referencias y suma verificadas. Descripción y objetivo son genéricos y compartidos. |
| Yin | Un espacio de quietud (`yin-stillness`) | Incompleta | Ruta local existe; ilustración provisional | 7 pasos, 1.680 s (28 min). La ficha Mariposa no declara nombre sánscrito y las fichas Yin no tienen campo de errores comunes. Las fases se asignan por posición. |
| Aerial | Repaso supervisado (`aerial-foundations`) | Incompleta | Ruta local existe; ilustración provisional | 5 pasos, 450 s (7 min 30 s). Es un repaso teórico seguro; Asiento con apoyo no declara nombre sánscrito ni permanencia específica de la postura. |

Las sumas reportadas coinciden con la duración declarada en las ocho secuencias. Todas las referencias de los pasos resuelven a fichas existentes.

## Imágenes: estado actual

- Las fichas usan `image` y `thumbnail`; las rutas actuales son locales. Los ocho registros de secuencia usan `/images/sequences/<id>.webp`.
- `scripts/create-assets.mjs` genera SVG de origen y derivados WebP responsivos. `src/lib/image-loader.ts` selecciona variantes de 400, 800 o 1200 px.
- Comprobación de rutas locales: existen las imágenes y miniaturas de las 51 fichas y las ocho secuencias. Los recursos de posturas están en `/public/images/` y `/public/images/poses/`; los de secuencias, en `/public/images/sequences/`.
- Las ilustraciones son símbolos genéricos provisionales, no representaciones específicas de alineación. `IMAGES_TODO.md` enumera 23 imágenes de postura y 8 de secuencia que necesitan arte final.
- `ContentCard` muestra imágenes de fichas con `next/image`, `fill` y tamaños responsive, pero su `alt` está vacío. El detalle usa texto alternativo que las califica de ilustrativas. El reproductor muestra la imagen de la postura actual con el nombre como `alt`.
- No se encontró fallback visual `onError` para imágenes ausentes. El estado vacío del reproductor cubre fichas de paso ausentes, no errores de imagen. `SequenceCard` no renderiza actualmente el campo `sequence.image`, aunque exista en los datos.

## Plan ordenado de trabajo

1. **Ashtanga (contenido completo, imagen pendiente):** las cinco secuencias tienen fases y tiempos propios, objetivos concretos y referencias verificadas a la biblioteca.
2. **Hatha (contenido completo, imagen pendiente):** `hatha-foundations` tiene objetivo propio, fases explícitas y tiempos por ambos lados para las posturas unilaterales.
3. **Yin (contenido completo, imagen pendiente):** `yin-stillness` ordena la práctica desde la llegada y la apertura suave hasta las posturas de suelo, los rebotes y Savasana; sus intervalos contemplan ambos lados.
4. **Aerial (contenido completo, imagen pendiente):** `aerial-foundations` mantiene el repaso en suelo, modo de estudio y límites de seguridad para la práctica supervisada.
5. **Pranayama, Mantras, Anatomía, Kriyas, Meditación y Ayurveda:** ampliar las colecciones que hoy tienen una sola ficha, según el alcance ya previsto, sin crear secciones nuevas.
6. **Horario y herramientas de estudio:** revisar cobertura y textos de las cinco clases, seis tarjetas y cinco preguntas; localizar en español los nombres de categoría usados como filtros si el diseño actual permite hacerlo.
7. **Imágenes (portadas provisionales completas; arte final pendiente):** las 32 fichas de postura y las ocho secuencias ya apuntan a SVG locales específicos según `IMAGES_TODO.md`. Las tarjetas de secuencia muestran su portada responsive con alt y fallback; queda reemplazar el arte provisional y completar alt/fallback en las tarjetas generales de contenido.
8. **Verificación de contenido (pendiente):** validar rutas y datos de cada ficha, revisar imágenes referenciadas y repetir build, lint y pruebas existentes después de implementar contenido.

## Decisiones y límites de la auditoría inicial

- En la auditoría inicial no se añadieron ni eliminaron secciones ni se modificó código.
- Los nombres de secciones, categorías y modelos se mantienen tal como existen hoy; el catálogo usa campos localizados para español e inglés.
- Se conservará el carácter de “adaptación breve” de Surya Namaskar y “repaso supervisado” de Aerial.
- No se ejecutaron build, lint ni pruebas: esta fase solicitó auditoría y plan, sin cambios de código.

## Esquema de secuencias y posturas

**Actualización:** se mantuvieron los campos existentes de secuencia porque ya cubrían nombre, nivel, duración total, objetivo, descripción, imagen y lista ordenada. `Sequence.duration` y `SequenceStep.duration` se expresan en segundos. `Sequence.steps` conserva su orden y usa `contentId` como referencia estable a la ficha de postura o práctica.

| Entidad | Esquema final |
| --- | --- |
| Secuencia (`Sequence`) | `id`; `name` localizado (`es`/`en`); `level`; `duration` total en segundos; `objective`; `description`; `image`; `steps[]` ordenados; `style` y `demo` existentes. |
| Paso (`SequenceStep`) | `key`; `contentId` (se conserva para compatibilidad); `duration` del temporizador en segundos; `stage`; `breaths` opcional como indicación de ciclos respiratorios. La duración continúa siendo obligatoria para poder sumar el total aunque se muestre una cuenta de respiraciones. |
| Postura (`PoseBase`) | Campos heredados de `ContentBase`: `id`, `name.es`, `duration` en segundos, `breathing`, `image` y `safety`; más `sanskrit` (cadena o `null` cuando no existe un nombre tradicional aplicable), `instructionSteps` localizados como listas, `commonMistakes`, `modifications`, `contraindications` y `breaths` opcional. Asana, Yin y Aerial conservan sus campos propios. |

### Compatibilidad y migración

- No se renombraron `Sequence.steps`, `contentId` ni `duration`, ni se cambió la versión `yoga-journey:v1` del almacenamiento local. `breaths` es opcional, por lo que las clases guardadas anteriormente siguen teniendo la misma forma válida.
- El parser migra una clase guardada cuyo total falte o difiera de la suma de sus pasos: recalcula `duration` antes de validar y devolver el estado. Los demás datos y el orden de los pasos se preservan.
- Las fichas estáticas previas conservan `instructions` en Asana y `entry` en Yin/Aerial. `splitInstructionSteps` deriva listas localizadas a partir de sus frases existentes, sin descartar el texto original; el detalle y el reproductor presentan la lista como pasos.
- Se completó el esquema común para Yin con errores habituales y nombre sánscrito en Mariposa (`Baddha Koṇāsana`). En Aerial, Asiento con apoyo usa `sanskrit: null` para declarar que la configuración no tiene un nombre sánscrito tradicional, sin inventarlo.

### Validación e integración

- `src/lib/sequence-validation.ts` exporta `validateSequenceDuration`, que devuelve duración declarada, suma calculada y estado de coincidencia; rechaza pasos vacíos, tiempos no enteros o totales que no coinciden.
- La validación se usa al guardar clases propias, al leer el estado persistido y antes de reproducir una secuencia. Las tarjetas muestran `Sequence.duration` como valor canónico.
- El detalle de postura y el reproductor muestran `instructionSteps` como lista ordenada. Los pasos admiten una cuenta opcional de respiraciones además del temporizador en segundos.
- Se actualizaron pruebas existentes para comprobar el helper y la migración de una clase guardada con el total desactualizado.
- Verificación de esta actualización: `npm run typecheck`, `npm test` (9 pruebas), `npm run lint` y `npm run build` finalizaron correctamente.

## Biblioteca central de posturas

Se completaron las 32 fichas existentes. Las ocho secuencias usan 31 posturas distintas y Cobra baja queda disponible como variante de Bastón de cuatro apoyos y Perro boca arriba. El índice `posesById` de `src/content/catalog.ts` resuelve los pasos por `contentId` y el catálogo general reutiliza esas mismas fichas.

Cada ficha tiene instrucciones ordenadas, tiempo orientativo, respiración, errores comunes, adaptación y precauciones específicas. Los tiempos de la tabla se refieren a la ficha individual. El intervalo del paso en una secuencia puede incluir la entrada, la salida, el cambio de lado o una pausa.

Mariposa con apoyo se distingue de Ángulo unido por el pliegue pasivo sobre un cojín, los talones más alejados y la permanencia Yin. Las dos variantes mantienen sus IDs y sus fichas. Plancha conserva el ID histórico `phalahakasana` para que las secuencias guardadas sigan resolviendo su referencia. Asiento con apoyo usa `sanskrit: null` y su minuto corresponde al repaso en suelo con silla.

Los campos `image` y `thumbnail` apuntan ahora a SVG locales provisionales específicos por postura, bajo `/images/poses/`. Los archivos fuente y los derivados WebP responsivos se generan con `scripts/create-assets.mjs`.

| Sección | Postura completada | ID | Tiempo de ficha |
| --- | --- | --- | ---: |
| Ashtanga / Hatha | Montaña | `tadasana` | 25 s |
| Ashtanga / Hatha | Triángulo extendido | `utthita-trikonasana` | 40 s |
| Ashtanga / Hatha | Flexión con agarre de dedos | `padangusthasana` | 25 s |
| Ashtanga / Hatha | Manos bajo los pies | `pada-hastasana` | 20 s |
| Ashtanga / Hatha | Ángulo unido | `baddha-konasana` | 35 s |
| Ashtanga / Hatha | Cobra baja | `bhujangasana` | 20 s (variante) |
| Ashtanga / Hatha | Asiento cómodo | `sukhasana` | 45 s |
| Ashtanga / Hatha | Descanso consciente | `savasana` | 90 s |
| Ashtanga / Hatha | Brazos elevados | `urdhva-hastasana` | 15 s |
| Ashtanga / Hatha | Flexión de pie | `uttanasana` | 25 s |
| Ashtanga / Hatha | Media flexión de pie | `ardha-uttanasana` | 15 s |
| Ashtanga / Hatha | Plancha | `phalahakasana` | 20 s |
| Ashtanga / Hatha | Bastón de cuatro apoyos | `chaturanga-dandasana` | 15 s |
| Ashtanga / Hatha | Perro boca arriba | `urdhva-mukha-svanasana` | 15 s |
| Ashtanga / Hatha | Perro boca abajo | `adho-mukha-svanasana` | 25 s |
| Ashtanga / Hatha | Silla | `utkatasana` | 20 s |
| Ashtanga / Hatha | Guerrero I | `virabhadrasana-i` | 35 s |
| Ashtanga / Hatha | Guerrero II | `virabhadrasana-ii` | 40 s |
| Ashtanga / Hatha | Ángulo lateral extendido | `utthita-parsvakonasana` | 40 s |
| Ashtanga / Hatha | Flexión de pie con piernas separadas | `prasarita-padottanasana` | 30 s |
| Ashtanga / Hatha | Pirámide | `parsvottanasana` | 35 s |
| Ashtanga / Hatha | Bastón sentado | `dandasana` | 30 s |
| Ashtanga / Hatha | Flexión sentada | `paschimottanasana` | 35 s |
| Ashtanga / Hatha | Media torsión sentada | `ardha-matsyendrasana` | 35 s |
| Ashtanga / Hatha | Puente | `setu-bandha-sarvangasana` | 25 s |
| Ashtanga / Hatha | Piernas en la pared | `viparita-karani` | 60 s |
| Yin | Mariposa con apoyo | `butterfly` | 120 s |
| Yin | Dragón bajo | `dragon` | 90 s |
| Yin | Esfinge | `sphinx` | 60 s |
| Yin | Niño con apoyo | `supported-child` | 90 s |
| Yin | Torsión tumbada | `reclined-twist` | 90 s |
| Aerial | Asiento con apoyo | `supported-seat` | 60 s |

La verificación cubrió IDs únicos en kebab-case, fichas con campos completos en ambos idiomas y referencias válidas en las ocho secuencias. Pasaron las 10 pruebas, TypeScript, lint y el build estático de 112 páginas.

Referencias editoriales para la técnica y las precauciones de la biblioteca. [Common Yoga Protocol, Ministry of Ayush](https://yoga.ayush.gov.in/public/assets/front/pdf/CYPEnglishLeaflet.pdf), [Yoga: Effectiveness and Safety, NCCIH](https://www.nccih.nih.gov/health/yoga-effectiveness-and-safety), [Surya Namaskara A, AshtangaYoga.info](https://www.ashtangayoga.info/ashtanga-yoga/surya-namaskara-a-sun-salutation/item/urdhva-mukha-shvanasana/?cHash=7ce3fc3ac2f5713cf241628956799281), [Three Beginning Flows, Yin Yoga](https://yinyoga.com/yinsights/three-beginning-flows/).

## Secuencias de Ashtanga

La primera tanda sigue el orden del plan. Cada secuencia conserva su nombre, nivel y duración. Los objetivos concretan la intención original de coordinar el movimiento con la respiración en un rango cómodo. Cada paso usa una ficha de la biblioteca mediante su ID.

| Secuencia | Calentamiento | Posturas principales | Enfriamiento | Savasana | Total | Estado |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| Surya Namaskar A · adaptación breve (`surya-a`) | 100 s | 65 s | 75 s | 120 s | 360 s | contenido completo, imagen pendiente |
| Surya Namaskar B · adaptación breve (`surya-b`) | 110 s | 250 s | 60 s | 120 s | 540 s | contenido completo, imagen pendiente |
| Fundamentos de pie · Standing (`standing`) | 180 s | 240 s | 90 s | 150 s | 660 s | contenido completo, imagen pendiente |
| Ashtanga · fundamentos de la serie primaria (`primary-series`) | 330 s | 795 s | 75 s | 330 s | 1530 s | contenido completo, imagen pendiente |
| Cierre · suelo y descanso (`finishing`) | 120 s | 140 s | 60 s | 160 s | 480 s | contenido completo, imagen pendiente |

Surya A usa Cobra baja y admite apoyar las rodillas en Plancha. Surya B reserva un paso para ambos lados de Guerrero I y usa los intervalos de descenso para incluir una pausa cuando haga falta. Fundamentos de pie da tiempo para cambiar de lado. La selección de la serie primaria enlaza posturas de pie y sentadas, y Cierre empieza con una preparación suave en el suelo. Las cinco propuestas son adaptaciones para la app. [Saludo al sol A, AshtangaYoga.info](https://www.ashtangayoga.info/ashtanga-yoga/surya-namaskara-a-sun-salutation/), [Series de práctica de Ashtanga](https://www.ashtangayoga.info/ashtanga-yoga/traditional-practice-series/).

Se comprobó que cada suma coincide con el total declarado, que las cuatro fases aparecen en orden y que todos los IDs resuelven a fichas existentes. Pasaron TypeScript, lint, las 10 pruebas y el build estático.

## Secuencias de Hatha, Yin Yoga y Aerial Yoga

Se completaron las tres secuencias de estas secciones, conservando nombres, niveles, duraciones, estilos e IDs existentes. Las descripciones y objetivos ahora son específicos de cada práctica y los pasos asignan las fases de forma explícita. No se agregaron posturas a la biblioteca porque todas las referencias ya existían.

| Sección | Secuencia | Llegada | Calentamiento | Posturas principales | Enfriamiento | Savasana | Total | Estado |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Hatha | Volver a las bases (`hatha-foundations`) | 30 s | 90 s | 240 s | 75 s | 60 s | 495 s (8 min 15 s) | contenido completo, imagen pendiente |
| Yin Yoga | Un espacio de quietud (`yin-stillness`) | 150 s | 240 s | 540 s | 510 s | 240 s | 1.680 s (28 min) | contenido completo, imagen pendiente |
| Aerial Yoga | Aerial · repaso supervisado (`aerial-foundations`) | 90 s | 90 s | 120 s | 60 s | 90 s | 450 s (7 min 30 s) | contenido completo, imagen pendiente |

Hatha reparte 80 segundos por postura de pie para practicar ambos lados dentro del mismo intervalo. Yin incluye los dos lados en los intervalos de Dragón bajo y Torsión tumbada; el tiempo del paso incluye entrada, salida y descanso, no exige sostener la postura durante todo el temporizador. Aerial se conserva como repaso en silla y en el suelo, no como secuencia para cargar peso en una hamaca; la ficha `studyOnly` mantiene desactivado el modo de práctica autónoma.

Se verificaron las tres sumas (495, 1.680 y 450 segundos), el orden de las fases y la resolución de las referencias de postura. Las imágenes de secuencia existentes siguen siendo provisionales y están pendientes de reemplazo según `IMAGES_TODO.md`.

## Imágenes de posturas

Se completaron las imágenes provisionales de las 32 posturas de la biblioteca en `/public/images/poses/`, con SVGs de silueta esquemática en una paleta común. Los campos `image` y `thumbnail` de las 26 asanas, cinco posturas Yin y una ficha Aerial apuntan al archivo `.svg` que coincide con su ID. El generador conserva estos dibujos y produce derivados WebP responsivos para compatibilidad con otros usos.

| Lote | Posturas | Estado | Rango de IDs |
| --- | ---: | --- | --- |
| 1 | 16 de 32 | completo | `tadasana` → `utkatasana` |
| 2 | 16 de 32 | completo | `virabhadrasana-i` → `supported-seat` |

**Punto de continuación:** las 32 imágenes de postura están cubiertas; no queda un lote de posturas pendiente. Queda reemplazar las 32 ilustraciones provisionales por arte final. `IMAGES_TODO.md` contiene las rutas exactas de posturas y secuencias que conviene reemplazar. Las ocho portadas de secuencia se completaron en una tanda posterior y siguen siendo provisionales.

La comprobación automática encontró los 32 SVG, confirmó que cada campo `image` coincide con el ID y que no hay rutas inexistentes. Pasaron TypeScript, lint y las 10 pruebas. El build estático no pudo reemplazar `.next` porque hay un servidor de desarrollo activo usando esa carpeta (Windows devolvió `EPERM` al intentar quitar un segmento); queda repetir el build cuando ese servidor se detenga.

## Portadas de secuencias

Se crearon portadas SVG específicas para las ocho secuencias existentes: cinco de Ashtanga, Hatha · Volver a las bases, Yin · Un espacio de quietud y Aerial · repaso supervisado. Cada portada combina tres figuras de posturas vinculadas a esa práctica, con la paleta de la aplicación. Los campos `Sequence.image` apuntan a `/images/sequences/<id>.svg`; no se usaron recursos externos.

| Sección | Secuencia | Archivo | Estado |
| --- | --- | --- | --- |
| Ashtanga | Surya Namaskar A · adaptación breve | `public/images/sequences/surya-a.svg` | portada provisional completa |
| Ashtanga | Surya Namaskar B · adaptación breve | `public/images/sequences/surya-b.svg` | portada provisional completa |
| Ashtanga | Fundamentos de pie · Standing | `public/images/sequences/standing.svg` | portada provisional completa |
| Ashtanga | Fundamentos de la serie primaria | `public/images/sequences/primary-series.svg` | portada provisional completa |
| Ashtanga | Cierre · suelo y descanso | `public/images/sequences/finishing.svg` | portada provisional completa |
| Hatha | Volver a las bases | `public/images/sequences/hatha-foundations.svg` | portada provisional completa |
| Yin Yoga | Un espacio de quietud | `public/images/sequences/yin-stillness.svg` | portada provisional completa |
| Aerial Yoga | Aerial · repaso supervisado | `public/images/sequences/aerial-foundations.svg` | portada provisional completa |

`SequenceCard` ahora renderiza la portada con tamaño responsive y texto alternativo localizado; si la carga falla, muestra un símbolo de estudio accesible. Las ocho rutas exactas están en `IMAGES_TODO.md` para reemplazar estas composiciones esquemáticas por arte final. `scripts/create-assets.mjs` genera las composiciones y sus derivados WebP, evitando que la generación vuelva a sustituirlas por una ilustración genérica.

La generación de assets finalizó; la comprobación de rutas encontró ocho portadas válidas. Pasaron TypeScript, lint y las 10 pruebas. El build permanece pendiente porque el servidor de desarrollo activo mantiene bloqueado el directorio `.next`, según la incidencia registrada en la sección anterior.

## Integración y renovación de las ilustraciones

Se reemplazaron las ilustraciones provisionales de las 32 posturas y las 8 portadas por un mismo personaje articulado en SVG. Todas usan un lienzo de 480 × 360 y el mismo diseño de ropa, pelo, cara y extremidades. Las posturas de suelo muestran una esterilla. La portada de cada secuencia muestra una postura de sus propios pasos. La portada de inicio, la imagen genérica de estudio y las rutas antiguas también usan el personaje nuevo.

| Lote | Posturas | Rango en el generador | Revisión |
| --- | ---: | --- | --- |
| 1 | 11 | `tadasana` → `ardha-uttanasana` | SVG renderizados. Se ajustó el contacto de las manos en la media flexión. |
| 2 | 11 | `phalahakasana` → `dandasana` | SVG renderizados. Se comprobó la distinción visual entre los apoyos y las posturas de pie. |
| 3 | 10 | `paschimottanasana` → `supported-seat` | SVG renderizados. Se ajustó el cojín en Niño y se redibujó la torsión tumbada desde arriba. |

**Estado actual:** 8 secuencias, 32 posturas y 51 fichas. No quedan imágenes provisorias de la tanda anterior. Las vistas que se beneficiarían de una revisión anatómica docente están en `IMAGES_REVIEW.md`.

Las tarjetas y las fichas conservan las rutas locales por ID y muestran descripciones alternativas en español e inglés. El detalle de secuencia muestra portada, objetivo, nivel y tiempo exacto. El reproductor conserva el tiempo de cada paso y cambia la imagen con la postura. Las fichas siguen usando las pestañas existentes para mostrar instrucciones, respiración, adaptaciones, errores comunes y precauciones. Las listas cargan las imágenes de forma diferida y las vistas ofrecen una alternativa si un recurso falla.

`npm run validate:content` comprueba textos vacíos o provisorios, referencias, duración total, rutas locales, textos alternativos y lienzo de los SVG. Las comprobaciones de build, TypeScript, lint y las 10 pruebas resolvieron el build pendiente de la tanda anterior.

Se verificaron 11 rutas en un navegador a 390 y 1366 px. Las páginas revisadas no mostraron desbordamiento horizontal ni imágenes sin texto alternativo. En Hatha, el avance desde Asiento cómodo a Brazos elevados cambió la ilustración y el temporizador de 30 a 15 segundos. El reproductor mostró la alternativa al simular un error de carga y Aerial conservó el modo de estudio supervisado.

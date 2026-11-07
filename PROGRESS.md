# Auditoría y plan de Yoga Journey

**Fecha:** 2026-11-07
**Alcance de esta fase:** auditoría de solo lectura del repositorio. No se modificaron código, contenido ni assets; este archivo es el único cambio solicitado.

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

## Estado de secuencias

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

1. **Ashtanga:** revisar progresión y fases de las cinco secuencias existentes, definir objetivos descriptivos por secuencia y comprobar sus tiempos y alternativas sin presentarlas como series tradicionales completas.
2. **Hatha:** revisar la progresión de `hatha-foundations`, aclarar el objetivo propio y verificar que calentamiento, posturas principales, enfriamiento y Savasana estén bien representados.
3. **Yin:** completar el nombre sánscrito cuando corresponda, decidir cómo representar errores comunes en el esquema actual y revisar permanencias, rebotes y precauciones de `yin-stillness`.
4. **Aerial:** mantener el carácter supervisado, explicitar duración/alcance de cada paso y tratar el nombre sánscrito como “no aplica” cuando la postura sea una configuración de estudio, en lugar de inventarlo.
5. **Pranayama, Mantras, Anatomía, Kriyas, Meditación y Ayurveda:** ampliar las colecciones que hoy tienen una sola ficha, según el alcance ya previsto, sin crear secciones nuevas.
6. **Horario y herramientas de estudio:** revisar cobertura y textos de las cinco clases, seis tarjetas y cinco preguntas; localizar en español los nombres de categoría usados como filtros si el diseño actual permite hacerlo.
7. **Imágenes e integración:** reemplazar arte provisional conforme a `IMAGES_TODO.md`, mostrar la imagen de secuencia en la UI existente, añadir alt descriptivo y fallback local manteniendo los componentes y estilos actuales.
8. **Verificación de la siguiente fase:** validar rutas y datos de cada ficha, revisar imágenes referenciadas y ejecutar build, lint y pruebas existentes después de implementar contenido.

## Decisiones y límites de la auditoría

- No se añadieron ni eliminaron secciones. El único archivo editado en esta fase es `PROGRESS.md`.
- Los nombres de secciones, categorías y modelos se mantienen tal como existen hoy; el catálogo usa campos localizados para español e inglés.
- Se conservará el carácter de “adaptación breve” de Surya Namaskar y “repaso supervisado” de Aerial.
- No se ejecutaron build, lint ni pruebas: esta fase solicitó auditoría y plan, sin cambios de código.

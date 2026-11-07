# Progreso de Yoga Journey

## Estado inicial de esta fase

- El repositorio no tenía `PROGRESS.md` ni commits previos.
- La app ya incluye 11 secciones, rutas de catálogo y detalle, reproductor, constructor de clases, flashcards, quizzes y persistencia local.
- Los datos viven en catálogos TypeScript tipados bajo `src/content/`. Las secuencias referencian posturas mediante `contentId`. Las imágenes se generan de manera local desde ilustraciones SVG y sus derivados WebP.
- Había secuencias con IDs sin ficha, fichas de muestra escasas y arte genérico. El reproductor ya tolera datos antiguos o incompletos con un estado vacío seguro.

## Decisiones

- Mantener la arquitectura App Router, catálogos tipados, estilos y rutas existentes.
- Escribir las fichas y los nombres de las posturas en español. Se conserva la forma localizada existente de los datos porque el selector de idioma y los componentes ya dependen de ella.
- Usar tiempos por postura que sumen la duración declarada de cada secuencia. En Ashtanga, la selección es una adaptación pedagógica breve, no una reconstrucción certificada de una serie tradicional.
- Mantener las inversiones, técnicas de limpieza y yoga aéreo con las precauciones ya definidas. Los pasos aéreos del reproductor son repasos teóricos supervisados, no instrucciones para suspenderse.
- Las ilustraciones generadas localmente son provisionales y no se presentan como demostraciones anatómicas precisas.

## Hecho

- Ocho secuencias existentes de Ashtanga, Hatha, Yin y Aerial tienen objetivo, nivel, duración calculada, fases y pasos ordenados. Los segundos suman el total anunciado.
- Se completaron las 18 fichas de Ashtanga/Hatha usadas por el reproductor y 4 fichas Yin. Cada una tiene permanencia, instrucciones, respiración, errores habituales, variantes y precauciones.
- La secuencia aérea recorre una ficha de estudio supervisado y opciones de suelo. El reproductor bloquea el modo autónomo cuando la secuencia incluye contenido aéreo.
- Opening y closing mantras muestran texto, transliteración, significado y contexto. La sección de Aerial describe el alcance seguro de su ficha.
- Cada una de las 32 fichas y 8 secuencias tiene una ruta de imagen local. El script genera WebP responsivos. Se reforzaron tests de imágenes, IDs y duración.
- `IMAGES_TODO.md` enumera los archivos exactos que necesitan arte final.
- No quedan marcadores `placeholder`, `lorem ipsum`, `muestra`, `pendiente`, `sample`, `TODO` ni `TBD` en `src/content`.
- Linter, TypeScript, 8 tests y build de exportación estática pasan en ejecuciones separadas.

## Decisiones

- Mantener App Router, modelos, catálogos, estilos, navegación y almacenamiento existentes.
- El catálogo conserva las propiedades localizadas `es` y `en` requeridas por la UI. Se redactó el contenido español de las fichas y se añadieron equivalentes breves donde el esquema obliga a ofrecer ambos idiomas.
- Las secuencias Ashtanga se presentan como adaptaciones pedagógicas introductorias, sin afirmar que reproducen íntegramente el método tradicional.
- Las posturas nuevas usan una ilustración genérica local con el ID correcto. `IMAGES_TODO.md` identifica cada archivo, pues la figura no pretende demostrar alineación específica.
- No se añadió backend ni dependencia. El repositorio estaba vacío y sin historial. El primer commit asentará la aplicación local completa y este contenido.

## Pendiente

- Validación pedagógica y de terminología por docentes de yoga.
- Reemplazar ilustraciones provisionales por arte final revisado según `IMAGES_TODO.md`.
- Añadir grabaciones propias a los mantras.
- Ampliar el contenido conceptual de anatomía, Ayurveda, kriyas, meditación y pranayama para cubrir un plan completo de formación de 200 horas. Las fichas actuales son una base de estudio funcional, no un currículo acreditado.

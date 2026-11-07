# Yoga Journey — architecture

## Scope
A local-first, bilingual 200-hour YTT study application. No accounts, backend, external APIs or publishing. Seed content demonstrates features; it is not a complete training syllabus.

## Layers
- `src/content`: typed, bilingual records. Asanas have one canonical identity; sequences contain IDs. Section catalogs are loaded on their routes. A lightweight search index powers discovery.
- `src/lib`: domain models, selectors and versioned local persistence. Personal data includes favorites, notes, language, theme, visits, completed sessions, flashcard reviews, quiz attempts and saved sequences.
- `src/components`: accessible reusable UI and independent practice, study and teaching tools.
- `src/app`: Next.js App Router layouts and statically generated pages. No server data mutations.

## Routes
- `/`: personal dashboard.
- `/learn`, `/practice`, `/teach`, `/study`, `/schedule`, `/search`.
- `/ashtanga`, `/hatha`, `/yin`, `/aerial`, `/pranayama`, `/mantras`, `/anatomy`, `/kriyas`, `/meditation`, `/ayurveda`.
- `/<section>/<id>`: permanent study detail, including shared asanas under Hatha and Ashtanga.
- `/practice/<sequence-id>`: reusable sequence player; `/practice/custom?id=…` for local classes.
- `/teach/builder`, `/teach/sequences`, `/teach/notes`.
- `/study/flashcards`, `/study/quiz`, `/study/favorites`, `/study/progress`.

## Models
`Asana`, `Sequence`, `YinPose`, `AerialPose`, `PranayamaTechnique`, `Mantra`, `AnatomyTopic`, `Kriya`, `MeditationPractice`, `AyurvedaTopic`, `ScheduleItem`, `QuizQuestion`, `Flashcard`, `UserNote` share localized primitives and stable IDs. Safety is explicit; advanced aerial content is study-only.

## Local state
Versioned localStorage is sufficient for the representative catalog and personal text. A provider loads after hydration, synchronizes browser tabs, validates imports, reports storage failures and supports JSON backup/restore. No personal data is sent over the network.

## Components
AppShell, SectionHeader, ContentCard, DetailTabs, FavoriteButton, NotesEditor, SafetyAlert, AudioPlayer, Timer, SequencePlayer, GlobalSearch, ClassBuilder, Flashcards, Quiz, ProgressBar. shadcn-style Radix Tabs and Button are local, reusable components.

## Offline and performance
Static Next export, local imagery, web manifest and service worker. Precache the application shell; cache same-origin pages/assets as visited, with an offline fallback. Split interactive teaching/study modules by route and keep full content out of the shared layout. No remote fonts or assets required at runtime.

## Validation
Run lint, TypeScript and production build. Verify catalog references and local persistence, timers and quiz scoring. Manually inspect 375/390/430px, tablet and desktop; confirm offline revisits after service-worker activation.

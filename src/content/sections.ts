import { l } from "@/lib/utils";
import type { SectionId } from "@/lib/models";
export const sections: {
  id: SectionId;
  name: ReturnType<typeof l>;
  description: ReturnType<typeof l>;
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
    icon: "sun",
    color: "sage",
  },
  {
    id: "hatha",
    name: l("Hatha", "Hatha"),
    description: l("Las bases de tu práctica", "Ground your practice"),
    icon: "person",
    color: "peach",
  },
  {
    id: "yin",
    name: l("Yin Yoga", "Yin Yoga"),
    description: l("Espacio para la quietud", "Make room for stillness"),
    icon: "moon",
    color: "lavender",
  },
  {
    id: "aerial",
    name: l("Aerial Yoga", "Aerial Yoga"),
    description: l("Explora con apoyo", "Explore with support"),
    icon: "wind",
    color: "blue",
  },
  {
    id: "pranayama",
    name: l("Pranayama", "Pranayama"),
    description: l("El arte de respirar", "The art of breathing"),
    icon: "wind",
    color: "sage",
  },
  {
    id: "mantras",
    name: l("Mantras", "Mantras"),
    description: l("Sonido e intención", "Sound and intention"),
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
    icon: "drop",
    color: "sand",
  },
  {
    id: "meditation",
    name: l("Meditación", "Meditation"),
    description: l("Vuelve al presente", "Return to the present"),
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

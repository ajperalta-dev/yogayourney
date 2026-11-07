import type { ScheduleItem } from "@/lib/models";
import { l } from "@/lib/utils";
export const schedule: ScheduleItem[] = [
  {
    id: "morning",
    time: "06:00",
    end: "06:30",
    name: l("Meditación y respiración", "Meditation & breathwork"),
    section: "meditation",
    location: l("Sala de práctica", "Practice shala"),
    days: [1, 2, 3, 4, 5, 6],
  },
  {
    id: "asana",
    time: "06:30",
    end: "08:00",
    name: l("Práctica de Ashtanga", "Ashtanga practice"),
    section: "ashtanga",
    location: l("Sala de práctica", "Practice shala"),
    days: [1, 2, 3, 4, 5, 6],
  },
  {
    id: "anatomy",
    time: "10:00",
    end: "11:00",
    name: l("Anatomía del movimiento", "Anatomy of movement"),
    section: "anatomy",
    location: l("Sala de estudio", "Study room"),
    days: [1, 2, 3, 4, 5, 6],
  },
  {
    id: "hatha",
    time: "16:00",
    end: "17:30",
    name: l("Hatha y metodología", "Hatha & teaching methodology"),
    section: "hatha",
    location: l("Sala de práctica", "Practice shala"),
    days: [1, 2, 3, 4, 5, 6],
  },
  {
    id: "yin",
    time: "18:00",
    end: "18:45",
    name: l("Yin y reflexión", "Yin & reflection"),
    section: "yin",
    location: l("Sala de práctica", "Practice shala"),
    days: [1, 2, 3, 4, 5, 6],
  },
];

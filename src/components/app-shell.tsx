"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  Home,
  BookOpen,
  Play,
  Layers3,
  GraduationCap,
  CalendarDays,
  Search,
  Flower2,
  MapPin,
  PanelLeftClose,
  Menu,
  Sun,
  Moon,
  Monitor,
  ArrowUpRight,
  WifiOff,
} from "lucide-react";
import { useLocal } from "./providers";
import { Button } from "./ui/button";
import { ProgressBar } from "./common";
const nav = [
  { href: "/", es: "Inicio", en: "Home", icon: Home },
  { href: "/learn/", es: "Aprender", en: "Learn", icon: BookOpen },
  { href: "/practice/", es: "Practicar", en: "Practice", icon: Play },
  { href: "/teach/", es: "Enseñar", en: "Teach", icon: Layers3 },
  { href: "/study/", es: "Repasar", en: "Study", icon: GraduationCap },
  { href: "/schedule/", es: "Horario", en: "Schedule", icon: CalendarDays },
];
export function AppShell({
  children,
  total,
}: {
  children: ReactNode;
  total: number;
}) {
  const { state, update, t, error } = useLocal();
  const path = usePathname();
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const [query, setQuery] = useState("");
  const visited = Object.keys(state.visited).length;
  const percent = Math.min(100, Math.round((visited / total) * 100));
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        {t("Saltar al contenido", "Skip to content")}
      </a>
      {menu && (
        <button
          className="sidebar-scrim"
          aria-label={t("Cerrar menú", "Close menu")}
          onClick={() => setMenu(false)}
        />
      )}
      <aside className={`sidebar ${menu ? "is-open" : ""}`}>
        <Link href="/" className="brand" onClick={() => setMenu(false)}>
          <span className="brand-mark">
            <Image
              src="/logo.png"
              alt=""
              width={38}
              height={38}
              priority
            />
          </span>
          <span>
            yoga<span className="brand-secondary">journey</span>
          </span>
        </Link>
        <div className="sidebar-label">YOUR PERSONAL YTT COMPANION</div>
        <div className="course-badge">
          <span className="status-dot" />
          200 HOURS · TEACHER TRAINING
        </div>
        <nav aria-label={t("Navegación principal", "Main navigation")}>
          {nav.map((n) => {
            const active =
              n.href === "/"
                ? path === "/"
                : path.startsWith(n.href) ||
                  (n.href === "/learn/" &&
                    /^\/(hatha|ashtanga|yin|aerial|anatomy|pranayama|meditation|ayurveda|kriyas|mantras)\//.test(
                      path,
                    ));
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`nav-link ${active ? "active" : ""}`}
                onClick={() => setMenu(false)}
              >
                <n.icon size={20} />
                {t(n.es, n.en)}
                {active && <span className="nav-dot" />}
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-progress">
            <div className="row between">
              <span>
                {t("Tu camino de aprendizaje", "Your learning journey")}
              </span>
              <strong>{percent}%</strong>
            </div>
            <ProgressBar
              value={percent}
              label={t("Progreso de estudio", "Study progress")}
            />
            <small>
              {visited} / {total} {t("fichas exploradas", "entries explored")}
            </small>
          </div>
          <div className="location">
            <MapPin size={15} />
            <span>
              Rishikesh, India
              <small>
                {t("Aprende. Practica. Comparte.", "Learn. Practice. Share.")}
              </small>
            </span>
          </div>
        </div>
        <button
          className="mobile-close"
          onClick={() => setMenu(false)}
          aria-label={t("Cerrar menú", "Close menu")}
        >
          <PanelLeftClose />
        </button>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <Button
            className="mobile-menu"
            variant="ghost"
            size="icon"
            onClick={() => setMenu(true)}
            aria-label={t("Abrir menú", "Open menu")}
          >
            <Menu />
          </Button>
          <form
            className="global-search"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/search/?q=${encodeURIComponent(query)}`);
            }}
          >
            <Search size={18} />
            <input
              aria-label={t("Búsqueda global", "Global search")}
              placeholder={t(
                "Busca una postura, un concepto, una intención…",
                "Search a pose, a concept, an intention…",
              )}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button aria-label={t("Buscar", "Search")} type="submit">
              <ArrowUpRight size={16} />
            </button>
          </form>
          <div className="top-actions">
            <span className="local-label">
              <span className="status-dot" />
              {t("Tu espacio personal", "Your personal space")}
            </span>
            <select
              aria-label={t("Idioma", "Language")}
              value={state.language}
              onChange={(e) =>
                update((s) => ({
                  ...s,
                  language: e.target.value as "es" | "en",
                }))
              }
            >
              <option value="es">ES</option>
              <option value="en">EN</option>
            </select>
            <div className="theme-control">
              {state.theme === "dark" ? (
                <Moon size={17} />
              ) : state.theme === "light" ? (
                <Sun size={17} />
              ) : (
                <Monitor size={17} />
              )}
              <select
                aria-label={t("Tema", "Theme")}
                value={state.theme}
                onChange={(e) =>
                  update((s) => ({
                    ...s,
                    theme: e.target.value as "light" | "dark" | "system",
                  }))
                }
              >
                <option value="system">{t("Sistema", "System")}</option>
                <option value="light">{t("Claro", "Light")}</option>
                <option value="dark">{t("Oscuro", "Dark")}</option>
              </select>
            </div>
          </div>
        </header>
        {error && (
          <div className="storage-error" role="alert">
            <WifiOff size={18} />
            {t(
              "No se pudo leer o guardar en este navegador. Exporta tus datos desde Progreso antes de cerrar.",
              "This browser could not read or save data. Export a backup from Progress before closing.",
            )}
          </div>
        )}
        <main id="main" className="main-content">
          {children}
        </main>
        <footer className="footer">
          <span>
            YOGA JOURNEY <span>·</span>{" "}
            {t("Un día, una práctica.", "One day, one practice.")}
          </span>
          <span>
            {t(
              "Hecho para aprender a tu ritmo",
              "Made for learning at your own pace",
            )}{" "}
            <Flower2 size={13} />
          </span>
        </footer>
      </div>
    </div>
  );
}

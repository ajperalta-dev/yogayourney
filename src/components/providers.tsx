/* eslint-disable react-hooks/set-state-in-effect -- Hydrate browser-only storage or local clock after the static HTML has hydrated. */
"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { defaultState, parseState, STORAGE_KEY } from "@/lib/storage";
import type { PersonalState } from "@/lib/models";
type Store = {
  state: PersonalState;
  ready: boolean;
  error: boolean;
  update: (fn: (previous: PersonalState) => PersonalState) => void;
  t: (es: string, en: string) => string;
};
const Context = createContext<Store | null>(null);
export function Providers({ children }: { children: ReactNode }) {
  const [state, setState] = useState(defaultState);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState(parseState(raw));
    } catch {
      setError(true);
    } finally {
      setReady(true);
    }
    function sync(e: StorageEvent) {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setState(parseState(e.newValue));
        } catch {
          setError(true);
        }
      }
    }
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  const update = useCallback(
    (fn: (s: PersonalState) => PersonalState) =>
      setState((previous) => {
        const next = fn(previous);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          queueMicrotask(() => setError(true));
        }
        return next;
      }),
    [],
  );
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () =>
      document.documentElement.classList.toggle(
        "dark",
        state.theme === "dark" || (state.theme === "system" && media.matches),
      );
    apply();
    media.addEventListener("change", apply);
    document.documentElement.lang = state.language;
    return () => media.removeEventListener("change", apply);
  }, [state.theme, state.language]);
  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production")
      navigator.serviceWorker.register("/sw.js").catch(() => {});
  }, []);
  return (
    <Context.Provider
      value={{
        state,
        ready,
        error,
        update,
        t: (es, en) => (state.language === "es" ? es : en),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useLocal() {
  const store = useContext(Context);
  if (!store) throw new Error("Missing local provider");
  return store;
}

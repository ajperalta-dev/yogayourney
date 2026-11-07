import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/providers";
import { AppShell } from "@/components/app-shell";
import { catalog } from "@/content/catalog";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "Yoga Journey · Your personal YTT companion",
    template: "%s · Yoga Journey",
  },
  description:
    "Tu espacio personal para estudiar, practicar y enseñar yoga. 200 Hours YTT · Rishikesh, India.",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg", apple: "/icon-192.png" },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Yoga Journey",
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#365b4b",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <Providers>
          <AppShell total={catalog.length}>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}

import type { ImageLoaderProps } from "next/image";
export default function localImageLoader({ src, width }: ImageLoaderProps) {
  if (!src.endsWith(".webp")) return src;
  const target = src.includes("-thumb")
    ? 400
    : width <= 400
      ? 400
      : width <= 800
        ? 800
        : 1200;
  return src.replace(/(-thumb)?\.webp$/, `-${target}.webp`);
}

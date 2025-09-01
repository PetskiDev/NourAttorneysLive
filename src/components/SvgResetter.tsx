"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  width: number;
  height: number;
};

export default function SvgResetter({ src, alt, className, width, height }: Props) {
  const pathname = usePathname();

  return (
    <Image
      key={pathname} // force remount on navigation
      src={`${src}?v=${pathname}`} // 👈 bust cache so SVG reloads and <animate> restarts
      alt={alt}
      className={className}
      width={width}
      height={height}
    />
  );
}

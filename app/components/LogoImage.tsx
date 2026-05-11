"use client";

import Image from "next/image";
import { useColorMode } from "@/components/ui/color-mode";

export function LogoImage() {
  const { colorMode } = useColorMode();

  const logoSrc =
    colorMode === "dark" ? "/logo_stellardo_dark.svg" : "/logo_stellardo.svg";

  return (
    <Image
      src={logoSrc}
      alt="StellarDo Logo"
      width={200}
      height={200}
      priority
    />
  );
}

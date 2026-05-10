"use client";

import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";

const customSystem = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        body: { value: "Poppins, sans-serif" },
        heading: { value: "Poppins, sans-serif" },
      },
    },
  },
});

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={customSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}

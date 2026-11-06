/// <reference types="astro/client" />

import "react";

declare module "react" {
  // Satori's Tailwind prop, used by the OG image templates.
  interface HTMLAttributes<T> {
    tw?: string;
  }
}

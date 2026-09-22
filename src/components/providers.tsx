"use client";

import NextTopLoader from "nextjs-toploader";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextTopLoader
        color="#003de5"
        height={2}
        showSpinner={false}
        shadow={false}
      />
      {children}
    </>
  );
}

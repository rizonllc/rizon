import { useEffect, useState } from "react";

const current = () => window.location.pathname.replace(/\/$/, "") || "/";

/**
 * Current pathname for components that persist across client-side navigations
 * (Astro's <ClientRouter>). Starts from the server-rendered value, then follows
 * navigation events.
 */
export function usePathname(initial: string) {
  const [pathname, setPathname] = useState(initial);

  useEffect(() => {
    const update = () => setPathname(current());
    update();
    document.addEventListener("astro:after-swap", update);
    window.addEventListener("popstate", update);
    return () => {
      document.removeEventListener("astro:after-swap", update);
      window.removeEventListener("popstate", update);
    };
  }, []);

  return pathname;
}

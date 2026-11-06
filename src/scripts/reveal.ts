// Drives <Reveal>, <RevealGroup> and <RevealItem> (src/components/reveal.tsx).
// Re-runs after every client-side navigation (Astro's <ClientRouter>).
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// `html.js` gates the hidden initial state. Navigation swaps <html> attributes, so
// carry the class over to the incoming document to avoid a flash of visible content.
document.documentElement.classList.add("js");
document.addEventListener("astro:before-swap", (event) => {
  (event as Event & { newDocument: Document }).newDocument.documentElement.classList.add("js");
});

let observer: IntersectionObserver | undefined;

const show = (el: HTMLElement) => el.setAttribute("data-visible", "");

function init() {
  observer?.disconnect();

  if (reduced || !("IntersectionObserver" in window)) {
    document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-item]").forEach(show);
    return;
  }

  const io = (observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        io.unobserve(el);
        if (el.hasAttribute("data-reveal-group")) {
          const stagger = Number(el.dataset.stagger ?? 0.15);
          el.querySelectorAll<HTMLElement>("[data-reveal-item]").forEach((item, i) => {
            item.style.setProperty("--reveal-delay", `${i * stagger}s`);
            show(item);
          });
        } else {
          show(el);
        }
      }
    },
    { rootMargin: "-100px 0px" },
  ));
  document.querySelectorAll("[data-reveal], [data-reveal-group]").forEach((el) => io.observe(el));
}

// Fires on the initial load and after each navigation.
document.addEventListener("astro:page-load", init);

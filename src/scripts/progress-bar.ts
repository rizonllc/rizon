// Thin top-of-page progress line shown during client-side navigations
// (Astro's <ClientRouter>). Grows left to right while the next page loads,
// then completes and fades out.
const COLOR = "#003de5";

let bar: HTMLDivElement | undefined;
let timer: number | undefined;
let width = 0;
let hideTimer: number | undefined;

function ensureBar() {
  if (!bar) {
    bar = document.createElement("div");
    bar.setAttribute("aria-hidden", "true");
    Object.assign(bar.style, {
      position: "fixed",
      top: "0",
      left: "0",
      height: "2px",
      width: "0%",
      background: COLOR,
      zIndex: "2147483647",
      pointerEvents: "none",
      opacity: "0",
      transition: "width 200ms ease-out, opacity 250ms ease-out",
    } satisfies Partial<CSSStyleDeclaration>);
  }
  // <body> is replaced on navigation; <html> children survive, but re-attach defensively.
  if (!bar.isConnected) document.documentElement.appendChild(bar);
  return bar;
}

function set(value: number) {
  width = value;
  ensureBar().style.width = `${value}%`;
}

function start() {
  window.clearTimeout(hideTimer);
  window.clearInterval(timer);
  const el = ensureBar();
  el.style.transition = "none";
  el.style.opacity = "1";
  set(0);
  void el.offsetWidth; // flush so the width transition restarts from 0
  el.style.transition = "width 200ms ease-out, opacity 250ms ease-out";
  set(8);
  // Trickle: slows as it approaches 90%, so quick navigations barely show it
  // and slow ones keep visibly moving.
  timer = window.setInterval(() => set(width + (90 - width) * 0.12), 150);
}

function done() {
  if (!bar || width === 0) return;
  window.clearInterval(timer);
  set(100);
  hideTimer = window.setTimeout(() => {
    ensureBar().style.opacity = "0";
    hideTimer = window.setTimeout(() => set(0), 260);
  }, 200);
}

document.addEventListener("astro:before-preparation", start);
document.addEventListener("astro:page-load", done);

// Delegated click handlers for blog posts: heading hash buttons copy a section link,
// code blocks get a copy button. Markup comes from src/plugins/rehype-heading-anchors.mjs.

const COPIED_DURATION = 1600;

function flash(button: HTMLElement) {
  const idle = button.querySelector<HTMLElement>('[data-state="idle"]');
  const done = button.querySelector<HTMLElement>('[data-state="done"]');
  if (!idle || !done) return;
  idle.hidden = true;
  done.hidden = false;
  window.setTimeout(() => {
    idle.hidden = false;
    done.hidden = true;
  }, COPIED_DURATION);
}

document.addEventListener("click", async (event) => {
  const target = event.target as Element | null;

  const anchor = target?.closest<HTMLElement>("[data-heading-anchor]");
  if (anchor) {
    const id = anchor.dataset.headingAnchor!;
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    history.replaceState(null, "", `#${id}`);
    try {
      await navigator.clipboard.writeText(url);
      flash(anchor);
    } catch {
      // Clipboard blocked: the URL bar still holds the section link.
    }
    return;
  }

  const copy = target?.closest<HTMLElement>("[data-copy-code]");
  if (copy) {
    const pre = copy.closest("[data-code-block]")?.querySelector("pre");
    if (!pre) return;
    // rehype-pretty-code renders one [data-line] span per line.
    const lines = pre.querySelectorAll("[data-line]");
    const text = lines.length ? Array.from(lines, (l) => l.textContent ?? "").join("\n") : (pre.textContent ?? "");
    try {
      await navigator.clipboard.writeText(text.replace(/\n+$/, ""));
      flash(copy);
    } catch {
      // Clipboard unavailable (insecure context or denied): leave the icon as is.
    }
  }
});

import { fromHtml } from "hast-util-from-html";
import { visit } from "unist-util-visit";
import GithubSlugger from "github-slugger";
import { toString } from "hast-util-to-string";

const svg = (inner) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;

const HASH = svg(
  '<line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/>',
);
const CHECK = svg('<path d="M20 6 9 17l-5-5"/>');
const COPY = svg('<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>');

const fragment = (html) => fromHtml(html, { fragment: true }).children;

/**
 * Rehype plugin for blog posts:
 *  - gives every `##`/`###` a hover hash button that copies a link to the section
 *  - wraps fenced code in the site's code-block chrome (language label + copy button)
 * The buttons are wired up by the delegated listener in src/scripts/post-interactions.ts.
 */
export function rehypeHeadingAnchors() {
  return (tree) => {
    // Same slugger Astro uses for heading ids, so the generated table of contents matches.
    const slugger = new GithubSlugger();
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName === "h2" || node.tagName === "h3") {
        const id = node.properties?.id ?? slugger.slug(toString(node));
        node.properties = { ...node.properties, id };
        const cls = node.properties.className ?? [];
        node.properties.className = [...(Array.isArray(cls) ? cls : [cls]), "group", "relative"];
        node.children.unshift(
          ...fragment(
            `<span class="not-prose absolute top-0 right-full hidden h-[1lh] items-center pr-2 lg:flex"><button type="button" data-heading-anchor="${id}" aria-label="Copy link to section" class="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground opacity-0 transition-all outline-none select-none hover:bg-muted hover:text-primary focus-visible:opacity-100 focus-visible:ring-[3px] focus-visible:ring-ring/50 group-hover:opacity-100 [&_svg]:size-4"><span data-state="idle">${HASH}</span><span data-state="done" hidden class="text-primary">${CHECK}</span></button></span>`,
          ),
        );
        return;
      }

      if (node.tagName === "pre" && parent && typeof index === "number" && !parent.properties?.["data-code-block"]) {
        const language = node.properties?.["dataLanguage"] ?? node.properties?.["data-language"];
        const label = typeof language === "string" && language !== "text" && language !== "plaintext" ? language : "";
        const [wrapper] = fragment(
          `<div data-code-block class="code-block overflow-hidden rounded-xl border border-border bg-white"><div class="flex h-10 items-center justify-between border-b border-border bg-muted/40 pl-4 pr-1.5"><span class="font-mono text-xs lowercase tracking-wide text-muted-foreground">${label}</span><button type="button" data-copy-code aria-label="Copy code" title="Copy code" class="relative grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-3.5"><span data-state="idle">${COPY}</span><span data-state="done" hidden class="text-emerald-600">${CHECK}</span></button></div></div>`,
        );
        const cls = node.properties.className ?? [];
        node.properties.className = ["not-prose", ...(Array.isArray(cls) ? cls : [cls])];
        wrapper.children.push(node);
        parent.children[index] = wrapper;
        return "skip";
      }
    });
  };
}

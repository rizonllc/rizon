import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import type { ReactElement, ReactNode } from "react";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const require = createRequire(import.meta.url);

export const OG_SIZE = { width: 1200, height: 630 } as const;

const weights = [400, 500, 600, 700] as const;
let fonts: Promise<{ name: string; data: Buffer; weight: (typeof weights)[number]; style: "normal" }[]> | undefined;

const loadFonts = () =>
  (fonts ??= Promise.all(
    weights.map(async (weight) => ({
      name: "Inter",
      weight,
      style: "normal" as const,
      data: await readFile(require.resolve(`@fontsource/inter/files/inter-latin-${weight}-normal.woff`)),
    })),
  ));

// Satori only understands host elements, so expand function components first.
function expand(node: ReactNode): ReactNode {
  if (Array.isArray(node)) return node.map(expand);
  if (node && typeof node === "object" && "type" in node) {
    const el = node as ReactElement<{ children?: ReactNode }>;
    if (typeof el.type === "function") return expand((el.type as (props: unknown) => ReactNode)(el.props));
    const children = el.props?.children;
    return { ...el, props: { ...el.props, children: children === undefined ? children : expand(children) } } as ReactElement;
  }
  return node;
}

/** Renders a React element to a 1200x630 PNG response (build-time, used by static endpoints). */
export async function ogImage(element: ReactElement): Promise<Response> {
  const svg = await satori(expand(element) as ReactElement, { ...OG_SIZE, fonts: await loadFonts() });
  const png = new Resvg(svg, { fitTo: { mode: "width", value: OG_SIZE.width } }).render().asPng();
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
}

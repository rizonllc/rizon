import messages from "../../messages/en.json";

type Vars = Record<string, string | number>;

const lookup = (path: string): unknown =>
  path.split(".").reduce<unknown>(
    (o, k) => (o as Record<string, unknown> | undefined)?.[k],
    messages,
  );

// Plain English message lookup: getT("nav")("key", { var }). Sync, works in server and client components.
export const getT = (ns: string) => {
  const t = (key: string, vars?: Vars) =>
    String(lookup(`${ns}.${key}`)).replace(/\{(\w+)\}/g, (_, k) => String(vars?.[k] ?? `{${k}}`));
  t.raw = (key: string) => lookup(`${ns}.${key}`);
  return t;
};

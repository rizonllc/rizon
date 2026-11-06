/** Thrown when a statically generated page is asked for data that doesn't exist. */
export function notFound(): never {
  throw new Error("Not found");
}

import type { APIRoute } from "astro";
import { OgHome } from "@/components/og-home";
import { ogImage } from "@/lib/og";

export const GET: APIRoute = () => ogImage(OgHome());

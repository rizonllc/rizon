import { blankServices } from "@/lib/blank-services";
import { services } from "@/lib/services";
import { getT } from "@/lib/t";

// Single registry of every /services/[slug] route. The detail page, the sitemap,
// and any "related service" link read from here, so a service added to either
// data source (capability landings in blank-services, audience pages in services)
// shows up everywhere at once. Landing pages take precedence on a shared slug,
// matching how the detail page renders.
export type ServiceRoute = {
  slug: string;
  title: string;
  indexable: boolean; // landings without copy are noindex and stay out of the sitemap
};

const tNav = getT("nav");

export const serviceRoutes: ServiceRoute[] = [
  ...blankServices.map((s) => ({
    slug: s.slug,
    title: s.title || tNav(`serviceItems.${s.key}.title`),
    indexable: Boolean(s.metaTitle),
  })),
  ...services
    .filter((s) => !blankServices.some((b) => b.slug === s.slug))
    .map((s) => ({ slug: s.slug, title: s.title, indexable: true })),
];

export const getServiceRoute = (slug: string) =>
  serviceRoutes.find((s) => s.slug === slug);

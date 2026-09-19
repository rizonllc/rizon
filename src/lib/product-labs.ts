
export type ProductLab = {
  slug: string;
  name: string;
  status: string;
  liveUrl: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSub: string;
  summary: string;
  why: string[];
  researchFocus: { title: string; body: string }[];
  publicSiteRole: { title: string; body: string }[];
  keywords: string[];
};

export const productLabs: ProductLab[] = [
  {
    slug: "rizonvo",
    name: "RizonVO",
    status: "Owned product",
    liveUrl: "https://rizonvo.com",
    metaTitle: "RizonVO: vertical SaaS for French used-vehicle dealers",
    metaDescription: "RizonVO is Rizon's vertical SaaS product for French used-vehicle dealers managing stock, police book records, Cerfa 13751, invoices, costs, and margin VAT.",
    heroHeadline: "Vertical SaaS for the used-vehicle merchant workflow.",
    heroSub: "RizonVO connects stock, police book records, purchase declarations, costs, invoices, and margin-VAT tracking around one vehicle dossier for French independent used-vehicle dealers.",
    summary: "RizonVO is an owned Rizon product focused on a narrow operational problem: helping French used-vehicle dealers keep each vehicle's commercial, document, and margin data connected.",
    why: [
        "French used-vehicle merchants sit between sales operations and legal records. A vehicle purchase can touch stock tracking, seller identity, the police book, a Cerfa 13751 purchase declaration, preparation costs, resale invoicing, and margin-VAT treatment.",
        "Many small dealers still keep parts of that workflow in spreadsheets or paper folders. That can work while volume is low, but it breaks down when a single vehicle needs to be reconstructed quickly for an accountant, a buyer, or a control.",
        "RizonVO is organized around one narrow principle: the vehicle dossier is the source of truth. The product focuses on the core merchant workflow instead of trying to become a full dealership DMS.",
      ],
    researchFocus: [
      {
        title: "Vehicle dossier",
        body: "One record should connect purchase data, seller identity, VIN, mileage, documents, costs, sale price, and margin.",
      },
      {
        title: "French compliance",
        body: "The product research centers on the police book, Cerfa 13751 purchase declaration, and margin-VAT calculations relevant to French VO merchants.",
      },
      {
        title: "Small dealer economics",
        body: "The first ICP is a small professional dealer with roughly 5 to 60 vehicles, not a large concession running a complete DMS.",
      },
      {
        title: "Search-led validation",
        body: "The public site captures searches around concrete dealer obligations and routes that demand back to the product.",
      },
    ],
    publicSiteRole: [
      {
        title: "Market education",
        body: "RizonVO publishes guides around used-vehicle dealer obligations so the product earns topical relevance in its market.",
      },
      {
        title: "Demand capture",
        body: "The live domain gives interested merchants a direct path to the product and its resources.",
      },
      {
        title: "Entity building",
        body: "This Rizon page links the studio, the product domain, and the vertical problem in a crawlable way.",
      },
    ],
    keywords: [
      "RizonVO",
      "used vehicle dealer software France",
      "marchand VO logiciel",
      "livre de police vehicule occasion",
      "Cerfa 13751 logiciel",
      "TVA sur marge vehicule occasion",
      "vertical SaaS used vehicle dealers",
    ],
  },
  {
    slug: "wavalid",
    name: "Wavalid",
    status: "Owned product",
    liveUrl: "https://wavalid.com",
    metaTitle: "Wavalid: real-time WhatsApp number validation",
    metaDescription: "Wavalid is Rizon's owned validation service that checks any phone number against WhatsApp in sub-100ms across 195+ countries, with batch uploads, a dashboard, REST API, and MCP server.",
    heroHeadline: "Real-time WhatsApp number validation for outreach teams.",
    heroSub: "Wavalid checks any phone number against WhatsApp in sub-100ms across 195+ countries, so marketing and sales teams stop wasting sends on numbers that were never registered on the platform.",
    summary: "Wavalid is an owned Rizon product focused on a narrow operational problem: telling teams doing WhatsApp outreach which numbers are actually reachable before they send.",
    why: [
        "Teams doing cold outreach on WhatsApp were wasting sends on numbers that were never registered on the platform, hurting deliverability and skewing campaign results.",
        "Most list-cleaning tools only check phone number format, not actual WhatsApp presence, so bad numbers slip through until a campaign is already underway.",
        "Wavalid is organized around one narrow principle: check the number against WhatsApp itself, in real time, before it's used. The product focuses on that single check instead of trying to become a full outreach platform.",
      ],
    researchFocus: [
      {
        title: "Sub-100ms checks",
        body: "A validation call needs to return fast enough to sit inline in a sending workflow instead of becoming a separate batch step.",
      },
      {
        title: "195+ country coverage",
        body: "Outreach lists are rarely single-market, so the check has to hold up across country codes and numbering formats worldwide.",
      },
      {
        title: "No number retention",
        body: "Teams validating contact lists need a service that checks and returns a result without selling or retaining the underlying numbers.",
      },
    ],
    publicSiteRole: [
      {
        title: "Market education",
        body: "Wavalid publishes guides around WhatsApp deliverability and list quality so the product earns topical relevance in its market.",
      },
      {
        title: "Demand capture",
        body: "The live domain gives interested marketing and sales teams a direct path to the product, its API, and its MCP server.",
      },
      {
        title: "Entity building",
        body: "This Rizon page links the studio, the Wavalid product domain, and the WhatsApp validation problem in a crawlable way.",
      },
    ],
    keywords: [
      "Wavalid",
      "WhatsApp number validation",
      "check WhatsApp number",
      "bulk WhatsApp validation",
      "WhatsApp API validation",
      "verify phone number WhatsApp",
    ],
  },
];

export function getProductLabBySlug(slug: string): ProductLab | undefined {
  return productLabs.find((product) => product.slug === slug);
}

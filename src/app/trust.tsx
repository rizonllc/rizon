import { getT } from "@/lib/t";
import Link from "next/link";
import { SectionHeader } from "@/components/section-header";

const testimonials = [
  {
    quote:
      "Thanks for your great quality work. The LMS system is exactly what I envisaged. Great working with you.",
    author: "Darren Bekker",
  },
  {
    quote:
      "Choaib and team are a great partner to work with. They are detail-oriented, knowledgeable, and dependable. They are always available to help and go above and beyond to make sure expectations are met.",
    author: "cloudSDS",
  },
  {
    quote: "Great experience with Choaib once again. 100% recommend.",
    author: "Nikki",
  },
  {
    quote:
      "Choaib is the type of freelancer you are looking for on this platform. Very professional and has all the required skills. You won't regret working with him.",
    author: "Nikki Anderson",
  },
  {
    quote:
      "Great to work with. Really knows LTI, Moodle, and Canvas inside out. He figured out issues we'd been stuck on and got everything working smoothly.",
    author: "Laura Keast",
  },
];

const clients = [
  { name: "AI Adoption", href: "https://aiadoption.co.za" },
  { name: "Choice Learning", href: "https://choicelearning.ca/" },
  { name: "Akera Agency", href: "https://akera.agency/" },
  { name: "Arkon Agency", href: "https://arkon.agency" },
];

export const Trust = async () => {
  const t = getT("trust");
  return (
    <section className="container mt-32 md:mt-40 cntr">
      <SectionHeader
        label={t("label")}
        title={t("title")}
        description={t("description")}
      />
      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
        {testimonials.map(({ quote, author }) => (
          <blockquote key={quote} className="surface flex flex-col p-7 md:p-8">
            <p className="text-lg leading-relaxed tracking-tight text-foreground/90">
              &ldquo;{quote}&rdquo;
            </p>
            <footer className="mt-6 flex items-center gap-3">
              <span
                className="inline-flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
                aria-hidden
              >
                {author.charAt(0)}
              </span>
              <span className="text-sm font-medium">{author}</span>
            </footer>
          </blockquote>
        ))}
      </div>
      <div className="surface mt-6 flex flex-col gap-4 p-7 md:flex-row md:items-center md:justify-between md:p-8">
        <p className="text-sm font-medium text-muted-foreground">
          {t("clientsLabel")}
        </p>
        <div className="flex flex-wrap gap-x-7 gap-y-3">
          {clients.map((client) => (
            <Link
              key={client.href}
              href={client.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium text-foreground/80 hover:text-primary"
            >
              {client.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

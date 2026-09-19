
export type Author = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  url: string;
  sameAs: string[];
};

export const authors: Author[] = [
  {
    slug: "choaib-mouhrach",
    name: "Choaib Mouhrach",
    role: "Founder & Senior Software Engineer",
    bio: "I design and build custom learning platforms for organizations with complex training and certification workflows. Instead of stitching together plugins and third-party tools, I create systems tailored to how each business operates, reducing administrative overhead while improving the learner experience.",
    avatar: "/choaib-mouhrach-pic.png",
    url: "https://rizon.agency/about",
    sameAs: ["https://www.linkedin.com/in/choaib-mouhrach"],
  },
];

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((author) => author.slug === slug);
}

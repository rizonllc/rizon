import {
  CalendarDays,
  KeyRound,
  MessagesSquare,
  ScrollText,
  type LucideIcon,
} from "lucide-react";

// Copy for /about.
export const about = {
  metaTitle: "About Rizon: Custom LMS & LTI Development | Rizon",
  metaDescription:
    "Rizon is a custom LMS and LTI development studio. We build learning platforms for education and training providers. You work directly with the developer. Book a free 30-min call.",
  h1: "About Rizon",
  lead: {
    h2: "We build learning platforms, and we're the ones who actually build them.",
    body: "Rizon is a custom LMS and LTI development studio for education and training providers. We build custom learning platforms, integrate tools through LTI, work in Moodle and Canvas, and handle migrations: the whole build, end to end. No account managers, and no juniors learning on your project. You work directly with the person writing the code.",
  },
  who: {
    h2: "Who you're working with",
    photo: {
      src: "/choaib-mouhrach-pic.png",
      width: 1440,
      height: 1440,
      alt: "Choaib, founder of Rizon",
    },
    body: "Rizon is led by Choaib, a software engineer who has spent years building learning platforms and LMS integrations. The work spans custom LMS builds, LTI integrations and 1.1-to-1.3 migrations, Moodle and Canvas development, and platform migrations for clients including Choice Learning, Cloud SDS, and the Center for Neurodivergence. When you hire Rizon, you're working with the developer directly: the same person on the discovery call is the one building your platform.",
  },
  how: {
    h2: "How we work",
    intro:
      "We keep it simple and honest, because that's what we'd want as the client:",
    items: [
      {
        icon: MessagesSquare,
        title: "You work with the developer",
        body: "There's no middle layer, so questions get answered by the person who can actually answer them.",
      },
      {
        icon: CalendarDays,
        title: "Weekly working builds",
        body: "You see real progress every week that you can click through, with no month-long silences or big reveal at the end.",
      },
      {
        icon: ScrollText,
        title: "Fixed scope and price before we start",
        body: "You know what you're getting and what it costs before any work begins.",
      },
      {
        icon: KeyRound,
        title: "You own what we build",
        body: "The code, the data, the platform: yours. No lock-in.",
      },
    ] satisfies { icon: LucideIcon; title: string; body: string }[],
  },
  believe: {
    h2: "What we believe",
    body: "Most learning software makes you fit the tool. We think it should be the other way around. The best platform is the one built around how you actually teach, that you own outright, and that grows with you instead of charging you more for growing. That belief runs through everything we build, and it's why our clients own their code and data and set their own roadmap.",
  },
  proof: {
    h2: "Work we've shipped",
    line: "Trusted by education platforms and training providers, including Choice Learning, Cloud SDS, and LaunchLife.",
    cta: "See our case studies",
  },
  cta: {
    h2: "Let's talk about what you're building.",
    line: "Tell us what you're working on. In 30 minutes, we'll tell you how we'd approach it. No pitch, no obligation.",
  },
};

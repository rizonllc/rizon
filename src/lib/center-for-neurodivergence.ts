import type { CaseStudy } from "@/components/case-study-page";

// Copy for /case-studies/center-for-neurodivergence.
// ponytail: no testimonial or usage numbers yet; add `testimonial` and real outcomes to `result` after launch.
export const centerForNeurodivergence: CaseStudy = {
  slug: "center-for-neurodivergence",
  metaTitle: "The Center for Neurodivergence Case Study | Rizon",
  metaDescription:
    "How Rizon built a custom e-learning platform for parents of neurodivergent children: structured courses with clinical oversight from therapists and multi-center licensing.",
  name: "The Center for Neurodivergence",
  h1: "The Center for Neurodivergence",
  summary:
    "A custom e-learning platform for parents of neurodivergent children: structured courses backed by clinical oversight from speech and occupational therapists, built to be licensed across multiple centers.",
  meta: [
    { label: "Client", value: "The Center for Neurodivergence" },
    { label: "Industry", value: "Special education / therapy" },
    { label: "Services", value: "Custom LMS Development" },
    { label: "Platforms", value: "Custom build, Mux, Cloudflare R2" },
  ],
  glance: [
    {
      text: "Custom-built, multi-role learning platform (parent, therapist, admin)",
    },
    { text: "Async therapist review of parent video and document submissions" },
    { text: "Adaptive video delivery and structured course curriculum engine" },
    { text: "Built for multi-center licensing from one codebase" },
  ],
  challenge: {
    h2: "Clinical guidance for parents that scales beyond one room.",
    body: "The Center for Neurodivergence helps parents of neurodivergent children through education backed by clinical expertise. Delivering that one-on-one doesn't scale: a therapist's time is finite, and families need structured guidance between sessions. The Center needed a platform that could teach parents through proper courses, let therapists review each family's real submissions, and eventually run across multiple center locations. A generic course tool bent to fit wouldn't do that.",
  },
  approach: {
    h2: "One platform, three roles, built around clinical oversight.",
    body: "We built a custom e-learning platform where what each person can see and do is driven by their role: parents learn and submit, therapists create content and review, and the Center administers everything. The core design decision was asynchronous clinical review. Therapists respond to parent submissions on their own schedule, so oversight scales without requiring live sessions. And it was built from the start to be licensed to other centers from a single codebase.",
  },
  built: {
    h2: "What we built",
    items: [
      {
        text: "A custom learning platform with three roles (parent, therapist/instructor, and administrator), each with its own access and permissions.",
        links: [
          {
            text: "custom learning platform",
            href: "/services/custom-lms-development",
          },
        ],
      },
      {
        text: "A curriculum engine: courses contain chapters, chapters contain lessons, each lesson mixing video, PDF, and text, all managed from an admin interface.",
      },
      {
        text: "Adaptive video delivery through Mux, with documents stored on Cloudflare R2, so playback adjusts to each family's connection.",
      },
      {
        text: "Auto-graded multiple-choice quizzes with immediate results, visible to the assigned therapist and admin.",
      },
      {
        text: "Asynchronous assignment review: parents upload video or document submissions inside a lesson; the assigned therapist reviews and responds, and the parent is notified in the platform.",
      },
      {
        text: "Per-parent progress tracking across lessons, chapters, and courses, visible to both the parent and the admin.",
      },
      {
        text: "Multi-center licensing: the platform is structured so additional centers can run their own instance from one codebase, with the owner controlling curriculum, users, pricing, and access.",
      },
    ],
  },
  gallery: {
    h2: "Screenshots",
    images: [
      {
        src: "/thecenterforneurodivergence/thecenterforneurodivergence.com.png",
        width: 2442,
        height: 1550,
        alt: "Home page of the Centre for Neurodivergence site, with the headline 'Understanding your neurodivergent child, one step at a time' and photos of children for each condition",
      },
      {
        src: "/thecenterforneurodivergence/thecenterforneurodivergence.com-2.png",
        width: 2442,
        height: 1550,
        alt: "Course catalog page listing three courses with lesson counts, durations, and free-to-start labels",
      },
      {
        src: "/thecenterforneurodivergence/thecenterforneurodivergence.com-courses-what-is-autism-a-pa.png",
        width: 2442,
        height: 1550,
        alt: "Course page for 'What Is Autism? A Parent's Introduction', showing what parents will learn and a course summary card with a Start free button",
      },
      {
        src: "/thecenterforneurodivergence/thecenterforneurodivergence.com-autism.png",
        width: 2442,
        height: 1550,
        alt: "Autism Spectrum Disorder category page with a course search box and course cards",
      },
      {
        src: "/thecenterforneurodivergence/thecenterforneurodivergence.com-1.png",
        width: 2442,
        height: 1550,
        alt: "Landing page section explaining that a diagnosis raises more questions than it answers, next to a photo of a child in a red hat",
      },
      {
        src: "/thecenterforneurodivergence/thecenterforneurodivergence.com-3.png",
        width: 2442,
        height: 1550,
        alt: "About page describing the founding pediatrician and the clinical oversight behind the courses",
      },
      {
        src: "/thecenterforneurodivergence/app.thecenterforneurodivergence.com-dashboard.png",
        width: 2442,
        height: 1550,
        alt: "Parent course dashboard in the learning app, showing an enrolled course with a lesson progress bar",
      },
      {
        src: "/thecenterforneurodivergence/app.thecenterforneurodivergence.com-admin-courses.png",
        width: 2442,
        height: 1550,
        alt: "Admin course catalog in the learning app, with search, list and grid views, and a New course button",
      },
      {
        src: "/thecenterforneurodivergence/app.thecenterforneurodivergence.com-admin-courses-01a0ace3-.png",
        width: 2442,
        height: 1550,
        alt: "Admin curriculum editor showing a chapter with lessons, publish states, and add chapter and add lesson controls",
      },
    ],
  },
  result: {
    h2: "The result",
    body: "The platform is built, deployed, and ready for launch. The Center has a custom system that delivers structured parent education with real clinical oversight, scales therapist review asynchronously, and is ready to expand to additional locations without a rebuild.",
  },
  services: { h2: "Services used on this project" },
  cta: {
    h2: "Building something that has to fit exactly?",
    line: "Tell us what you're working on. In 30 minutes, we'll tell you how we'd approach it. No pitch, no obligation.",
  },
};

// Data and scoring for /alternatives/which-lms-is-right-for-you.
// Pure module: imported by the server page (static summary) and the client quiz.

export type Link_ = { text: string; href: string };

export type Question = {
  id: string;
  prompt: string;
  options: { id: string; label: string }[];
};

export const questions: Question[] = [
  {
    id: "q1",
    prompt: "What are you doing?",
    options: [
      { id: "course", label: "Selling online courses to the public" },
      { id: "corp", label: "Training employees or a workforce" },
      { id: "edu", label: "Teaching at a school or university" },
      { id: "coach", label: "Running coaching or a membership" },
    ],
  },
  {
    id: "q2",
    prompt: "How big is it, or will it get?",
    options: [
      { id: "small", label: "Just starting or small" },
      { id: "growing", label: "Growing steadily" },
      { id: "large", label: "Large, with many users" },
      { id: "enterprise", label: "Enterprise scale" },
    ],
  },
  {
    id: "q3",
    prompt: "What matters most?",
    options: [
      { id: "cost", label: "Lowest cost to start" },
      { id: "own", label: "Owning my platform and data" },
      { id: "ease", label: "Ease of use, minimal setup" },
      { id: "features", label: "Specific features nothing else has" },
    ],
  },
  {
    id: "q4",
    prompt: "How do you feel about per-seat or per-sale fees?",
    options: [
      { id: "fine", label: "Fine with them for now" },
      { id: "hurting", label: "Starting to hurt as I grow" },
      { id: "gone", label: "I want them gone entirely" },
    ],
  },
  {
    id: "q5",
    prompt: "What technical resources do you have?",
    options: [
      { id: "none", label: "No technical help" },
      { id: "some", label: "Some, or a developer available" },
      { id: "team", label: "A full team" },
    ],
  },
];

export type ResultId =
  | "hosted-courses"
  | "hosted-corporate"
  | "moodle"
  | "enterprise"
  | "custom";

export type Result = {
  id: ResultId;
  path: string; // label for the static summary
  headline: string;
  body: string;
  links: Link_[];
  // false = low-intent path: the call is framed as a free second opinion, not a build pitch.
  buildIntent: boolean;
  ctaLine: string;
};

export const results: Record<ResultId, Result> = {
  "hosted-courses": {
    id: "hosted-courses",
    path: "Hosted course platform",
    headline:
      "Honestly, start with an off-the-shelf platform. Don't overbuild yet.",
    body: "At your size, with cost and simplicity up front, a hosted course platform like Teachable or Thinkific gets you selling in days for the price of a subscription. Fees are the trade for speed, and that is a good trade until they start to sting. Custom only makes sense later.",
    links: [
      { text: "Teachable alternatives", href: "/alternatives/teachable" },
      { text: "Thinkific alternatives", href: "/alternatives/thinkific" },
    ],
    buildIntent: false,
    ctaLine:
      "Want a second opinion? The call is free, and we'll tell you if a platform is enough.",
  },
  "hosted-corporate": {
    id: "hosted-corporate",
    path: "Hosted corporate LMS",
    headline:
      "Honestly, a hosted LMS like TalentLMS is the right call. Don't build custom yet.",
    body: "For a smaller team that wants low cost and little setup, TalentLMS covers the basics (courses, tracking, certificates) without any technical work on your side. Revisit the question if per-seat fees start climbing or you need workflows it cannot do.",
    links: [{ text: "TalentLMS alternatives", href: "/alternatives/talentlms" }],
    buildIntent: false,
    ctaLine: "Want a second opinion? The call is free, and there's no pitch.",
  },
  moodle: {
    id: "moodle",
    path: "Moodle or Canvas",
    headline: "Look at Moodle or Canvas. You probably don't need a custom build.",
    body: "Schools and universities are what these platforms were built for. Moodle is free to run and endlessly extensible if you have some technical help; Canvas is more polished if you would rather have less upkeep. Custom only wins when your program does something neither can.",
    links: [
      { text: "Moodle development", href: "/services/moodle-development" },
      { text: "Canvas development", href: "/services/canvas-development" },
    ],
    buildIntent: false,
    ctaLine: "Want a second opinion on Moodle vs Canvas? The call is free.",
  },
  enterprise: {
    id: "enterprise",
    path: "Enterprise LMS vs custom",
    headline:
      "At your scale it's a real tradeoff: an enterprise LMS or a platform you own.",
    body: "Docebo gives you a mature, supported enterprise LMS, at a per-seat price that grows with headcount and a roadmap you don't control. A custom LMS costs more up front, has no seat fees, and fits your workflows exactly. Run the numbers over three to five years before deciding.",
    links: [
      { text: "Docebo alternatives", href: "/alternatives/docebo" },
      {
        text: "Custom LMS development",
        href: "/services/custom-lms-development",
      },
    ],
    buildIntent: true,
    ctaLine:
      "We'll walk through both options with your real numbers. The call is free.",
  },
  custom: {
    id: "custom",
    path: "Custom-built LMS",
    headline: "A custom LMS is likely worth a serious look.",
    body: "You're growing, you care about owning the platform, or you need something no off-the-shelf tool does. That is where per-seat and per-sale fees start costing more than a build, and where a platform shaped around how you work pays off. We'll tell you plainly if we think it's too early.",
    links: [
      {
        text: "Custom LMS development",
        href: "/services/custom-lms-development",
      },
    ],
    buildIntent: true,
    ctaLine: "Let's scope it. The 30-minute call is free, no obligation.",
  },
};

type Bucket = "hosted" | "moodle" | "enterprise" | "custom";

// Weighted rules: [question, option, bucket, weight]. Highest total wins.
const rules: [string, string, Bucket, number][] = [
  // Hosted platform: small, cheap, fine with fees, no tech.
  ["q2", "small", "hosted", 2],
  ["q2", "growing", "hosted", 1],
  ["q3", "cost", "hosted", 2],
  ["q3", "ease", "hosted", 2],
  ["q4", "fine", "hosted", 2],
  ["q5", "none", "hosted", 2],
  ["q1", "course", "hosted", 2],
  ["q1", "coach", "hosted", 2],
  ["q1", "corp", "hosted", 2],
  ["q1", "edu", "hosted", -6],
  // Moodle / Canvas: education, better with some tech.
  ["q1", "edu", "moodle", 5],
  ["q5", "some", "moodle", 2],
  ["q5", "team", "moodle", 1],
  ["q3", "cost", "moodle", 1],
  ["q3", "own", "moodle", 1],
  // Enterprise comparison: corporate at scale.
  ["q1", "corp", "enterprise", 2],
  ["q2", "large", "enterprise", 3],
  ["q2", "enterprise", "enterprise", 5],
  ["q5", "team", "enterprise", 1],
  // Custom: growing, owning, fees hurting, some tech, or unique features.
  ["q2", "growing", "custom", 1],
  ["q2", "large", "custom", 2],
  ["q2", "enterprise", "custom", 1],
  ["q3", "own", "custom", 3],
  ["q3", "features", "custom", 9],
  ["q4", "hurting", "custom", 2],
  ["q4", "gone", "custom", 3],
  ["q5", "some", "custom", 1],
  ["q5", "team", "custom", 2],
];

// Tie-break: earlier wins, so ties lean toward the answer that is not "hire Rizon".
const order: Bucket[] = ["hosted", "moodle", "enterprise", "custom"];

export function recommend(answers: Record<string, string>): Result {
  const score: Record<Bucket, number> = {
    hosted: 0,
    moodle: 0,
    enterprise: 0,
    custom: 0,
  };
  for (const [q, o, b, w] of rules) if (answers[q] === o) score[b] += w;
  const best = order.reduce((a, b) => (score[b] > score[a] ? b : a));
  if (best === "hosted")
    return results[answers.q1 === "corp" ? "hosted-corporate" : "hosted-courses"];
  return results[best];
}

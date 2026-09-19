import { getT } from "@/lib/t";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { Footer } from "../footer";
import { AnalyticsEvent } from "@/lib/analytics";

export async function generateMetadata(): Promise<Metadata> {
  const t = getT("seo.legal");
  const path = "/legal";
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: path,
      siteName: "Rizon",
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function LegalPage() {
  const t = getT("legalPage");
  return (
    <>
      <main className="container pt-32 md:pt-40">
        <div className="mx-auto max-w-3xl">
          <header>
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft
                size={15}
                strokeWidth={1.75}
                aria-hidden
                className="transition-transform duration-300 ease-out group-hover:-translate-x-1"
              />
              {t("back")}
            </Link>

            <span className="mt-10 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">
              <span className="h-px w-8 bg-primary" aria-hidden />
              {t("eyebrow")}
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight leading-[1.05] text-balance md:text-5xl">
              {t("title")}
            </h1>

            <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-4 border-t border-border pt-6">
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/50">
                  {t("entity")}
                </dt>
                <dd className="mt-1.5 text-[15px] text-foreground">
                  Rizon LLC
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/50">
                  {t("effective")}
                </dt>
                <dd className="mt-1.5 text-[15px] text-foreground">
                  {new Date("2026-05-29").toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/50">
                  {t("jurisdiction")}
                </dt>
                <dd className="mt-1.5 text-[15px] text-foreground">
                  Wyoming, USA
                </dd>
              </div>
            </dl>
          </header>

          {/* Hand-rolled rich text — theme tokens, no typography plugin */}
          <div
            className="mt-14
              [&_h2]:mt-0 [&_h2]:mb-5 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground
              [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-base [&_h3]:font-medium [&_h3]:tracking-tight [&_h3]:text-foreground
              [&_p]:text-[15px] [&_p]:leading-7 [&_p]:text-muted-foreground [&_p:not(:first-child)]:mt-4
              [&_ul]:mt-4 [&_ul]:space-y-2.5
              [&_li]:relative [&_li]:pl-6 [&_li]:text-[15px] [&_li]:leading-7 [&_li]:text-muted-foreground
              [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-3 [&_li]:before:h-px [&_li]:before:w-3 [&_li]:before:bg-primary
              [&_hr]:my-12 [&_hr]:border-border
              [&_strong]:font-medium [&_strong]:text-foreground
              [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:decoration-primary/30 [&_a]:underline-offset-4 [&_a]:transition-colors hover:[&_a]:decoration-primary"
          >
            <hr />

            <h2>1. Overview</h2>
            <p>
              These Terms and Services (&ldquo;Terms&rdquo;) govern all
              engagements between Rizon LLC (&ldquo;Rizon&rdquo;,
              &ldquo;we&rdquo;, &ldquo;us&rdquo;) and our clients
              (&ldquo;Client&rdquo;, &ldquo;you&rdquo;). By engaging Rizon for
              any services, you agree to these Terms in full.
            </p>
            <p>
              Rizon LLC is a Wyoming limited liability company providing custom
              software development services, with a specialization in learning
              management systems (LMS), e-learning platforms, and educational
              technology solutions.
            </p>

            <hr />

            <h2>2. Services</h2>
            <p>
              Rizon provides custom software development services on a project
              basis. All work is scoped, agreed upon, and delivered according to
              a written proposal or statement of work (&ldquo;SOW&rdquo;) signed
              by both parties prior to engagement.
            </p>
            <p>Services may include but are not limited to:</p>
            <ul>
              <li>Custom LMS and e-learning platform development</li>
              <li>School and training portals</li>
              <li>Corporate learning systems</li>
              <li>Platform audits, upgrades, and integrations</li>
              <li>Ongoing technical support and maintenance (where agreed)</li>
            </ul>

            <hr />

            <h2>3. Proposals and Statements of Work</h2>
            <p>
              Each project begins with a written proposal or SOW outlining
              scope, deliverables, timeline, and payment terms. The SOW takes
              precedence over these Terms in the event of a conflict specific to
              the project.
            </p>
            <p>
              Any changes to scope must be agreed upon in writing and may result
              in revised timelines and additional fees.
            </p>

            <hr />

            <h2>4. Payment Terms</h2>

            <h3>4.1 Invoicing</h3>
            <p>
              Payment schedules are defined in each SOW. Standard arrangements
              include a deposit prior to work beginning, with remaining payments
              tied to project milestones or delivery.
            </p>

            <h3>4.2 Late Payments</h3>
            <p>
              Invoices unpaid beyond 14 days of the due date may result in a
              pause of work. Rizon reserves the right to charge a late fee of
              1.5% per month on overdue balances.
            </p>

            <h3>4.3 Currency</h3>
            <p>
              All invoices are issued in USD unless otherwise agreed in writing.
            </p>

            <h3>4.4 Refunds</h3>
            <p>
              Due to the custom nature of our work, deposits and milestone
              payments are non-refundable once work on that phase has begun. If
              Rizon is unable to complete a project due to circumstances on our
              end, any work not yet started will be refunded in full.
            </p>

            <hr />

            <h2>5. Intellectual Property and Code Ownership</h2>
            <p>
              Upon receipt of full payment for a project, the Client owns all
              custom code, designs, and deliverables produced by Rizon for that
              engagement. Rizon transfers all relevant intellectual property
              rights to the Client at that time.
            </p>
            <p>Rizon retains the right to:</p>
            <ul>
              <li>
                Reference the project in its portfolio and marketing materials
                (without disclosing confidential business information)
              </li>
              <li>
                Reuse general methodologies, patterns, and non-client-specific
                know-how developed during the engagement
              </li>
            </ul>
            <p>
              Third-party libraries, frameworks, and open-source components used
              in the build remain subject to their respective licenses. Rizon
              will disclose all such dependencies upon request.
            </p>

            <hr />

            <h2>6. Confidentiality</h2>
            <p>
              Both parties agree to keep confidential any non-public information
              shared during the engagement, including business logic, user data,
              pricing, and internal systems. This obligation survives the end of
              the project.
            </p>
            <p>
              Rizon will not sell, share, or disclose Client data to third
              parties except as required by law or as necessary to perform the
              services (e.g., hosting providers, third-party APIs).
            </p>

            <hr />

            <h2>7. Client Responsibilities</h2>
            <p>The Client agrees to:</p>
            <ul>
              <li>
                Provide timely access to necessary systems, credentials, and
                stakeholders
              </li>
              <li>
                Review and provide feedback on deliverables within the
                timeframes outlined in the SOW
              </li>
              <li>
                Ensure that any content, data, or materials provided to Rizon do
                not infringe third-party rights
              </li>
            </ul>
            <p>
              Delays caused by the Client may result in revised project
              timelines. Rizon is not liable for delays attributable to the
              Client&rsquo;s failure to provide required inputs.
            </p>

            <hr />

            <h2>8. Warranties and Representations</h2>
            <p>Rizon warrants that:</p>
            <ul>
              <li>
                Work will be performed professionally and in accordance with the
                agreed SOW
              </li>
              <li>
                Rizon has the right to enter into this agreement and is not
                bound by any conflicting obligations
              </li>
            </ul>
            <p>
              Rizon does not warrant that deliverables will be entirely free of
              bugs or defects at delivery. A post-delivery support period (if
              included in the SOW) will be used to resolve reported issues at no
              additional charge.
            </p>

            <hr />

            <h2>9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Rizon&rsquo;s total
              liability for any claim arising from or related to these Terms or
              any project shall not exceed the total fees paid by the Client for
              the specific project giving rise to the claim.
            </p>
            <p>Rizon is not liable for:</p>
            <ul>
              <li>Indirect, incidental, or consequential damages</li>
              <li>Loss of revenue, data, or business opportunities</li>
              <li>
                Issues arising from third-party services, APIs, or
                infrastructure outside Rizon&rsquo;s control
              </li>
            </ul>

            <hr />

            <h2>10. Termination</h2>
            <p>
              Either party may terminate an engagement with 14 days written
              notice. In the event of termination:
            </p>
            <ul>
              <li>
                The Client owes payment for all work completed up to the
                termination date
              </li>
              <li>
                Rizon will deliver all completed work product to the Client upon
                receipt of outstanding payment
              </li>
              <li>
                Deposits and milestone payments for work already begun are
                non-refundable
              </li>
            </ul>
            <p>
              Rizon may terminate immediately and without notice in cases of
              non-payment beyond 30 days or violation of these Terms.
            </p>

            <hr />

            <h2>11. Independent Contractor</h2>
            <p>
              Rizon operates as an independent contractor. Nothing in these
              Terms creates an employment, partnership, or joint venture
              relationship between Rizon and the Client.
            </p>

            <hr />

            <h2>12. Governing Law and Dispute Resolution</h2>
            <p>
              These Terms are governed by the laws of the State of Wyoming,
              United States, without regard to conflict of law principles.
            </p>
            <p>
              Any disputes arising from these Terms or a project engagement
              shall first be attempted to be resolved through good-faith
              negotiation. If unresolved after 30 days, disputes shall be
              submitted to binding arbitration in Wyoming in accordance with the
              rules of the American Arbitration Association.
            </p>

            <hr />

            <h2>13. Changes to These Terms</h2>
            <p>
              Rizon reserves the right to update these Terms at any time.
              Updates will be posted on our website with a revised effective
              date. Continued engagement with Rizon after such updates
              constitutes acceptance of the revised Terms. Active projects in
              progress are governed by the Terms in effect at the time the SOW
              was signed.
            </p>

            <hr />

            <h2>14. Contact</h2>
            <p>For questions regarding these Terms, please contact:</p>
            <p>
              <strong>Rizon LLC</strong>
              <br />
              Email:{" "}
              <Link
                href="mailto:contact@rizon.agency"
                data-umami-event={AnalyticsEvent.EmailClick}
              >
                contact@rizon.agency
              </Link>
              <br />
              Website:{" "}
              <Link
                href="https://rizon.agency"
                target="_blank"
                rel="noopener noreferrer"
              >
                rizon.agency
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

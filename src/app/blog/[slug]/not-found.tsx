import { getT } from "@/lib/t";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "../../footer";

export default async function BlogPostNotFound() {
  const t = getT("notFound");
  return (
    <>
      <main className="container flex min-h-[70vh] flex-col justify-center pt-32 md:pt-40">
        <span className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">
          <span className="font-mono text-sm tabular-nums">404</span>
          <span className="h-px w-8 bg-primary" aria-hidden />
          {t("label")}
        </span>
        <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight leading-[1.05] text-balance md:text-5xl">
          {t("postTitle")}
        </h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
          {t("postDescription")}
        </p>
        <div className="mt-8">
          <Button nativeButton={false} render={<Link href="/blog" />}>
            <ArrowLeft size={16} strokeWidth={1.75} aria-hidden />
            {t("backToBlog")}
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}

import { getT } from "@/lib/t";
import Image from "@/components/image";
import { Button } from "@/components/ui/button";


export const Hero = () => {
  const t = getT("home.hero");

  return (
    <section id="home" className="px-3 pt-3 sm:px-4 sm:pt-4 lg:px-4 lg:pt-4">
      <div className="relative isolate flex h-[82vh] max-h-180 min-h-140 flex-col overflow-hidden rounded-2xl bg-background sm:rounded-3xl">
        <Image
          src="/hero-home.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-black/55" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-linear-to-b from-black/60 via-black/25 to-black/60"
        />

        <div className="container flex flex-1 flex-col items-center justify-center px-6 pt-28 pb-16 text-center sm:px-10 sm:pt-32 lg:px-16 cntr">
          <h1 data-fade style={{ animationDelay: "0.25s" }}
            className="max-w-3xl text-[2rem] font-semibold leading-[1.08] tracking-tight text-balance text-white sm:max-w-2xl sm:text-5xl sm:leading-[1.05] md:max-w-3xl md:text-6xl lg:max-w-4xl lg:text-7xl lg:leading-[1.02]"
          >
            {t("headline")}
          </h1>

          <p data-fade style={{ animationDelay: "0.5s" }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-white/75"
          >
            {t("sub")}
          </p>

          <div data-fade style={{ animationDelay: "0.62s" }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Button
              size="lg"
              nativeButton={false}
              render={
                <a
                  href="/contact"
                />
              }
            >
              {t("ctaContact")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<a href="/#work" />}
              className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              {t("ctaWork")}
            </Button>
          </div>
        </div>
      </div>

      <div data-fade style={{ animationDelay: "0.7s" }} className="container mt-10 cntr">
        <dl className="grid grid-cols-1 border-border sm:grid-cols-3">
          {[
            {
              value: (
                <>
                  <span className="text-primary">0</span>%
                </>
              ),
              label: t("statFees"),
            },
            {
              value: (
                <>
                  <span className="text-primary">100</span>%
                </>
              ),
              label: t("statOwnership"),
            },
            {
              value: (
                <>
                  {t("statLiveDay")} <span className="text-primary">1</span>
                </>
              ),
              label: t("statLiveLabel"),
            },
          ].map((stat, i) => (
            <div
              key={i}
              className={`py-8 sm:py-10 md:py-12 ${
                i > 0
                  ? "border-t border-border sm:border-t-0 sm:border-l sm:pl-6 md:pl-8"
                  : "sm:pr-6 md:pr-8"
              } ${i === 2 ? "sm:pr-0" : ""}`}
            >
              <dt className="text-4xl font-light tracking-tight sm:text-5xl md:text-7xl">
                {stat.value}
              </dt>
              <dd className="mt-3 max-w-[18ch] text-[15px] leading-snug text-muted-foreground sm:mt-4">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

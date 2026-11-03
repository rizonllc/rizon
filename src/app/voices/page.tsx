import type { Metadata } from "next";
import { SectionHeader } from "@/components/section-header";
import { voices } from "@/lib/voices";
import { VoiceLibrary } from "./voice-library";

export const metadata: Metadata = {
  title: "Voice demos | Rizon",
  description: "Explore pre-made and professional voice samples.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function VoicesPage() {
  return (
    <main className="container cntr pb-20 pt-28 md:pb-28 md:pt-36">
      <SectionHeader
        as="h1"
        label="Voice demos"
        title={<>Meet your next <span className="text-primary">voice.</span></>}
        description="Explore the collection. Press play to hear a sample."
      />
      <VoiceLibrary voices={voices} />
    </main>
  );
}

import { SectionHeader } from "@/components/section-header";

export const VoicesHeader = () => (
  <SectionHeader
    as="h1"
    label="Voice demos"
    title={
      <>
        Meet your next <span className="text-primary">voice.</span>
      </>
    }
    description="Explore the collection. Press play to hear a sample."
  />
);

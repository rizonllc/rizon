import {
  CaseStudyPage,
  caseStudyMetadata,
} from "@/components/case-study-page";
import { centerForNeurodivergence } from "@/lib/center-for-neurodivergence";

export const metadata = caseStudyMetadata(centerForNeurodivergence);

export default function Page() {
  return <CaseStudyPage c={centerForNeurodivergence} />;
}

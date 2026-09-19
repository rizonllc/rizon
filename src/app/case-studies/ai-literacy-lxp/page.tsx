import {
  CaseStudyPage,
  caseStudyMetadata,
} from "@/components/case-study-page";
import { aiLiteracy } from "@/lib/ai-literacy";

export const metadata = caseStudyMetadata(aiLiteracy);

export default function Page() {
  return <CaseStudyPage c={aiLiteracy} />;
}

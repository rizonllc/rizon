import {
  CaseStudyPage,
  caseStudyMetadata,
} from "@/components/case-study-page";
import { advancedMath } from "@/lib/advanced-math";

export const metadata = caseStudyMetadata(advancedMath);

export default function Page() {
  return <CaseStudyPage c={advancedMath} />;
}

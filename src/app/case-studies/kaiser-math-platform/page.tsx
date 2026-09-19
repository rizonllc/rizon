import {
  CaseStudyPage,
  caseStudyMetadata,
} from "@/components/case-study-page";
import { kaiserMath } from "@/lib/kaiser-math";

export const metadata = caseStudyMetadata(kaiserMath);

export default function Page() {
  return <CaseStudyPage c={kaiserMath} />;
}

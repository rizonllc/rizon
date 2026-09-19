import {
  CaseStudyPage,
  caseStudyMetadata,
} from "@/components/case-study-page";
import { choiceLearning } from "@/lib/choice-learning";

export const metadata = caseStudyMetadata(choiceLearning);

export default function Page() {
  return <CaseStudyPage c={choiceLearning} />;
}

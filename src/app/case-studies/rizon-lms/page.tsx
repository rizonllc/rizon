import {
  CaseStudyPage,
  caseStudyMetadata,
} from "@/components/case-study-page";
import { rizonLms } from "@/lib/rizon-lms";

export const metadata = caseStudyMetadata(rizonLms);

export default function Page() {
  return <CaseStudyPage c={rizonLms} />;
}

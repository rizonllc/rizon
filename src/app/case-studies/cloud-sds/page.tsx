import {
  CaseStudyPage,
  caseStudyMetadata,
} from "@/components/case-study-page";
import { cloudSds } from "@/lib/cloud-sds";

export const metadata = caseStudyMetadata(cloudSds);

export default function Page() {
  return <CaseStudyPage c={cloudSds} />;
}

import { ScrollArea } from "@/components/ui/scroll-area";
import { TableOfContents } from "@/components/table-of-contents";
import type { TocHeading } from "@/lib/toc";

// Base UI pins the scroll area to position: relative, so a wrapper does the sticking.
export function PostToc({ headings, title }: { headings: TocHeading[]; title: string }) {
  return (
    <div className="sticky top-28">
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="pr-4 pb-4">
          <TableOfContents headings={headings} title={title} />
        </div>
      </ScrollArea>
    </div>
  );
}

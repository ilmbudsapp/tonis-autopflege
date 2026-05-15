import PageMeta from "@/components/layout/PageMeta";
import { VideoSection } from "@/components/sections/VideoSection";
import { PAGE_META } from "@/lib/site";

export default function VideoPage() {
  const meta = PAGE_META.video;
  return (
    <>
      <PageMeta {...meta} />
      <VideoSection />
    </>
  );
}

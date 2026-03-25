import EventDetails from "@/components/EventDetails";
import { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";
import { Suspense } from "react";

function formatSlugToTitle(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const formattedTitle = formatSlugToTitle((await params).slug);

  return {
    title: `${formattedTitle} | DevCon`,
  };
}

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  "use cache";
  cacheLife("hours");
  cacheTag(`event-${(await params).slug}`);
  const slug = params.then((p) => p.slug);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EventDetails params={slug} />
    </Suspense>
  );
};
export default EventDetailsPage;

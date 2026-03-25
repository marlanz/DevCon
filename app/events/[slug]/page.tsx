import EventDetails from "@/components/EventDetails";
import { Metadata } from "next";
import { Suspense } from "react";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

function formatSlugToTitle(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const formattedTitle = formatSlugToTitle(slug);

  return {
    title: `${formattedTitle} | DevCon`,
  };
}

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EventDetails slug={slug} />
    </Suspense>
  );
};
export default EventDetailsPage;

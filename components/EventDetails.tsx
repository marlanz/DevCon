import React from "react";
import { notFound } from "next/navigation";
import { IEvent } from "@/database";
// import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import Image from "next/image";

import EventCard from "@/components/EventCard";
import { cacheLife, cacheTag } from "next/cache";
import { getSimilarEventsBySlug } from "@/lib/actions/event.action";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function InformationSection({
  title,
  content,
  style,
}: {
  title: string;
  content: React.ReactNode;
  style?: string;
}) {
  return (
    <div className="">
      <p className={cn("text-blue font-semibold", style)}>{title}</p>
      <div className="mt-6">{content}</div>
    </div>
  );
}

function IconInformation({ icon, data }: { icon: string; data: string }) {
  return (
    <div>
      <Clock size={20} color="white" />
    </div>
  );
}

function HeroBanner({
  image,
  mode,
  organizer,
  title,
  overview,
}: {
  image: string;
  mode: string;
  organizer: string;
  title: string;
  overview: string;
}) {
  return (
    <div className="">
      <div className="w-full h-140 relative">
        <Image
          src={image}
          alt="Event Banner"
          fill
          className="banner brightness-30"
        />
      </div>
      <div className="hero-tite p-6 absolute bottom-0">
        <div className="chip-tag mb-4 flex gap-2">
          <div className="rounded-2xl bg-purple-600 font-semibold text-[16px] w-fit px-4 py-1 uppercase">
            {mode}
          </div>
          <div className="rounded-2xl border-white border bg-black-200 font-semibold text-[16px] w-fit px-4 py-1 uppercase text-blue">
            {organizer}
          </div>
        </div>
        <p className="text-7xl font-bold">{title}</p>
        <p className="text-xl font-semibold text-gray-300 mt-4">{overview}</p>
      </div>
    </div>
  );
}

function Overview({
  description,
  tags,
}: {
  description: string;
  tags: string[];
}) {
  return (
    <div className="p-5 bg-black-100">
      <p className="text-[16px]">{description}</p>
      <div className="flex gap-2 mt-4">
        {tags.map((t, index) => (
          <div
            key={index}
            className="text-black-300 rounded-2xl px-4 py-2 bg-black-200 w-fit"
          >
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

function EventTimeline({
  agenda,
  venue,
  location,
}: {
  agenda: string[];
  venue: string;
  location: string;
}) {
  const items = agenda.map((a) => {
    const [time, activity] = a.split("|");
    return { time, activity };
  });

  return (
    <div className="flex flex-col">
      {items.map((item, index) => {
        const isLastIndex = index === items.length - 1;
        return (
          <div className="" key={index}>
            <div className="agenda-item flex gap-10 items-start">
              <p className="text-[16px] text-black-300">{item.time}</p>
              <div className="agenda-content">
                <p className="text-xl font-semibold">{item.activity}</p>
                <p className="text-[16px] text-black-300 mt-2">
                  {venue} - {location}
                </p>
              </div>
            </div>
            {!isLastIndex && <Separator className="my-8" />}
          </div>
        );
      })}
    </div>
  );
}

function SimilarEvents({ events }: { events: IEvent[] }) {
  return (
    <div className="events">
      {events.length > 0 &&
        events.map((similarEvent: IEvent) => (
          <EventCard key={similarEvent.title} {...similarEvent} />
        ))}
    </div>
  );
}

function TargetAudience({ targetAudience }: { targetAudience: string }) {
  const parsedTargetAudience = targetAudience.split(",");
  return (
    <div className="flex gap-3">
      {parsedTargetAudience.map((ta, index) => (
        <div key={index} className="rounded-xl bg-black-200 px-4 py-2">
          {ta}
        </div>
      ))}
    </div>
  );
}

function EvenTimeAndLocation({}) {
  return <></>;
}

const EventDetails = async ({ slug }: { slug: string }) => {
  "use cache";
  cacheLife("hours");
  cacheTag(`event-${slug}`);

  let event;
  try {
    const request = await fetch(`${BASE_URL}/api/events/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!request.ok) {
      if (request.status === 404) {
        return notFound();
      }
      throw new Error(`Failed to fetch event: ${request.statusText}`);
    }

    const response = await request.json();
    event = response.event;

    if (!event) {
      return notFound();
    }
  } catch (error) {
    console.error("Error fetching event:", error);
    return notFound();
  }

  const {
    description,
    image,
    overview,
    date,
    time,
    location,
    mode,
    agenda,
    audience,
    tags,
    organizer,
    title,
    venue,
  } = event;

  if (!description) return notFound();

  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

  return (
    <section id="event" className="py-16">
      <section className="hero relative">
        <HeroBanner
          image={image}
          mode={mode}
          organizer={organizer}
          title={title}
          overview={overview}
        />
      </section>

      <section className="body px-6">
        <div className="flex w-full justify-between mb-20">
          <div className="left mt-20 flex flex-col gap-15 ">
            <InformationSection
              title="OVERVIEW"
              content={<Overview description={description} tags={tags} />}
            />
            <InformationSection
              title="SCHEDULE OF EVENTS"
              content={
                <EventTimeline
                  agenda={agenda}
                  venue={venue}
                  location={location}
                />
              }
            />
            <InformationSection
              title="TARGET OF AUDIENCE"
              content={<TargetAudience targetAudience={audience} />}
            />
          </div>
          <div className="time-date-price"></div>
        </div>

        <InformationSection
          title="SIMLAR EVENTS YOU DON'T WANNA MISS!"
          content={<SimilarEvents events={similarEvents} />}
          style="text-white text-2xl"
        />
      </section>
    </section>
  );
};
export default EventDetails;

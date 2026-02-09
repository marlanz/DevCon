import EventCard, { Props } from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";

const events: Props[] = [
  {
    image: "/images/event1.png",
    title: "Next.js Global Summit 2026",
    slug: "nextjs-global-summit-2026",
    location: "Singapore",
    date: "Mar 18, 2026",
    time: "09:00 AM - 05:00 PM",
  },
  {
    image: "/images/event2.png",
    title: "React Conf Vietnam",
    slug: "react-conf-vietnam",
    location: "Ho Chi Minh City, Vietnam",
    date: "Apr 10, 2026",
    time: "08:30 AM - 04:30 PM",
  },
  {
    image: "/images/event3.png",
    title: "AI & Web Hackathon 48H",
    slug: "ai-web-hackathon-48h",
    location: "Hanoi, Vietnam",
    date: "May 02–03, 2026",
    time: "All Day",
  },
  {
    image: "/images/event4.png",
    title: "DevOps Day Asia",
    slug: "devops-day-asia",
    location: "Bangkok, Thailand",
    date: "Jun 14, 2026",
    time: "10:00 AM - 06:00 PM",
  },
  {
    image: "/images/event5.png",
    title: "Open Source Contributors Meetup",
    slug: "open-source-contributors-meetup",
    location: "Online (Zoom)",
    date: "Jul 05, 2026",
    time: "07:00 PM - 09:00 PM",
  },
  {
    image: "/images/event6.png",
    title: "TypeScript Deep Dive Workshop",
    slug: "typescript-deep-dive-workshop",
    location: "Da Nang, Vietnam",
    date: "Aug 21, 2026",
    time: "01:00 PM - 05:00 PM",
  },
];

export default function Home() {
  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev <br /> Event You Cannot Miss
      </h1>
      <p className="text-center mt-5">
        Hackathons, Meetups, and Conference, All in One Place
      </p>
      <ExploreBtn />
      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events">
          {events.map((event, index) => (
            <li key={event.title} className="list-none">
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

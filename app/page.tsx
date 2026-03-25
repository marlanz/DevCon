import EventCard, { Props } from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database";
import { getAllEvents } from "@/lib/actions/event.action";
import { cacheTag } from "next/cache";
import { cacheLife } from "next/cache";

const Home = async () => {
  "use cache";
  cacheLife("hours");
  cacheTag("events");
  const { success, data } = await getAllEvents();
  if (!success) return <div>Failed to load datas</div>;

  return (
    <section className="p-10">
      <h1 className="text-center">
        The Hub for Every Deva <br /> Event You Cannot Miss
      </h1>
      <p className="text-center mt-5">
        Hackathons, Meetups, and Conference, All in One Place
      </p>
      <ExploreBtn />
      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events">
          {data &&
            data.length > 0 &&
            data.map((event: IEvent) => (
              <li key={event.title} className="list-none">
                <EventCard {...event} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Home;

import React, { useEffect } from "react";
import styles from "../css modules/home.module.css";
import { useRefresh } from "../contexts/EventRefreshProvider";
import { useState } from "react";
import EventCard from "./EventCard";

function EventList() {
  const [events, setEvents] = useState([]);
  async function fetchEvents() {
    const response = await fetch("http://localhost:8000/getAllEvents");
    if (!response.ok) {
      throw new Response("Failed to fetch events", { status: 500 });
    }
    const data = await response.json();
    setEvents(data.events);
  }
  const { state } = useRefresh();
  useEffect(() => {
    fetchEvents();
  }, [state]);
  return (
    <div className={styles.eventList}>
      <span className={styles.EventListTitle}>Real-Time Event</span>
      <div className={styles.cardHolder}>
        {events.map((event) => {
          return (
            <EventCard
              _id={event._id}
              title={event.title}
              subtitle={event.subtitle}
              date={event.date}
              location={event.location}
              venue={event.venue}
              img={event.img}
              description={event.description}
              price={event.price}
              capacity={event.capacity}
              category={event.category.name}
              organizer={event.organizer.name}
            />
          );
        })}
      </div>
    </div>
  );
}

export default EventList;

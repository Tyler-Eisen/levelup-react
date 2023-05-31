import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router'; // Import the useRouter hook
import EventCard from '../components/EventCard';
import { getEvents } from '../utils/data/eventdata';

function Home() {
  const [events, setEvents] = useState([]);
  const router = useRouter(); // Access the router object

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);

  return (
    <>
      <Button
        className="register-btn"
        onClick={() => {
          router.push('/events/new');
        }}
      >
        Register New Event
      </Button>
      <h1>Events</h1>
      <article className="events">
        {events.map((event) => (
          <section key={`event--${event.id}`} className="event">
            <EventCard
              game={event.game}
              description={event.description}
              date={event.date}
              time={event.time}
              organizer={event.organizer}
            />
          </section>
        ))}
      </article>
    </>
  );
}

export default Home;

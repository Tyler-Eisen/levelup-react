import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router'; // Import the useRouter hook
import EventCard from '../components/EventCard';
import { getEvents } from '../utils/data/eventdata';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const showEvents = () => {
    getEvents(user.uid).then((data) => setEvents(data));
  };
  useEffect(() => {
    showEvents();
  }, []);

  return (
    <article className="events">
      <h1>Events</h1>
      <Button onClick={() => {
        router.push('/events/new');
      }}
      >
        Register New Event
      </Button>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard id={event.id} description={event.description} date={event.date} time={event.time} joined={event.joined} onUpdate={showEvents} />
        </section>
      ))}
    </article>
  );
}

export default Home;

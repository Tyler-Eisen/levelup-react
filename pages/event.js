import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
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
      <div style={{
        display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',
      }}
      >
        {events.map((event) => (
          <div key={`event--${event.id}`} className="event">
            <EventCard
              id={event.id}
              description={event.description}
              date={event.date}
              time={event.time}
              joined={event.joined}
              onUpdate={showEvents}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;

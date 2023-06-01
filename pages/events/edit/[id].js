import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import EventForm from '../../../components/EventForm';
import { getSingleEvent } from '../../../utils/data/eventdata';

export default function EditEvent() {
  const [event, setEvent] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const parsedId = parseInt(id, 10); // Parse the id as an integer
      getSingleEvent(parsedId).then(setEvent);
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>Update {event.title} </title>
      </Head>
      <EventForm obj={event} />

    </>
  );
}

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import EventForm from '../../../components/EventForm';
import { getSingleEvent } from '../../../utils/data/eventdata';

export default function EditEvent() {
  const [Event, setEvent] = useState({});
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
        <title>Update {Event.title} </title>
      </Head>
      <EventForm Event={Event} />

    </>
  );
}

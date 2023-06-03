import { clientCredentials } from '../client';

const getEvents = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createEvent = (event) => fetch(`${clientCredentials.databaseURL}/events`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(event),
})
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error creating event:', error);
    throw error;
  });

const getSingleEvent = (id) => fetch(`${clientCredentials.databaseURL}/events/${id}`)
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error fetching event:', error);
    throw error;
  });

const updateEvent = (id, currentEvent) => fetch(`${clientCredentials.databaseURL}/events/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(currentEvent),
})
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error updating event:', error);
    throw error;
  });

const deleteEvent = (event) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${event}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application.json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const joinEvent = (eventId, uid) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8000/events/${eventId}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
    body: JSON.stringify({
      userId: uid,
    }),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const leaveEvent = (eventId, uid) => fetch(`http://localhost:8000/events/${eventId}/leave`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${uid}`,
  },
  body: JSON.stringify({ userId: uid }),
});

export {
  getEvents, createEvent, getSingleEvent, updateEvent, deleteEvent, joinEvent, leaveEvent,
};

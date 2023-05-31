import { clientCredentials } from '../client';

const getEvents = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events`)
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

export {
  getEvents, createEvent, getSingleEvent, updateEvent, deleteEvent,
};

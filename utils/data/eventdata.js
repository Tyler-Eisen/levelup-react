import { clientCredentials } from '../client';

const getEvents = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createEvent = (event) => {
  return fetch(`${clientCredentials.databaseURL}/events`, {
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
};

const getSingleEvent = (id) => {
  return fetch(`${clientCredentials.databaseURL}/events/${id}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error fetching event:', error);
      throw error;
    });
};

const updateEvent = (id, currentEvent) => {
  return fetch(`${clientCredentials.databaseURL}/events/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(currentGame),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error updating event:', error);
      throw error;
    });
};

export { getEvents, createEvent, getSingleEvent, updateEvent };

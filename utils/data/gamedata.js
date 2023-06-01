import { clientCredentials } from '../client';

const getGames = () => fetch(`${clientCredentials.databaseURL}/games`)
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error fetching games:', error);
    throw error;
  });

const createGame = (game) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(game),
  })
    .then((response) => response.json())
    .then((data) => {
      console.warn('Create Game Response:', data);
      resolve(data); // request.data from def create()
    })
    .catch((error) => {
      console.error('Create Game Error:', error);
      reject(error);
    });
});

const getGameTypes = () => fetch(`${clientCredentials.databaseURL}/gametypes`)
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error fetching game types:', error);
    throw error;
  });

const updateGame = (id, currentGame) => fetch(`${clientCredentials.databaseURL}/games/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(currentGame),
})
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error updating game:', error);
    throw error;
  });

const getSingleGame = (id) => fetch(`${clientCredentials.databaseURL}/games/${id}`)
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error fetching game:', error);
    throw error;
  });

const deleteGame = (game) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games/${game}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application.json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getGames, createGame, getGameTypes, updateGame, getSingleGame, deleteGame,
};

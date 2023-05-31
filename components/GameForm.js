import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createGame, getGameTypes, updateGame } from '../utils/data/gamedata';

const initialState = {
  skillLevel: 1,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  gameType: 0,
  gamer: '',

};

const GameForm = ({ game }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [gameTypes, setGameTypes] = useState([]);
  const [currentGame, setCurrentGame] = useState(initialState);

  useEffect(() => {
    getGameTypes().then(setGameTypes);
    if (game && game.id) setCurrentGame(game);
  }, [game, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (game && game.id) {
      // console.warn(currentGame);
      const payload = {
        title: currentGame.title,
        maker: currentGame.maker,
        gameType: currentGame.game_type,
        numberOfPlayers: currentGame.number_of_players,
        skillLevel: currentGame.skill_level,
      };
      // console.warn(payload);
      updateGame(game.id, payload)
        .then(() => router.push('/game'));
    } else {
      // Create a new game
      console.warn('User ID:', user.id);
      const payload = { ...currentGame, userId: user.id };
      console.warn(payload);
      createGame(payload)
        .then(() => router.push('/game'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            placeholder="What's this game called?"
            required
            value={currentGame.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Maker</Form.Label>
          <Form.Control
            name="maker"
            placeholder="Who made it?"
            required
            value={currentGame.maker}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Type</Form.Label>
          <Form.Select
            name="gameType"
            required
            value={currentGame.gameType}
            onChange={handleChange}
          >
            <option value="">Select a game type</option>
            {gameTypes.map((gameType) => (
              <option key={gameType.id} value={gameType.id}>{gameType.label}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Skill Level</Form.Label>
          <Form.Control
            name="skillLevel"
            placeholder="How hard is it?"
            required
            value={currentGame.skillLevel}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Number of Players</Form.Label>
          <Form.Control
            name="numberOfPlayers"
            placeholder="Enter number of players"
            required
            value={currentGame.numberOfPlayers}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit">{ game && game.id ? 'Update' : 'Create'} Game</Button>

      </Form>
    </>
  );
};

GameForm.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.number,
    skillLevel: PropTypes.number,
    numberOfPlayers: PropTypes.number,
    title: PropTypes.string,
    maker: PropTypes.string,
    gameType: PropTypes.number,
    gamer: PropTypes.string,
  }),
};

GameForm.defaultProps = {
  game: {
    id: 0,
    skillLevel: 1,
    numberOfPlayers: 0,
    title: '',
    maker: '',
    gameType: 0,
    gamer: '',
  },
};

export default GameForm;

import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createEvent, updateEvent } from '../utils/data/eventdata';
import { getGames } from '../utils/data/gamedata';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  game: 0,
  description: '',
  date: '',
  time: '',
  organizer: 0,
};

const EventForm = ({ obj }) => {
  const [games, setGames] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  console.warn(obj);

  useEffect(() => {
    if (obj && obj.id) {
      setCurrentEvent((prevState) => ({
        ...prevState,
        id: obj.id,
        game: obj.game ? obj.game.id : 0,
        description: obj.description,
        date: obj.date,
        time: obj.time,
        organizer: obj.organizer,
        userId: user.id,
      }));
    }
  }, [obj, user]);

  useEffect(() => {
    getGames().then(setGames);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();
    if (obj.id) {
      const eventUpdate = {
        description: currentEvent.description,
        date: currentEvent.date,
        time: currentEvent.time,
        game: currentEvent.game,
        organizer: user.id,
      };
      console.warn(eventUpdate);
      updateEvent(obj.id, eventUpdate)
        .then(() => router.push('/event'));
    } else {
      const event = {
        description: currentEvent.description,
        date: currentEvent.date,
        time: currentEvent.time,
        game: currentEvent.game,
        userId: user.uid,
      };
      createEvent(event)
        .then(() => router.push('/event'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Game</Form.Label>
          <Form.Select
            name="game"
            required
            value={currentEvent.game}
            onChange={handleChange}
          >
            <option value="">Select a game</option>
            {games.map((game) => (
              <option key={game.id} value={game.id}>{game.title}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            placeholder="Enter description"
            required
            value={currentEvent.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            required
            value={currentEvent.date}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            name="time"
            required
            value={currentEvent.time}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Organizer</Form.Label>
          <Form.Select
            name="organizer"
            required
            value={currentEvent.organizer}
            onChange={handleChange}
          >
            <option value={user.uid}>Me</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

EventForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    game: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    // eslint-disable-next-line react/forbid-prop-types
    organizer: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  }),
};

EventForm.defaultProps = {
  obj: initialState,
};

export default EventForm;

import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { deleteEvent, joinEvent, leaveEvent } from '../utils/data/eventdata';
import { useAuth } from '../utils/context/authContext';

const EventCard = ({
  id,
  description,
  date,
  time,
  onUpdate,
  joined,
}) => {
  const { user } = useAuth();
  const leave = () => leaveEvent(id, user.uid).then(() => onUpdate());
  const join = () => joinEvent(id, user.uid).then(() => onUpdate());
  const deleteThisEvent = () => {
    if (window.confirm('Delete Event?')) {
      deleteEvent(id).then(() => onUpdate());
    }
  };
  const router = useRouter();
  return (
    <Card className="text-center">
      <Card.Header>EVENT</Card.Header>
      <Card.Body>
        <Card.Text>{description}</Card.Text>
        <Card.Text>{date}</Card.Text>
        <Card.Text>{time}</Card.Text>
      </Card.Body>
      <Button
        className="edit-btn"
        onClick={() => {
          router.push(`/events/edit/${id}`);
        }}
      >
        Edit Event
      </Button>
      <Button
        className="delete-btn"
        onClick={deleteThisEvent}
      >
        Delete
      </Button>
      {
        joined
          ? <Button className="btn-danger" onClick={leave}>Leave</Button>
          : <Button className="btn-success" onClick={join}>Join</Button>
      }
    </Card>
  );
};

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  joined: PropTypes.number.isRequired,
};

export default EventCard;

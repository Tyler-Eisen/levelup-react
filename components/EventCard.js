import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';

const EventCard = ({
  description,
  date,
  time,
  id,
}) => (
  <Card className="text-center">
    <Card.Body>
      <Card.Text>{description}</Card.Text>
      <Card.Text>Date: {date}</Card.Text>
      <Card.Text>Time: {time}</Card.Text>
    </Card.Body>
    <Card.Footer className="text-muted">Event Details
      <>
        <Link href={`/events/edit/${id}`} passHref>
          <Button size="sm" className="m-2">
            EDIT
          </Button>
        </Link>
      </>
    </Card.Footer>
  </Card>
);

EventCard.propTypes = {
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default EventCard;

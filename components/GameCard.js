import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';

const GameCard = ({
  title,
  maker,
  numberOfPlayers,
  skillLevel,
  id,
}) => (
  <Card className="card">
    <Card.Header><strong>{title}</strong></Card.Header>
    <Card.Body>
      <Card.Title>By: {maker}</Card.Title>
      <Card.Text>{numberOfPlayers} players needed</Card.Text>
    </Card.Body>
    <Card.Footer className="text-muted">Skill Level: {skillLevel}
      <>
        <Link href={`/games/edit/${id}`} passHref>
          <Button size="sm" className="m-2">
            EDIT
          </Button>
        </Link>
      </>
    </Card.Footer>
  </Card>
);

GameCard.propTypes = {
  title: PropTypes.string.isRequired,
  maker: PropTypes.string.isRequired,
  numberOfPlayers: PropTypes.number.isRequired,
  skillLevel: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default GameCard;

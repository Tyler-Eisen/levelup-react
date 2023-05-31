import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router'; // Import the useRouter hook
import GameCard from '../components/GameCard';
import { getGames } from '../utils/data/gamedata';

function Home() {
  const [games, setGames] = useState([]);
  const router = useRouter(); // Access the router object
  const showGames = () => {
    getGames().then((data) => setGames(data));
  };
  useEffect(() => {
    showGames();
  }, []);

  return (
    <>
      <Button
        className="register-btn"
        onClick={() => {
          router.push('/games/new');
        }}
      >
        Register New Game
      </Button>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} />
      <h1>Games</h1>
      <article className="games">
        {games.map((game) => (
          <section key={`game--${game.id}`} className="game">
            <GameCard
              id={game.id}
              title={game.title}
              maker={game.maker}
              numberOfPlayers={game.number_of_players}
              skillLevel={game.skill_level}
              onUpdate={showGames}
            />
          </section>
        ))}
      </article>
    </>
  );
}

export default Home;

import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import GameCard from '../components/GameCard';
import { getGames } from '../utils/data/gamedata';

function Home() {
  const [games, setGames] = useState([]);
  const router = useRouter();

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
      <h1>Games</h1>
      <div style={{
        display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',
      }}
      >
        {games.map((game) => (
          <div key={`game--${game.id}`} className="game">
            <GameCard
              id={game.id}
              title={game.title}
              maker={game.maker}
              numberOfPlayers={game.number_of_players}
              skillLevel={game.skill_level}
              onUpdate={showGames}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;

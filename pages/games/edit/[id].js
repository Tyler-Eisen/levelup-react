import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSingleGame } from '../../../utils/data/gamedata';
import GameForm from '../../../components/GameForm';

export default function EditGame() {
  const [game, setGame] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const parsedId = parseInt(id, 10); // Parse the id as an integer
      getSingleGame(parsedId).then(setGame);
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>Update {game.title} </title>
      </Head>
      <GameForm game={game} />

    </>
  );
}

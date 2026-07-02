import { useState } from 'react'

import './App.css'
import axios from 'axios';
import Game from './components/Game'
import type { GameResponse } from './type/GameResponse'
import GameLobby from './components/GameLobby'
import { apiUrl } from './constant/apiUrl';
import { Toaster, toast } from 'sonner';
function App() {

  const [balance, setBalance] = useState(1000)
  const [game, setGame] = useState<GameResponse | null>(null)


  const getErrorMessage = (err: unknown): string => {
    if (axios.isAxiosError(err)) {
      return err.response?.data?.error || err.message;
    }
    return 'An unexpected error occurred.';
  };

  const handleStartGame = async () => {
    try {
      const response = await axios.post(`${apiUrl}/game/start`, {
        initialBalance: balance,
      });
      setGame(response.data);
    } catch (error) {
      toast(`Error (Start): ${getErrorMessage(error)}`);
    }
  }

  const handleAction = async (action: string, amount?: number) => {
    if (!game) {
      toast('Game not started yet.');
      return;
    }
    try {
      const response = await axios.post(`${apiUrl}/game/${game.game_id}/action`, {
        action,
        amount,
      });
      setGame(response.data);
    } catch (error) {
      toast(`Error (Action): ${getErrorMessage(error)}`);
    }
  }

  return (
    <>
      <Toaster theme="dark" closeButton={true} />
      <section id="center">
        {game ? <Game game={game} bet={game.bet} handleAction={handleAction} /> :
          <GameLobby handleStartGame={handleStartGame} balance={balance} setBalance={setBalance} />
        }
      </section >

    </>
  )
}

export default App

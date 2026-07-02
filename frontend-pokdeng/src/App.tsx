import { useState } from 'react'

import './App.css'
import axios from 'axios';
import Game from './components/Game'
import type { GameResponse } from './type/GameResponse'
import GameLobby from './components/GameLobby'

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [balance, setBalance] = useState(1000)
  const [game, setGame] = useState<GameResponse | null>(null)

  const handleStartGame = async () => {
    try {
      const response = await axios.post(apiUrl + '/game/start', {
        initialBalance: balance,
      });
      setGame(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert('Error starting game: ' + (error.response?.data?.error || error.message));
      }
    }
  }

  const handleAction = async (action: string, amount?: number) => {
    if (!game) {
      alert('Game not started yet.');
      return;
    }

    try {
      const response = await axios.post(apiUrl + `/game/${game.game_id}/action`, {
        action,
        amount,
      });
      setGame(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert('Error performing action: ' + (error.response?.data?.error || error.message));
      }
    }
  }

  return (
    <>
      <section id="center">
        {game ? <Game game={game} bet={game.bet} handleAction={handleAction} /> :
          <GameLobby handleStartGame={handleStartGame} balance={balance} setBalance={setBalance} />
        }
      </section >

    </>
  )
}

export default App

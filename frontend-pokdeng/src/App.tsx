import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import axios from 'axios';
import Game from './components/Game'

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [balance, setBalance] = useState(1000)
  const [game, setGame] = useState(null)
  const handleStartGame = async () => {
    try {
      const response = await axios.post(apiUrl + '/game/start', {
        initialBalance: balance,
      });
      console.log('Game started:', response.data);
      setGame(response.data);
    } catch (error) {
      console.error('Error starting game:', error);
      if (axios.isAxiosError(error)) {
        alert('Error starting game: ' + (error.response?.data?.error || error.message));
      }
    }
  }


  return (
    <>
      <section id="center">
        {game ? <Game /> : <>

          <div className="hero">
            <img src={heroImg} className="base" width="170" height="179" alt="" />
            <img src={reactLogo} className="framework" alt="React logo" />
            <img src={viteLogo} className="vite" alt="Vite logo" />
          </div>
          <div>
            <h1>Welcome to Pokdeng</h1>
          </div>
          <div className="flex flex-col gap-2">
            <label>Initial Balance:</label>
            <input required className="counter bg-black" type="number" value={balance} onChange={(e) => setBalance(Number(e.target.value))} />

            <button
              type="button"
              className="bg-purple-600 hover:bg-purple-700 cursor-pointer text-white font-bold py-2 px-4 rounded"
              onClick={() => handleStartGame()}
            >
              Start Game
            </button>
          </div>
        </>
        }
      </section >

    </>
  )
}

export default App

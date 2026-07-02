import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
function GameLobby({ handleStartGame, balance, setBalance }: { handleStartGame: () => void, balance: number, setBalance: (balance: number) => void }) {
    return (
        <>
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
    )
}

export default GameLobby;
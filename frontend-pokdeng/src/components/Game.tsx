import type { GameResponse } from '../type/GameResponse'
import { useState } from 'react';

function Game({ game, bet, handleAction }: { game: GameResponse; bet: number; handleAction: (action: string, amount?: number) => void }) {
    const [amount, setAmount] = useState<number>(0);
    return (
        <div className="flex flex-col gap-2">
            <div>

                <h2>Dealer</h2>
            </div>
            <div>
                <h3>GameState: {game.state}</h3>
                <h3>Winner: {game.winner || 'None'}</h3>
            </div>
            <div className="flex flex-col gap-8">
                <h2>Player</h2>
                <div className="flex flex-row gap-2 justify-center">
                    {game.player_hand.map((card, index) => (
                        <div key={index} className="w-24 h-32 rounded border border-gray-300 gap-1 bg-gray-100 flex flex-col items-center justify-center">
                            <span className="text-gray-500 text-4xl font-bold">{card.rank}</span>
                            <span className="text-gray-500">{card.suit}</span>
                            <span className="text-gray-500 text-sm">({card.value})</span>
                        </div>
                    ))}

                </div>
                <div className="flex flex-row gap-4">
                    <span>Score: {game.player_score}</span>
                    <span>Balance: {game.balance}</span>
                    <span>Bet: {bet}</span>
                </div>
            </div>
            <div>
                {game.state === "WAITING_FOR_CUT" && (
                    <div className="flex flex-col ">
                        <input placeholder='Enter amount of cut' className="counter bg-black" type="number" value={amount || ""} onChange={(e) => setAmount(Number(e.target.value))} />

                        <button className="bg-purple-600 hover:bg-purple-700 cursor-pointer text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleAction("cut", amount)}>
                            Cut
                        </button>
                    </div>
                )}
                {game.state === "WAITING_FOR_BET" && (
                    <div className="flex flex-col ">
                        <input placeholder='Enter amount of bet' className="counter bg-black" type="number" value={amount || ""} onChange={(e) => setAmount(Number(e.target.value))} />

                        <button className="bg-purple-600 hover:bg-purple-700 cursor-pointer text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleAction("bet", amount)}>
                            Bet
                        </button>
                    </div>
                )}
                {game.state === "WAITING_FOR_DECISION" && (
                    <div className="flex flex-row gap-4 justify-center">
                        <button className="bg-purple-600 hover:bg-purple-700 cursor-pointer text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleAction("draw")}>
                            Draw
                        </button>
                        <button className="bg-purple-600 hover:bg-purple-700 cursor-pointer text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleAction("stay")}>
                            Stay
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}


export default Game;
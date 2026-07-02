import type { GameResponse } from '../type/GameResponse'
import { useState } from 'react';
import GameCard from './GameCard';
import { gameStatesMsg } from '../constant/gameState';
import { toast } from 'sonner';

function Game({ game, bet, handleAction }: { game: GameResponse; bet: number; handleAction: (action: string, amount?: number) => void }) {
    const [amount, setAmount] = useState<number>(0);
    const handleClick = (action: string) => {
        if (action === "cut" || action === "bet") {
            if (amount <= 0) {
                toast('Please enter a valid amount.');
                return;
            }
        }
        handleAction(action, amount);
        setAmount(0);

    };
    return (
        <div className="flex flex-col gap-2  max-w-2xl">
            <div className="flex flex-col gap-8 ">
                <div className="flex flex-row gap-2 justify-center">
                    {game.dealer_hand.map((card, index) => (
                        <GameCard key={index} card={card} />
                    ))}
                    {game.dealer_hand.length === 0 && game.state === "WAITING_FOR_DECISION" && (
                        <>

                            <GameCard card={{ rank: '?', suit: '?', value: 0 }} />
                            <GameCard card={{ rank: '?', suit: '?', value: 0 }} />
                        </>
                    )}

                </div>
                <h2>Dealer (Score: {game.dealer_score})</h2>

            </div>
            <div className="border border-zinc-500 w-full p-4 flex flex-col gap-4 justify-center text-white">
                <h3>Status: {gameStatesMsg[game.state]}</h3>
                <h3>Winner: {game.winner || 'None'}</h3>
            </div>
            <div className="flex flex-col gap-8">
                <h2>Player (Score: {game.player_score})</h2>
                <div className="flex flex-row gap-2 justify-center">
                    {game.player_hand.map((card, index) => (
                        <GameCard key={index} card={card} />
                    ))}

                </div>
                <div className="flex flex-row gap-4 items-center justify-center text-white w-full">
                    <span>Score: {game.player_score}</span>
                    <span>Balance: {game.balance}</span>
                    <span>Bet: {bet}</span>
                </div>
            </div>
            <div>
                {game.state === "WAITING_FOR_CUT" && (
                    <div className="flex flex-col ">
                        <label>Cut amount</label>
                        <input placeholder='Enter amount of cut' className="counter bg-black" type="number" value={amount || ""} onChange={(e) => setAmount(Number(e.target.value))} />

                        <button className="bg-purple-600 hover:bg-purple-700 cursor-pointer text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleClick("cut")}>
                            Cut
                        </button>
                    </div>
                )}
                {game.state === "WAITING_FOR_BET" && (
                    <div className="flex flex-col ">
                        <label>Bet amount</label>
                        <input placeholder='Enter amount of bet' className="counter bg-black" type="number" value={amount || ""} onChange={(e) => setAmount(Number(e.target.value))} />

                        <button className="bg-purple-600 hover:bg-purple-700 cursor-pointer text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleClick("bet")}>
                            Bet
                        </button>
                    </div>
                )}
                {game.state === "WAITING_FOR_DECISION" && (
                    <div className="flex flex-row gap-4 justify-center">
                        <button className="bg-purple-600 hover:bg-purple-700 cursor-pointer text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleClick("draw")}>
                            Draw
                        </button>
                        <button className="bg-purple-600 hover:bg-purple-700 cursor-pointer text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleClick("stay")}>
                            Stay
                        </button>
                    </div>
                )}
                {game.state === "ROUND_END" && (
                    <div className="flex flex-row gap-4 justify-center">
                        <button className="bg-purple-600 hover:bg-purple-700 cursor-pointer text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleClick("next_round")}>
                            Next Round
                        </button>
                    </div>
                )}
            </div>
            <div className="absolute top-4 left-4">
                <button className="bg-gray-800 hover:bg-gray-600 cursor-pointer text-white font-bold py-2 px-4 rounded"
                    onClick={() => window.location.reload()}>
                    Back to Home
                </button>
            </div>
        </div>
    )
}


export default Game;
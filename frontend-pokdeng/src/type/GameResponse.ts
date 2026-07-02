import type { GameState } from "../constant/gameState";

export type GameResponse = {
    game_id: string;
    state: GameState;
    balance: number;
    bet: number;
    player_hand: { rank: string; suit: string; value: number }[];
    dealer_hand: { rank: string; suit: string; value: number }[];
    player_score: number;
    dealer_score: number;
    winner: string | null;
};

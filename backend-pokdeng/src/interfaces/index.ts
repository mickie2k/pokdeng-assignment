import { GameState, ErrorCode } from "../enums";
import type Deck from "../models/deck";
interface Game {
    id: string;
    state: GameState;
    balance: number;
    player: Player;
    dealer: Player;
    winner: string | null;
    deck: Deck;
    bet: number;
}

interface Player {
    name: string;
    hand: Card[];
    score: number;
}

interface Card {
    rank: string;
    suit: string;
    value: number;
}
export type { Game, Player, Card };

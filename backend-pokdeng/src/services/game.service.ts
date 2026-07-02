import { v4 as uuidv4 } from "uuid";

interface Game {
    id: string;
    state: GameState;
    balance: number;
    player: Player;
    dealer: Player;
    winner: Player | null;
    deck: Deck;
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

class Deck {
    cards: Card[];

    constructor() {
        this.cards = [];
        this.createDeck();
    }

    createDeck() {
        const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
        const rankValues = new Map<string, number>([
            ["A", 1],
            ["2", 2],
            ["3", 3],
            ["4", 4],
            ["5", 5],
            ["6", 6],
            ["7", 7],
            ["8", 8],
            ["9", 9],
            ["10", 0],
            ["J", 0],
            ["Q", 0],
            ["K", 0],
        ]);

        for (const suit of suits) {
            for (const [rank, value] of rankValues) {
                this.cards.push({ rank, suit, value });
            }
        }
    }
}

enum GameState {
    WAITING_FOR_CUT = "WAITING_FOR_CUT",
    WAITING_FOR_BET = "WAITING_FOR_BET",
    WAITING_FOR_DECISION = "WAITING_FOR_DECISION",
    DEALER_TURN = "DEALER_TURN",
    ROUND_END = "ROUND_END",
}

export class GameService {
    start(initialBalance: number) {
        const player: Player = {
            name: "Player",
            hand: [],
            score: 0,
        };
        const dealer: Player = {
            name: "Dealer",
            hand: [],
            score: 0,
        };
        const game: Game = {
            id: uuidv4(),
            state: GameState.WAITING_FOR_CUT,
            balance: initialBalance,
            player: player,
            dealer: dealer,
            winner: null,
            deck: new Deck(),
        };
        return game;
    }

    action(id, action, amount) {}
}

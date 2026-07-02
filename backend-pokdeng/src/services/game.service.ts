import { v4 as uuidv4 } from "uuid";

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

    shuffle(amount: number) {
        for (let k = 0; k < amount; k++) {
            for (let i = this.cards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const currentCard = this.cards[i];
                const randomCard = this.cards[j];

                if (!currentCard || !randomCard) {
                    continue;
                }

                this.cards[i] = randomCard;
                this.cards[j] = currentCard;
            }
        }
    }

    drawCard(): Card | undefined {
        return this.cards.pop();
    }
}

enum GameState {
    WAITING_FOR_CUT = "WAITING_FOR_CUT",
    WAITING_FOR_BET = "WAITING_FOR_BET",
    WAITING_FOR_DECISION = "WAITING_FOR_DECISION",
    DEALER_TURN = "DEALER_TURN",
    ROUND_END = "ROUND_END",
}

enum ErrorCode {
    ERR_SESSION_NOT_FOUND = "ERR_SESSION_NOT_FOUND",
    ERR_INVALID_STATE = "ERR_INVALID_STATE",
    ERR_INSUFFICIENT_BALANCE = "ERR_INSUFFICIENT_BALANCE",
    ERR_INVALID_AMOUNT = "ERR_INVALID_AMOUNT",
}
export class GameService {
    gameSessions: Map<string, Game>;

    constructor() {
        this.gameSessions = new Map<string, Game>();
    }

    start(initialBalance: number) {
        if (initialBalance < 1) {
            throw new Error("ERR_INVALID_AMOUNT");
        }

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
            bet: 0,
        };
        this.gameSessions.set(game.id, game);
        return game;
    }

    action(id: string, action: string, amount?: number) {
        const game = this.gameSessions.get(id);
        if (!game) {
            throw new Error(ErrorCode.ERR_SESSION_NOT_FOUND);
        }

        switch (action) {
            case "cut":
                this.cut(game, amount);
                break;
            case "bet":
                this.bet(game, amount);
                break;
            case "draw":
                this.draw(game);
                break;
            case "stay":
                this.stay(game);
                break;
            case "next_round":
                this.nextRound(game);
                break;
            default:
                throw new Error("ERR_INVALID_STATE");
        }

        return game;
    }

    cut(game: Game, amount?: number) {
        if (game.state !== GameState.WAITING_FOR_CUT) {
            throw new Error(ErrorCode.ERR_INVALID_STATE);
        }
        if (amount === undefined || amount < 1) {
            throw new Error(ErrorCode.ERR_INVALID_AMOUNT);
        }

        game.deck.shuffle(amount);
        game.state = GameState.WAITING_FOR_BET;
    }

    bet(game: Game, amount?: number) {
        if (game.state !== GameState.WAITING_FOR_BET) {
            throw new Error(ErrorCode.ERR_INVALID_STATE);
        }
        if (amount === undefined || amount < 1) {
            throw new Error(ErrorCode.ERR_INVALID_AMOUNT);
        }
        if (amount > game.balance) {
            throw new Error(ErrorCode.ERR_INSUFFICIENT_BALANCE);
        }

        game.balance -= amount;
        game.bet = amount;

        for (let i = 0; i < 2; i++) {
            this.drawCard(game, game.player);
            this.drawCard(game, game.dealer);
        }

        if (this.isPok(game.player) || this.isPok(game.dealer)) {
            this.endRound(game);
            return;
        }

        game.state = GameState.WAITING_FOR_DECISION;
    }

    draw(game: Game) {
        if (game.state !== GameState.WAITING_FOR_DECISION) {
            throw new Error("ERR_INVALID_STATE");
        }
        this.drawCard(game, game.player);
        this.dealerTurn(game);
    }

    stay(game: Game) {
        if (game.state !== GameState.WAITING_FOR_DECISION) {
            throw new Error("ERR_INVALID_STATE");
        }
        this.dealerTurn(game);
    }

    drawCard(game: Game, player: Player) {
        const card = game.deck.drawCard();
        if (card) {
            player.hand.push(card);
            player.score = (player.score + card.value) % 10;
        }
    }

    dealerTurn(game: Game) {
        if (game.dealer.score < 4) {
            this.drawCard(game, game.dealer);
        }
        this.endRound(game);
    }

    isPok(player: Player): boolean {
        return player.score === 8 || player.score === 9;
    }

    nextRound(game: Game) {
        if (game.state !== GameState.ROUND_END) {
            throw new Error(ErrorCode.ERR_INVALID_STATE);
        }
        game.state = GameState.WAITING_FOR_CUT;
        game.player.hand = [];
        game.player.score = 0;
        game.dealer.hand = [];
        game.dealer.score = 0;
        game.deck = new Deck();
        game.winner = null;
        game.bet = 0;
    }

    endRound(game: Game) {
        game.state = GameState.ROUND_END;
        if (game.player.score > game.dealer.score) {
            game.winner = game.player.name;
            game.balance += game.bet * 2;
        } else if (game.player.score < game.dealer.score) {
            game.winner = game.dealer.name;
        } else {
            game.winner = "Tie";
            game.balance += game.bet;
        }
    }
}

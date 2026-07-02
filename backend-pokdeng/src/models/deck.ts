import { type Card } from "../interfaces";
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
export default Deck;

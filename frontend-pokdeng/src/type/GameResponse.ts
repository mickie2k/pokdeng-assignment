export type GameResponse = {
    game_id: string;
    state: string;
    balance: number;
    bet: number;
    player_hand: { rank: string; suit: string; value: number }[];
    dealer_hand: { rank: string; suit: string; value: number }[];
    player_score: number;
    dealer_score: number;
    winner: string | null;
};

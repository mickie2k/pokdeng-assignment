export const gameStatesMsg = {
    WAITING_FOR_CUT: "Waiting for cut",
    WAITING_FOR_BET: "Waiting Player to bet",
    WAITING_FOR_DECISION: "Waiting for Player to draw or stay",
    ROUND_END: "End of round",
} as const;

export type GameState = keyof typeof gameStatesMsg;

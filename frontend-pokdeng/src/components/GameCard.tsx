function GameCard({ card }: { card: { rank: string; suit: string; value: number } }) {
    return (
        <div className="w-24 h-32 rounded border border-gray-300 gap-1 bg-gray-100 flex flex-col items-center justify-center">
            <span className="text-gray-500 text-4xl font-bold">{card.rank}</span>
            <span className="text-gray-500">{card.suit}</span>
            <span className="text-gray-500 text-sm">({card.value})</span>
        </div>
    );
}

export default GameCard;
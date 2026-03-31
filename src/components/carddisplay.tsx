type Card = {
  suit: string;
  rank: string;
  value: number;
};

interface CardDisplayProps {
  card: Card | null;
  title: string;
}

function CardDisplay({ card, title }: CardDisplayProps) {
  function getSuitOffset(suit: string): number {
    switch (suit) {
      case "clubs":
        return 0;
      case "diamonds":
        return 13;
      case "hearts":
        return 26;
      case "spades":
        return 39;
      default:
        return 0;
    }
  }

  function getRankIndex(rank: string): number {
    switch (rank) {
      case "2":
        return 0;
      case "3":
        return 1;
      case "4":
        return 2;
      case "5":
        return 3;
      case "6":
        return 4;
      case "7":
        return 5;
      case "8":
        return 6;
      case "9":
        return 7;
      case "10":
        return 8;
      case "J":
        return 9;
      case "Q":
        return 10;
      case "K":
        return 11;
      case "A":
        return 12;
      default:
        return 0;
    }
  }

  function getCardImagePath(currentCard: Card | null): string {
    if (!currentCard) {
      return "/cards/-1.png";
    }

    const imageNumber =
      getSuitOffset(currentCard.suit) + getRankIndex(currentCard.rank);

    return `/cards/${imageNumber}.png`;
  }

  return (
    <div>
      <h2>{title}</h2>
      <img
        src={getCardImagePath(card)}
        alt={card ? `${card.rank} of ${card.suit}` : "No card yet"}
        width="120"
      />
      <p>{card ? `${card.rank} of ${card.suit}` : "No card yet"}</p>
    </div>
  );
}

export default CardDisplay;

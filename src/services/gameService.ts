export type Card = {
  suit: string;
  rank: string;
  value: number;
};

export type PublicGameState = {
  rounds: number;
  playerCardCount: number;
  computerCardCount: number;
  lastPlayerCard: Card | null;
  lastComputerCard: Card | null;
  lastResult: string;
  isFinished: boolean;
  winner: string | null;
};

type GameResponse = {
  game: PublicGameState;
};

const BASE_URL = "http://localhost:3000";

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function startGame(): Promise<PublicGameState> {
  const response = await fetch(`${BASE_URL}/game/start`, {
    method: "POST",
    headers: getAuthHeaders(),
  });

  const result: GameResponse = await response.json();
  return result.game;
}

export async function getCurrentGame(): Promise<PublicGameState> {
  const response = await fetch(`${BASE_URL}/game/current`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const result: GameResponse = await response.json();
  return result.game;
}

export async function playRound(): Promise<PublicGameState> {
  const response = await fetch(`${BASE_URL}/game/current/play-round`, {
    method: "POST",
    headers: getAuthHeaders(),
  });

  const result: GameResponse = await response.json();
  return result.game;
}

export type GameHistoryItem = {
  id: number;
  rounds: number;
  result: string;
  finishedAt: string;
};

type HistoryResponse = {
  games: GameHistoryItem[];
};

export async function getHistory(): Promise<GameHistoryItem[]> {
  const response = await fetch(`${BASE_URL}/game/history`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const result: HistoryResponse = await response.json();
  return result.games;
}

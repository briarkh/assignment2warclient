import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentGame, playRound, startGame } from "../services/gameService";
import CardDisplay from "../components/carddisplay";

type Card = {
  suit: string;
  rank: string;
  value: number;
};

type PublicGameState = {
  rounds: number;
  playerCardCount: number;
  computerCardCount: number;
  lastPlayerCard: Card | null;
  lastComputerCard: Card | null;
  lastResult: string;
  isFinished: boolean;
  winner: string | null;
};

function Gamepage() {
  const [game, setGame] = useState<PublicGameState | null>(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadGame() {
      try {
        const currentGame = await getCurrentGame();
        setGame(currentGame);
      } catch {
        setMessage("No current game found. Start a new game.");
      }
    }

    loadGame();
  }, []);

  async function handleStartGame() {
    try {
      const newGame = await startGame();
      setGame(newGame);
      setMessage("New game started.");
    } catch {
      setMessage("Could not start game.");
    }
  }

  async function handlePlayRound() {
    try {
      const updatedGame = await playRound();
      setGame(updatedGame);
      setMessage("Round played.");
    } catch {
      setMessage("Could not play round.");
    }
  }

  function handleViewHistory() {
    navigate("/history");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div>
      <h1>War Game</h1>
      <button onClick={handleStartGame}>Start New Game</button>
      <button onClick={handleViewHistory}>History</button>
      <button onClick={handleLogout}>Logout</button>

      {game && (
        <div>
          <p>Rounds: {game.rounds}</p>
          <p>Your card count: {game.playerCardCount}</p>
          <p>Computer card count: {game.computerCardCount}</p>
          <p>Round result: {game.lastResult}</p>

          <CardDisplay card={game.lastPlayerCard} title="Your card" />
          <CardDisplay card={game.lastComputerCard} title="Computer card" />

          <p>Game finished: {game.isFinished ? "Yes" : "No"}</p>

          <p>Winner: {game.winner ? game.winner : "No winner yet"}</p>

          <button onClick={handlePlayRound} disabled={game.isFinished}>
            Flip
          </button>
        </div>
      )}

      <p>{message}</p>
    </div>
  );
}

export default Gamepage;

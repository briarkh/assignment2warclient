import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getHistory } from "../services/gameService";

type GameHistoryItem = {
  id: number;
  rounds: number;
  result: string;
  finishedAt: string;
};

function Historypage() {
  const [games, setGames] = useState<GameHistoryItem[]>([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadHistory() {
      try {
        const history = await getHistory();
        setGames(history);
      } catch {
        setMessage("could not load game history");
      }
    }

    loadHistory();
  }, []);

  return (
    <div>
      <h1>Past Games</h1>

      <table>
        <thead>
          <tr>
            <th>Rounds</th>
            <th>Result</th>
            <th>Finished At</th>
          </tr>
        </thead>
        <tbody>
          {games.length > 0 ? (
            games.map((game) => (
              <tr key={game.id}>
                <td>{game.rounds}</td>
                <td>{game.result}</td>
                <td>{game.finishedAt}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No past games found</td>
            </tr>
          )}
        </tbody>
      </table>

      <p>{message}</p>

      <button onClick={() => navigate("/game")}>Back to game</button>
    </div>
  );
}

export default Historypage;

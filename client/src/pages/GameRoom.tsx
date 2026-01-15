import { useState } from "react";
import { useLocation, useRoute } from "wouter";
import { submitWord, leaveGame } from "@/lib/api";

export default function GameRoom() {
  // Match route like /game/:id
  const [, params] = useRoute("/game/:id");
  const gameId = params?.id;

  const [, navigate] = useLocation();

  const [word, setWord] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!gameId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Invalid game ID
      </div>
    );
  }

  async function handleSubmitWord() {
    if (!word.trim()) return;

    setLoading(true);
    setMessage(null);

    try {
      const res = await submitWord(word);
      if (res?.success) {
        setMessage("Word submitted!");
        setWord("");
      } else {
        setMessage("Invalid word");
      }
    } catch {
      setMessage("Failed to submit word");
    } finally {
      setLoading(false);
    }
  }

  async function handleLeaveGame() {
    try {
      await leaveGame(gameId, "local-user");
      navigate("/");
    } catch {
      setMessage("Failed to leave game");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur">
        <h1 className="mb-6 text-center text-3xl font-bold tracking-tight">
          Game Room
        </h1>

        <div className="flex flex-col gap-4">
          <input
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter a word"
            className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-2 text-white outline-none focus:border-primary"
          />

          <button
            onClick={handleSubmitWord}
            disabled={loading}
            className="w-full rounded-lg bg-primary py-2 font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Word"}
          </button>

          <button
            onClick={handleLeaveGame}
            className="w-full rounded-lg bg-red-600 py-2 font-semibold text-white transition hover:bg-red-700"
          >
            Leave Game
          </button>

          {message && (
            <p className="text-center text-sm text-muted-foreground">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

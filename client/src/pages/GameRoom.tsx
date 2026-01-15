import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { submitWord, leaveGame } from "@/lib/api";

export default function GameRoom() {
  const { id: gameId } = useParams<{ id: string }>();
  const navigate = useNavigate();

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
      if (res.success) {
        setMessage("✅ Word submitted!");
        setWord("");
      } else {
        setMessage("❌ Invalid word");
      }
    } catch {
      setMessage("❌ Failed to submit word");
    } finally {
      setLoading(false);
    }
  }

  async function handleLeaveGame() {
    try {
      await leaveGame(gameId, "local-user");
      navigate("/");
    } catch {
      setMessage("❌ Failed to leave game");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center">
          Game Room
        </h1>

        {/* Main layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT — Players */}
          <div className="glass-panel p-4 space-y-3">
            <h2 className="text-lg font-semibold">Players</h2>

            {/* Mocked for UI polish */}
            {["You", "Opponent"].map((p) => (
              <div
                key={p}
                className="rounded-md border border-white/10 px-3 py-2"
              >
                {p}
              </div>
            ))}
          </div>

          {/* CENTER — Game */}
          <div className="glass-panel p-6 space-y-4 md:col-span-2">
            <h2 className="text-xl font-semibold text-center">
              Current Word
            </h2>

            <div className="text-4xl font-mono text-center tracking-widest">
              —
            </div>

            <input
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="Enter a word"
              className="w-full rounded-md bg-background border border-white/10 px-4 py-3"
            />

            <button
              onClick={handleSubmitWord}
              disabled={loading}
              className="neon-button w-full disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Word"}
            </button>

            <button
              onClick={handleLeaveGame}
              className="w-full rounded-md border border-red-500/40 text-red-400 py-2 hover:bg-red-500/10 transition"
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
    </div>
  );
}

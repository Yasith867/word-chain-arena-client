import { useState } from "react";
import {
  createUser,
  createGame,
  joinGame,
  submitWord,
  leaveGame,
} from "@/lib/api";

/* =========================
   useCreateUser
========================= */

export function useCreateUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (username: string) => {
    setLoading(true);
    setError(null);
    try {
      return await createUser(username);
    } catch (e) {
      setError("Failed to create user");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
}

/* =========================
   useCreateGame
========================= */

export function useCreateGame() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async () => {
    setLoading(true);
    setError(null);
    try {
      return await createGame();
    } catch (e) {
      setError("Failed to create game");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
}

/* =========================
   useJoinGame
========================= */

export function useJoinGame() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (gameId: string, userId: string) => {
    setLoading(true);
    setError(null);
    try {
      return await joinGame(gameId, userId);
    } catch (e) {
      setError("Failed to join game");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
}

/* =========================
   useGameActions (GameRoom)
========================= */

export function useGameActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (word: string) => {
    setLoading(true);
    setError(null);
    try {
      return await submitWord(word);
    } catch (e) {
      setError("Failed to submit word");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const leave = async (gameId: string, userId: string) => {
    setLoading(true);
    setError(null);
    try {
      return await leaveGame(gameId, userId);
    } catch (e) {
      setError("Failed to leave game");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { submit, leave, loading, error };
}

// src/lib/api.ts
// Frontend-only MOCK API for Netlify / demo builds

function delay(ms = 400) {
  return new Promise((r) => setTimeout(r, ms));
}

/* =======================
   USERS
======================= */

export async function createUser(username: string) {
  await delay();
  console.log("Mock createUser:", username);

  return {
    id: "local-user",
    username,
  };
}

/* =======================
   GAMES
======================= */

export async function createGame() {
  await delay();
  console.log("Mock createGame");

  return {
    gameId: crypto.randomUUID(),
  };
}

export async function joinGame(gameId: string) {
  await delay();
  console.log("Mock joinGame:", gameId);

  return {
    gameId,
    playerId: "local-player",
  };
}

export async function submitWord(word: string) {
  await delay();
  console.log("Mock submitWord:", word);

  return {
    success: true,
  };
}

export async function leaveGame(gameId: string, userId: string) {
  await delay();
  console.log("Mock leaveGame:", { gameId, userId });

  return {
    success: true,
  };
}

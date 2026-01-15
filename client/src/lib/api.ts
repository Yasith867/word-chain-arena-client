// Mock API layer (frontend-only)

export async function submitWord(word: string) {
  console.log("Mock submitWord:", word);

  // fake delay
  await new Promise((r) => setTimeout(r, 500));

  return {
    success: true,
  };
}

export async function leaveGame(gameId: string, userId: string) {
  console.log("Mock leaveGame:", { gameId, userId });

  await new Promise((r) => setTimeout(r, 300));

  return {
    success: true,
  };
}

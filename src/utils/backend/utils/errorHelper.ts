

export const handleError = (error: unknown, context: string): never => {
  if (error instanceof Error) {
    console.error(`[${context}] Error:`, error.message, error.stack);
    throw error;
  }

  console.error(`[${context}] Non-Error thrown:`, error);
  throw new Error(`[${context}] failed: Unknown error`);
}
// Shared helpers used across routes and components.

import fs from 'node:fs/promises';

// Runtime guard values for retryable codes behavior.
const RETRYABLE_CODES = new Set(['ECANCELED', 'EAGAIN', 'EBUSY', 'EMFILE', 'ENFILE']);

type RetryableError = NodeJS.ErrnoException;

// True for transient filesystem errors that are worth retrying.
function isRetryable(error: unknown): error is RetryableError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof (error as { code?: unknown }).code === 'string' &&
    RETRYABLE_CODES.has((error as { code: string }).code)
  );
}

// Small sleep helper used by timeout and retry logic.
function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Retry transient filesystem failures before surfacing an error.
async function withFsRetry<T>(operation: () => Promise<T>) {
  const maxAttempts = 6;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      if (!isRetryable(error) || attempt === maxAttempts) {
        throw error;
      }
      await wait(attempt * 50);
    }
  }

  throw new Error('Filesystem retry loop exhausted unexpectedly.');
}

// Reads file utf8 safe from the local filesystem.
export function readFileUtf8Safe(filePath: string) {
  return withFsRetry(() => fs.readFile(filePath, 'utf8'));
}

// Reads directory safe from the local filesystem.
export function readDirectorySafe(dirPath: string) {
  return withFsRetry(() => fs.readdir(dirPath));
}

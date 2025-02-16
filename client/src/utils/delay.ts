/**
 * Delays the execution for a specified amount of time.
 *
 * @param time - The amount of time to delay in milliseconds.
 */

export function delay(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time));
}

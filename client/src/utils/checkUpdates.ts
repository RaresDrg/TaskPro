/**
 * Compares two objects and determines if they are different, using a superficial comparison.
 *
 * @template T - The type of objects being compared.
 * @param initialValues - The initial set of values.
 * @param actualValues - The updated set of values.
 * @returns {boolean} - Returns true if the objects are different, otherwise false.
 */
export function checkUpdates<T>(initialValues: T, actualValues: T): boolean {
  return JSON.stringify(initialValues) !== JSON.stringify(actualValues);
}

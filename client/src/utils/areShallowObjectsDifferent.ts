type ShallowValue = string | number | boolean | null | undefined | File;
type ShallowObject = Record<string, ShallowValue>;

export function areShallowObjectsDifferent<T extends ShallowObject>(
  firstObject: T,
  secondObject: T,
) {
  const firstObjectKeys = Object.keys(firstObject);
  const secondObjectKeys = Object.keys(secondObject);

  if (firstObjectKeys.length !== secondObjectKeys.length) return true;

  return firstObjectKeys.some((key) => firstObject[key] !== secondObject[key]);
}

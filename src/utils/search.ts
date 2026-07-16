export function linearSearch<T>(
  items: readonly T[],
  target: T,
  isMatch: (item: T, targetValue: T) => boolean = (item, targetValue) => item === targetValue
): number {
  for (let index = 0; index < items.length; index += 1) {
    if (isMatch(items[index], target)) {
      return index;
    }
  }
  return -1;
}

export function binarySearch<T>(
  items: readonly T[],
  target: T,
  compareFn: (item: T, targetValue: T) => number
): number {
  let low = 0;
  let high = items.length - 1;

  while (low <= high) {
    const middle = Math.floor((low + high) / 2);
    const comparison = compareFn(items[middle], target);

    if (comparison === 0) {
      return middle;
    }

    if (comparison < 0) {
      low = middle + 1;
    } else {
      high = middle - 1;
    }
  }

  return -1;
}

export function binarySearchByNumber(
  sortedNumbers: readonly number[],
  target: number
): number {
  return binarySearch(sortedNumbers, target, (item, targetValue) => item - targetValue);
}

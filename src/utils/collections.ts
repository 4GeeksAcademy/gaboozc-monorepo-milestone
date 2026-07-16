export type SortOrder = "asc" | "desc";

export function filterBy<T>(items: readonly T[], predicate: (item: T) => boolean): T[] {
  return items.filter(predicate);
}

export function filterByField<T, K extends keyof T>(
  items: readonly T[],
  field: K,
  value: T[K]
): T[] {
  return items.filter((item) => item[field] === value);
}

export function filterByRange<T>(
  items: readonly T[],
  valueSelector: (item: T) => number,
  min: number,
  max: number
): T[] {
  return items.filter((item) => {
    const value = valueSelector(item);
    return value >= min && value <= max;
  });
}

export function sortBy<T>(items: readonly T[], compareFn: (a: T, b: T) => number): T[] {
  return [...items].sort(compareFn);
}

export function sortByField<T, K extends keyof T>(
  items: readonly T[],
  field: K,
  order: SortOrder = "asc"
): T[] {
  const direction = order === "asc" ? 1 : -1;
  return [...items].sort((a, b) => {
    const first = a[field];
    const second = b[field];

    if (first < second) {
      return -1 * direction;
    }
    if (first > second) {
      return 1 * direction;
    }
    return 0;
  });
}

export function sortByMultiple<T>(
  items: readonly T[],
  comparators: Array<(a: T, b: T) => number>
): T[] {
  return [...items].sort((a, b) => {
    for (const comparator of comparators) {
      const result = comparator(a, b);
      if (result !== 0) {
        return result;
      }
    }
    return 0;
  });
}

export function groupBy<T, K extends string | number>(
  items: readonly T[],
  keySelector: (item: T) => K
): Record<string, T[]> {
  return items.reduce<Record<string, T[]>>((groups, item) => {
    const key = String(keySelector(item));
    const existing = groups[key] ?? [];
    groups[key] = [...existing, item];
    return groups;
  }, {});
}

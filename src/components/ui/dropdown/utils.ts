import type { DropdownOption } from "./types"

export const mapToDropdownOptions = <
  T extends Record<string, string>
>(obj: T): DropdownOption[] => {
  return Object.entries(obj).map(([label, value]) => ({ label, value }))
}

// util/createDropdownOptions.ts
export const createDropdownOptions = (values: readonly string[]) =>
  values.map((value) => ({ label: value, value }));

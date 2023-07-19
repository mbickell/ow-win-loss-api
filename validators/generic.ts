import { Role } from "../types/hero/hero";

export const isInEnum = <T extends Object>(
  enumToCheck: T,
  val: string
): boolean => Object.values(enumToCheck).includes(val as Role);

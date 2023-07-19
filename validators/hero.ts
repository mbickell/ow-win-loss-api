import { DamageType, Playstyle, Role } from "../types/hero/hero";
import { isInEnum } from "./generic";

export const isRoleEnum = (val: string) => isInEnum(Role, val);

export const isDamageTypeEnum = (val: string[]) =>
  val.every((value) => isInEnum(DamageType, value));

export const isPlaystyleEnum = (val: string[]) =>
  val.every((value) => isInEnum(Playstyle, value));

import { CompRole, Outcome, SkillTier } from "../types/record/record";
import { isInEnum } from "./generic";

export const isSkillTierEnum = (val: string) => isInEnum(SkillTier, val);

export const isCompRoleEnum = (val: string) => isInEnum(CompRole, val);

export const isOutcomeEnum = (val: string) => isInEnum(Outcome, val);

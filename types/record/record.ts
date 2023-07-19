import { Date } from "mongoose";
import { CreateArrayWithLengthX, NumericRange } from "../core/helper";

export enum SkillTier {
  TOP500 = "top500",
  GRANDMASTER = "grandmaster",
  MASTER = "master",
  DIAMOND = "diamond",
  PLATINUM = "platinum",
  GOLD = "gold",
  SILVER = "silver",
  BRONZE = "bronze"
}
export type Division = 1 | 2 | 3 | 4 | 5;
type Top500 = NumericRange<CreateArrayWithLengthX<1>, 500>;
type Percentage = NumericRange<CreateArrayWithLengthX<1>, 100>;
export enum CompRole {
  TANK = "tank",
  DAMAGE = "damage",
  SUPPORT = "support",
  OPEN = "open"
}
export enum Outcome {
  WIN = "win",
  LOSS = "loss",
  DRAW = "draw"
}

export interface IRecord {
  role: CompRole;
  outcome: Outcome;
  heroesPlayed: string[];
  username: string;
  newRanking?: boolean;
  newSkillTier?: SkillTier;
  newDivision?: Division;
  newPosition?: Top500;
  newPercentage?: Percentage;
  newSeason?: boolean;
  timeStamp?: Date; //not exposed to users
}

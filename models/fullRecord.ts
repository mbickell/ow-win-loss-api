import { Schema, model } from "mongoose";
import { IFullRecord } from "../types/record/record";
import {
  isCompRoleEnum,
  isOutcomeEnum,
  isSkillTierEnum
} from "../validators/record";

const FullRecordScheme = new Schema<IFullRecord>({
  heroesPlayed: { type: [String], required: true },
  newDivision: { type: Number, min: 1, max: 5 },
  newPercentage: { type: Number, min: 1, max: 100 },
  newPosition: { type: Number, min: 1, max: 500 },
  newRanking: { type: Boolean, default: false },
  newSeason: { type: Boolean, default: false },
  newSkillTier: {
    type: String,
    validate: {
      validator: isSkillTierEnum,
      message: "{VALUE} is not a valid skill tier"
    }
  },
  outcome: {
    type: String,
    required: true,
    validate: {
      validator: isOutcomeEnum,
      message: "{VALUE} is not a valid outcome"
    }
  },
  role: {
    type: String,
    required: true,
    validate: {
      validator: isCompRoleEnum,
      message: "{VALUE} is not a valid role"
    }
  },
  dateTime: { type: Date, required: true },
  username: { type: String, required: true }
});

export const FullRecord = model("FullRecord", FullRecordScheme, "Records");

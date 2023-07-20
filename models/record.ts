import { Schema, model } from "mongoose";
import { IRecord } from "../types/record/record";
import { isCompRoleEnum, isOutcomeEnum } from "../validators/record";

const RecordScheme = new Schema<IRecord>({
  heroesPlayed: { type: [String], required: true },
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

export const Record = model("Record", RecordScheme, "Records");

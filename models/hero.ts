import { Schema, model } from "mongoose";
import { IHero } from "../types/hero/hero";
import {
  isDamageTypeEnum,
  isPlaystyleEnum,
  isRoleEnum
} from "../validators/hero";

const HeroScheme = new Schema<IHero>({
  role: {
    type: String,
    required: true,
    validate: { validator: isRoleEnum, message: `{VALUE} is not a valid role` }
  },
  name: { type: String, unique: true, required: true },
  damageType: {
    type: [String],
    required: true,
    validate: {
      validator: isDamageTypeEnum,
      message: `{VALUE} is not a valid damage type`
    }
  },
  playstyle: {
    type: [String],
    required: true,
    validate: {
      validator: isPlaystyleEnum,
      message: `{VALUE} is not a valid playstyle`
    }
  }
});

export const Hero = model("Hero", HeroScheme, "Heroes");

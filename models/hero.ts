import { Schema, model } from "mongoose";
import { IHero } from "../types/hero/hero";

const HeroScheme = new Schema<IHero>({
  role: { type: String, required: true },
  name: { type: String, unique: true, required: true },
  damageType: { type: [String], required: true },
  playstyle: { type: [String], required: true }
});

export const Hero = model("Hero", HeroScheme, "AppData");

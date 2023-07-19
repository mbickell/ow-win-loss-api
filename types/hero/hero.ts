export type Role = "tank" | "damage" | "support";
export type DamageType = "hitscan" | "projectile" | "beam" | "melee";
export type Playstyle = "rush" | "dive" | "poke";

export interface IHero {
  role: Role;
  name: string;
  damageType: DamageType[];
  playstyle: Playstyle[];
}

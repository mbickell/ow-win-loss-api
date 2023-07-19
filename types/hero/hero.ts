export enum Role {
  TANK = "tank",
  DAMAGE = "damage",
  SUPPORT = "support"
}

export enum DamageType {
  HITSCAN = "hitscan",
  PROJECTILE = "projectile",
  BEAM = "beam",
  MELEE = "melee"
}

export enum Playstyle {
  RUSH = "rush",
  DIVE = "dive",
  POKE = "poke"
}

export interface IHero {
  role: Role;
  name: string;
  damageType: DamageType[];
  playstyle: Playstyle[];
}

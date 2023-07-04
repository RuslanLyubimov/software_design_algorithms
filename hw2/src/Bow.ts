import { Weapon } from "./Weapon";

export class Bow extends Weapon {
  constructor(baseDamage: number, baseDurability: number, value: number, weight: number) {
    super("bow", baseDamage, baseDurability, value, weight);
  }

  polish(): void {
    const maxDurability = 1;
    if (this.getEffectiveDurability(this.durabilityModifier + Weapon.MODIFIER_CHANGE_RATE) <= maxDurability) {
      this.durabilityModifier += Weapon.MODIFIER_CHANGE_RATE;
    }
  }
}

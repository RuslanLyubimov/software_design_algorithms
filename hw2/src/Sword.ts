import { Weapon } from "./Weapon";

export class Sword extends Weapon {
  constructor(baseDamage: number, baseDurability: number, value: number, weight: number) {
    super("sword", baseDamage, baseDurability, value, weight);
  }

  polish(): void {
    const maxDamageIncrease = this.baseDamage * 0.25;
    if (this.damageModifier < maxDamageIncrease) {
      this.damageModifier += Weapon.MODIFIER_CHANGE_RATE;
      if (this.damageModifier > maxDamageIncrease) {
        this.damageModifier = maxDamageIncrease;
      }
    }
  }
}

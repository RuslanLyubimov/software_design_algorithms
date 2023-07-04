import { Item } from "./Item";

export class Weapon extends Item {
  public static readonly MODIFIER_CHANGE_RATE: number = 0.05;
  protected baseDamage: number;
  protected damageModifier: number;
  private baseDurability: number;
  protected durabilityModifier: number;
  protected isBroken: boolean;

  constructor(name: string, baseDamage: number, baseDurability: number, value: number, weight: number) {
    super(name, value, weight);
    this.baseDamage = baseDamage;
    this.damageModifier = 0;
    this.baseDurability = baseDurability;
    this.durabilityModifier = 0;
    this.isBroken = false;
  }

  public getEffectiveDamage(): number {
    return this.baseDamage + this.damageModifier;
  }

  public getEffectiveDurability(durabilityModifier?: number): number {
    if (typeof durabilityModifier === "number") {
      return this.baseDurability + durabilityModifier;
    } else {
      return this.baseDurability + this.durabilityModifier;
    }
  }

  toString(): string {
    const formattedWeight = this.weight.toFixed(2);
    const formattedDamage = this.getEffectiveDamage().toFixed(2);
    const formattedDurability = (this.getEffectiveDurability() * 100).toFixed(2);
    return (
      this.name +
      " - Value: " +
      this.value.toFixed(2) +
      ", Weight: " +
      formattedWeight +
      ", Damage: " +
      formattedDamage +
      ", Durability: " +
      formattedDurability +
      "%"
    );
  }

  use(): string {
    if (this.isBroken) {
      return "You can't use the " + this.name + ", it is broken.";
    }

    this.durabilityModifier -= Weapon.MODIFIER_CHANGE_RATE;

    if (this.getEffectiveDurability() <= 0) {
      this.isBroken = true;
      return (
        "You use the " +
        this.name +
        ", dealing " +
        Weapon.MODIFIER_CHANGE_RATE +
        " points of damage.\nThe " +
        this.name +
        " breaks."
      );
    }

    return "You use the " + this.name + ", dealing " + Weapon.MODIFIER_CHANGE_RATE + " points of damage.";
  }
}

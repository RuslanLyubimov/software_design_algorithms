import { Item } from "./Item";

export class Consumable extends Item {
  public isConsumed: boolean;
  private isSpoiled: boolean;

  constructor(name: string, value: number, weight: number, isSpoiled: boolean = false) {
    super(name, value, weight);
    this.isConsumed = false;
    this.isSpoiled = isSpoiled;
  }

  use(): string {
    if (this.isConsumed) {
      return `There's nothing left of the ${this.name} to consume.`;
    } else {
      this.isConsumed = true;
      let result = `You consumed the ${this.name}.`;

      if (this.isSpoiled) {
        result += "\nYou feel sick.";
      }

      return result;
    }
  }

  isSpoileed(): boolean {
    return this.isSpoiled;
  }
}

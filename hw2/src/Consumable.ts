import { Item } from "./Item";
export class Consumable extends Item {
  public isConsumed: boolean;
  private isSpoiled: boolean;

  constructor(name: string, value: number, weight: number, isSpoiled: boolean) {
    super(name, value, weight);
    this.isConsumed = false;
    this.isSpoiled = isSpoiled;
  }

  use(): void {
    if (this.isConsumed) {
      console.log(`There is nothing left of the ${this.name} to consume.`);
    } else {
      this.isConsumed = true;
      console.log(`You consumed the ${this.name}.`);
      if (this.isSpoiled) {
        console.log("You feel sick.");
      }
    }
  }
}

import { Item } from "./Item";
export class Consumable extends Item {
  private isSpoiled: boolean;
  private isConsumed: boolean;

  constructor(name: string, value: number, weight: number, isSpoiled: boolean) {
    super(name, value, weight);
    this.isSpoiled = isSpoiled;
    this.isConsumed = false;
  }

  use(): void {
    if (this.isConsumed) {
      console.log("There is nothing left of the " + this.name + " to consume.");
    } else {
      this.isConsumed = true;
      console.log("You consumed the " + this.name + ".");
      if (this.isSpoiled) {
        console.log("You feel sick.");
      }
    }
  }
}

import { Consumable } from "./Consumable";

export class Pizza extends Consumable {
  public readonly numberOfSlices: number;
  private numberOfEatenSlices: number;

  constructor(value: number, weight: number, numberOfSlices: number, isSpoiled?: boolean) {
    super("Pizza", value, weight, isSpoiled === undefined ? false : isSpoiled);
    this.numberOfSlices = numberOfSlices;
    this.numberOfEatenSlices = 0;
  }

  use(): string {
    if (this.numberOfEatenSlices < this.numberOfSlices) {
      this.numberOfEatenSlices++;
      return "You consumed a slice of the pizza.";
    } else {
      return "There's nothing left of the pizza to consume.";
    }
  }

  getNumberOfEatenSlices(): number {
    return this.numberOfEatenSlices;
  }
}

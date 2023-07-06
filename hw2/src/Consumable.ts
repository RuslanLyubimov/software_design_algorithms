import { Item } from "./Item";

export class Consumable extends Item {
  public isConsumed: boolean;
  private _isSpoiled: boolean;

  constructor(name: string, value: number, weight: number, _isSpoiled: boolean = false) {
    super(name, value, weight);
    this.isConsumed = false;
    this._isSpoiled = _isSpoiled;
  }

  use(): string {
    if (this.isConsumed) {
      return `There's nothing left of the ${this.name} to consume.`;
    } else {
      this.isConsumed = true;
      let result = `You consumed the ${this.name}.`;

      if (this._isSpoiled) {
        result += "\nYou feel sick.";
      }

      return result;
    }
  }

  isSpoiled(): boolean {
    return this._isSpoiled;
  }
}

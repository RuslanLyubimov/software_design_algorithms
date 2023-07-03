import { Comparable } from "./Comparable";

export class Item implements Comparable<Item> {
  private static idCounter: number = 0;
  private readonly id: number;
  readonly name: string;
  value: number;
  weight: number;

  constructor(name: string, value: number, weight: number) {
    this.id = ++Item.idCounter;
    this.name = name;
    this.value = value;
    this.weight = weight;
  }

  static resetIdCounter(): void {
    Item.idCounter = 0;
  }

  use(): void {}

  compareTo(other: Item): number {
    if (this.value > other.value) {
      return 1;
    } else if (this.value < other.value) {
      return -1;
    } else {
      const nameComparison = this.name.localeCompare(other.name, undefined, {
        sensitivity: "base",
      });
      return nameComparison === 0 ? 0 : nameComparison > 0 ? 1 : -1;
    }
  }

  toString(): string {
    return `${this.name} - Value: ${this.value.toFixed(2)}, Weight: ${this.weight.toFixed(2)}`;
  }

  getId(): number {
    return this.id;
  }
}

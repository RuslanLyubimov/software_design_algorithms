import { Item } from "./Item";
import { ItemComparator } from "./ItemComparator";

export class Inventory {
  private items: Item[];

  constructor() {
    this.items = [];
  }

  addItem(item: Item): void {
    this.items.push(item);
  }

  sort(comparator?: ItemComparator): void {
    if (comparator) {
      this.items.sort((a, b) => comparator.compare(a, b));
    } else {
      this.items.sort((a, b) => a.value - b.value);
    }
  }

  toString(): string {
    return this.items.map((item) => item.toString()).join(", ");
  }
}

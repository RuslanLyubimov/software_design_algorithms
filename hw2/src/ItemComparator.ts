import { Item } from "./Item";

interface Comparator<T> {
  compare(first: T, second: T): number;
}

export interface ItemComparator extends Comparator<Item> {
  compare(first: Item, second: Item): number;
}

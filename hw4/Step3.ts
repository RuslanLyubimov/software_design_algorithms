export abstract class ShipmentItem {
  protected weight: number;

  constructor(weight: number) {
    this.weight = weight;
  }

  abstract getCost(): number;
}

export class Letter extends ShipmentItem {
  constructor(weight: number) {
    super(weight);
  }

  getCost(): number {
    return this.weight * 0.39;
  }
}

export class Package extends ShipmentItem {
  constructor(weight: number) {
    super(weight);
  }

  getCost(): number {
    return this.weight * 0.25;
  }
}

export class Oversize extends ShipmentItem {
  constructor(weight: number) {
    super(weight);
  }

  getCost(): number {
    return 10 + this.weight * 0.02;
  }
}

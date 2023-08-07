export interface Shipper {
  getCost(weight: number): number;
}

export class AirEastShipper implements Shipper {
  getCost(weight: number): number {
    return weight * 0.39;
  }
}

export class ChicagoSprintShipper implements Shipper {
  getCost(weight: number): number {
    return weight * 0.42;
  }
}

export class PacificParcelShipper implements Shipper {
  getCost(weight: number): number {
    return weight * 0.51;
  }
}

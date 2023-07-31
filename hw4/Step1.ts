import { Shipper, AirEastShipper, PacificParcelShipper, ChicagoSprintShipper } from "./Step2";
import { ShipmentItem, Letter, Package, Oversize } from "./Step3";

export class Shipment {
  private shipmentID: number;
  private weight: number;
  private fromAddress: string;
  private fromZipCode: string;
  private toAddress: string;
  private toZipCode: string;
  private shipper: Shipper;
  private shipmentItem: ShipmentItem;

  constructor(
    shipmentID: number,
    weight: number,
    fromAddress: string,
    fromZipCode: string,
    toAddress: string,
    toZipCode: string
  ) {
    this.shipmentID = shipmentID;
    this.weight = weight;
    this.fromAddress = fromAddress;
    this.fromZipCode = fromZipCode;
    this.toAddress = toAddress;
    this.toZipCode = toZipCode;
  }

  private selectShipper(fromZipCode: string): void {
    const firstDigit = Number(fromZipCode[0]);

    if (firstDigit >= 1 && firstDigit <= 3) {
      this.shipper = new AirEastShipper();
    } else if (firstDigit >= 4 && firstDigit <= 6) {
      this.shipper = new ChicagoSprintShipper();
    } else {
      this.shipper = new PacificParcelShipper();
    }

    if (this.weight <= 15) {
      this.shipmentItem = new Letter(this.weight);
    } else if (this.weight <= 160) {
      this.shipmentItem = new Package(this.weight);
    } else {
      this.shipmentItem = new Oversize(this.weight);
    }
  }

  public updateShipmentInfo(
    shipmentID: number,
    weight: number,
    fromAddress: string,
    fromZipCode: string,
    toAddress: string,
    toZipCode: string
  ): void {
    this.shipmentID = shipmentID;
    this.weight = weight;
    this.fromAddress = fromAddress;
    this.fromZipCode = fromZipCode;
    this.toAddress = toAddress;
    this.toZipCode = toZipCode;
    this.selectShipper(this.fromZipCode);
  }

  public getShipmentID(): number {
    return this.shipmentID;
  }

  public getWeight(): number {
    return this.weight;
  }

  public getFromAddress(): string {
    return this.fromAddress;
  }

  public getFromZipCode(): string {
    return this.fromZipCode;
  }

  public getToAddress(): string {
    return this.toAddress;
  }

  public getToZipCode(): string {
    return this.toZipCode;
  }

  public ship(): string {
    const cost = this.shipmentItem.getCost();
    return `Shipment with the ID ${this.shipmentID} will be picked up from ${this.fromAddress}, ${
      this.fromZipCode
    } and shipped to ${this.toAddress}, ${this.toZipCode}\nCost = $${cost.toFixed(2)}`;
  }
}

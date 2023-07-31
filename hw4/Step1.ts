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
  }

  public updateShipmentInfo(
    shipmentID: number,
    weight: number,
    fromAddress: string,
    fromZipCode: string,
    toAddress: string,
    toZipCode: string
  ): void {
    if (weight <= 15) {
      this.shipmentItem = new Letter(weight);
    } else if (weight <= 160) {
      this.shipmentItem = new Package(weight);
    } else {
      this.shipmentItem = new Oversize(weight);
    }

    this.shipmentID = shipmentID;
    this.weight = weight;
    this.fromAddress = fromAddress;
    this.fromZipCode = fromZipCode;
    this.toAddress = toAddress;
    this.toZipCode = toZipCode;
  }

  public getShipmentID(): number {
    return this.shipmentID;
  }

  public ship(): string {
    this.selectShipper(this.fromZipCode);
    const cost = this.shipmentItem.getCost();
    return `Shipment ID: ${this.shipmentID}, From: ${this.fromAddress}, Zip: ${this.fromZipCode}, To: ${
      this.toAddress
    }, Zip: ${this.toZipCode}, Cost: $${cost.toFixed(2)}`;
  }
}

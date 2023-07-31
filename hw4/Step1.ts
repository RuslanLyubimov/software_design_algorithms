import { Shipper, AirEastShipper, PacificParcelShipper, ChicagoSprintShipper } from "./Step2";

export class Shipment {
  private shipmentID: number;
  private weight: number;
  private fromAddress: string;
  private fromZipCode: string;
  private toAddress: string;
  private toZipCode: string;
  private shipper: Shipper;

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
    const cost = this.shipper.getCost(this.weight);
    return `Shipment ID: ${this.shipmentID}, From: ${this.fromAddress}, Zip: ${this.fromZipCode}, To: ${
      this.toAddress
    }, Zip: ${this.toZipCode}, Cost: $${cost.toFixed(2)}`;
  }
}

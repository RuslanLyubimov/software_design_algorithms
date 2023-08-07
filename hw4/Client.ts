import { Shipment } from "./Step1";
import { ShipmentDecorator } from "./Step4";

export class Client {
  private static instance: Client;
  private shipment: Shipment;

  private constructor() {
    this.shipment = new Shipment(this.getShipmentID(), 0, "", "", "", "");
  }

  public static getInstance(): Client {
    if (!Client.instance) {
      Client.instance = new Client();
    }
    return Client.instance;
  }

  private getShipmentID(): number {
    return Math.floor(Math.random() * 100000);
  }

  public getShipment(): Shipment {
    return this.shipment;
  }

  public ship(shipment: Shipment): void {
    const isFragile = true;
    const doNotLeave = true;
    const returnReceiptRequested = true;

    const decoratedShipment = new ShipmentDecorator(shipment, isFragile, doNotLeave, returnReceiptRequested);

    const shipmentInfo = decoratedShipment.ship();
    console.log(shipmentInfo);
  }
}

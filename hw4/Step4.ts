import { Shipment } from "./Step1";

export class ShipmentDecorator {
  private shipment: Shipment;
  private isFragile: boolean;
  private doNotLeave: boolean;
  private returnReceiptRequested: boolean;

  constructor(
    shipment: Shipment,
    isFragile: boolean = false,
    doNotLeave: boolean = false,
    returnReceiptRequested: boolean = false
  ) {
    this.shipment = shipment;
    this.isFragile = isFragile;
    this.doNotLeave = doNotLeave;
    this.returnReceiptRequested = returnReceiptRequested;
  }

  public ship(): string {
    const baseInfo = this.shipment.ship();
    let result = baseInfo;

    if (this.isFragile) {
      result += `\n**MARK FRAGILE**\n`;
    }

    if (this.doNotLeave) {
      result += `**MARK DO NOT LEAVE IF ADDRESS NOT AT HOME**\n`;
    }

    if (this.returnReceiptRequested) {
      result += `**MARK RETURN RECEIPT REQUESTED**\n`;
    }

    return result;
  }
}

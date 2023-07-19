export class Shipment {
  public static shipmentIdCounter: number = 1;

  public shipmentId: number;
  public weight: number;
  public fromAddress: string;
  public fromZipCode: string;
  public toAddress: string;
  public toZipCode: string;

  constructor(weight: number, fromAddress: string, fromZipCode: string, toAddress: string, toZipCode: string) {
    this.shipmentId = Shipment.getShipmentID();
    this.weight = weight;
    this.fromAddress = fromAddress;
    this.fromZipCode = fromZipCode;
    this.toAddress = toAddress;
    this.toZipCode = toZipCode;
  }

  private static getShipmentID(): number {
    return Shipment.shipmentIdCounter++;
  }

  public ship(): string {
    const cost = this.weight * 0.39; // 39 cents per ounce
    return `Shipment ID: ${this.shipmentId}, From: ${this.fromAddress}, ${this.fromZipCode}, To: ${this.toAddress}, ${
      this.toZipCode
    }, Cost: $${cost.toFixed(2)}`;
  }
}

export class Client {
  private shipment: Shipment;

  public getInstance(): Shipment {
    if (!this.shipment) {
      this.shipment = new Shipment(0, "", "", "", "");
    }
    return this.shipment;
  }
}

export class FrontEndMock {
  public static getUserInput(): any {
    return {
      ShipmentID: 0,
      Weight: 16,
      FromAddress: "123 Main St, CityA, StateA",
      FromZipCode: "12345",
      ToAddress: "456 Elm St, CityB, StateB",
      ToZipCode: "67890",
    };
  }
}

const client = new Client();
const shipment = client.getInstance();
const userInput = FrontEndMock.getUserInput();

shipment.shipmentId = userInput.ShipmentID;
shipment.weight = userInput.Weight;
shipment.fromAddress = userInput.FromAddress;
shipment.fromZipCode = userInput.FromZipCode;
shipment.toAddress = userInput.ToAddress;
shipment.toZipCode = userInput.ToZipCode;

const result = shipment.ship();
console.log(result);

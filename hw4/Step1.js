"use strict";
exports.__esModule = true;
exports.FrontEndMock = exports.Client = exports.Shipment = void 0;
var Shipment = /** @class */ (function () {
    function Shipment(weight, fromAddress, fromZipCode, toAddress, toZipCode) {
        this.shipmentId = Shipment.getShipmentID();
        this.weight = weight;
        this.fromAddress = fromAddress;
        this.fromZipCode = fromZipCode;
        this.toAddress = toAddress;
        this.toZipCode = toZipCode;
    }
    Shipment.getShipmentID = function () {
        return Shipment.shipmentIdCounter++;
    };
    Shipment.prototype.ship = function () {
        var cost = this.weight * 0.39; // 39 cents per ounce
        return "Shipment ID: ".concat(this.shipmentId, ", From: ").concat(this.fromAddress, ", ").concat(this.fromZipCode, ", To: ").concat(this.toAddress, ", ").concat(this.toZipCode, ", Cost: $").concat(cost.toFixed(2));
    };
    Shipment.shipmentIdCounter = 1;
    return Shipment;
}());
exports.Shipment = Shipment;
var Client = /** @class */ (function () {
    function Client() {
    }
    Client.prototype.getInstance = function () {
        if (!this.shipment) {
            this.shipment = new Shipment(0, "", "", "", "");
        }
        return this.shipment;
    };
    return Client;
}());
exports.Client = Client;
var FrontEndMock = /** @class */ (function () {
    function FrontEndMock() {
    }
    FrontEndMock.getUserInput = function () {
        return {
            ShipmentID: 0,
            Weight: 16,
            FromAddress: "123 Main St, CityA, StateA",
            FromZipCode: "12345",
            ToAddress: "456 Elm St, CityB, StateB",
            ToZipCode: "67890"
        };
    };
    return FrontEndMock;
}());
exports.FrontEndMock = FrontEndMock;
var client = new Client();
var shipment = client.getInstance();
var userInput = FrontEndMock.getUserInput();
shipment.shipmentId = userInput.ShipmentID;
shipment.weight = userInput.Weight;
shipment.fromAddress = userInput.FromAddress;
shipment.fromZipCode = userInput.FromZipCode;
shipment.toAddress = userInput.ToAddress;
shipment.toZipCode = userInput.ToZipCode;
var result = shipment.ship();
console.log(result);

"use strict";
exports.__esModule = true;
exports.Shipment = void 0;
var Step2_1 = require("./Step2");
var Shipment = /** @class */ (function () {
    function Shipment(shipmentID, weight, fromAddress, fromZipCode, toAddress, toZipCode) {
        this.shipmentID = shipmentID;
        this.weight = weight;
        this.fromAddress = fromAddress;
        this.fromZipCode = fromZipCode;
        this.toAddress = toAddress;
        this.toZipCode = toZipCode;
    }
    Shipment.prototype.selectShipper = function (fromZipCode) {
        var firstDigit = Number(fromZipCode[0]);
        if (firstDigit >= 1 && firstDigit <= 3) {
            this.shipper = new Step2_1.AirEastShipper();
        }
        else if (firstDigit >= 4 && firstDigit <= 6) {
            this.shipper = new Step2_1.ChicagoSprintShipper();
        }
        else {
            this.shipper = new Step2_1.PacificParcelShipper();
        }
    };
    Shipment.prototype.updateShipmentInfo = function (shipmentID, weight, fromAddress, fromZipCode, toAddress, toZipCode) {
        this.shipmentID = shipmentID;
        this.weight = weight;
        this.fromAddress = fromAddress;
        this.fromZipCode = fromZipCode;
        this.toAddress = toAddress;
        this.toZipCode = toZipCode;
    };
    Shipment.prototype.getShipmentID = function () {
        return this.shipmentID;
    };
    Shipment.prototype.ship = function () {
        this.selectShipper(this.fromZipCode);
        var cost = this.shipper.getCost(this.weight);
        return "Shipment ID: ".concat(this.shipmentID, ", From: ").concat(this.fromAddress, ", Zip: ").concat(this.fromZipCode, ", To: ").concat(this.toAddress, ", Zip: ").concat(this.toZipCode, ", Cost: $").concat(cost.toFixed(2));
    };
    return Shipment;
}());
exports.Shipment = Shipment;

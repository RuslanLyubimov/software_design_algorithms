"use strict";
exports.__esModule = true;
exports.Shipment = void 0;
var Step2_1 = require("./Step2");
var Step3_1 = require("./Step3");
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
        if (this.weight <= 15) {
            this.shipmentItem = new Step3_1.Letter(this.weight);
        }
        else if (this.weight <= 160) {
            this.shipmentItem = new Step3_1.Package(this.weight);
        }
        else {
            this.shipmentItem = new Step3_1.Oversize(this.weight);
        }
    };
    Shipment.prototype.updateShipmentInfo = function (shipmentID, weight, fromAddress, fromZipCode, toAddress, toZipCode) {
        this.shipmentID = shipmentID;
        this.weight = weight;
        this.fromAddress = fromAddress;
        this.fromZipCode = fromZipCode;
        this.toAddress = toAddress;
        this.toZipCode = toZipCode;
        this.selectShipper(this.fromZipCode);
    };
    Shipment.prototype.getShipmentID = function () {
        return this.shipmentID;
    };
    Shipment.prototype.getWeight = function () {
        return this.weight;
    };
    Shipment.prototype.getFromAddress = function () {
        return this.fromAddress;
    };
    Shipment.prototype.getFromZipCode = function () {
        return this.fromZipCode;
    };
    Shipment.prototype.getToAddress = function () {
        return this.toAddress;
    };
    Shipment.prototype.getToZipCode = function () {
        return this.toZipCode;
    };
    Shipment.prototype.ship = function () {
        var cost = this.shipmentItem.getCost();
        return "Shipment with the ID ".concat(this.shipmentID, " will be picked up from ").concat(this.fromAddress, ", ").concat(this.fromZipCode, " and shipped to ").concat(this.toAddress, ", ").concat(this.toZipCode, "\nCost = $").concat(cost.toFixed(2));
    };
    return Shipment;
}());
exports.Shipment = Shipment;

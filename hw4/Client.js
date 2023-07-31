"use strict";
exports.__esModule = true;
exports.Client = void 0;
// Client.ts
var Step1_1 = require("./Step1");
var Client = /** @class */ (function () {
    function Client() {
        this.shipment = new Step1_1.Shipment(this.getShipmentID(), 0, "", "", "", "");
    }
    Client.getInstance = function () {
        if (!Client.instance) {
            Client.instance = new Client();
        }
        return Client.instance;
    };
    Client.prototype.getShipmentID = function () {
        return Math.floor(Math.random() * 100000);
    };
    Client.prototype.getShipment = function () {
        return this.shipment;
    };
    Client.prototype.ship = function (shipment) {
        var shipmentInfo = shipment.ship();
        console.log(shipmentInfo);
    };
    return Client;
}());
exports.Client = Client;

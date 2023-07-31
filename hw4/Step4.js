"use strict";
exports.__esModule = true;
exports.ShipmentDecorator = void 0;
var ShipmentDecorator = /** @class */ (function () {
    function ShipmentDecorator(shipment, isFragile, doNotLeave, returnReceiptRequested) {
        if (isFragile === void 0) { isFragile = false; }
        if (doNotLeave === void 0) { doNotLeave = false; }
        if (returnReceiptRequested === void 0) { returnReceiptRequested = false; }
        this.shipment = shipment;
        this.isFragile = isFragile;
        this.doNotLeave = doNotLeave;
        this.returnReceiptRequested = returnReceiptRequested;
    }
    ShipmentDecorator.prototype.ship = function () {
        var baseInfo = this.shipment.ship();
        var result = baseInfo;
        if (this.isFragile) {
            result += "\n**MARK FRAGILE**\n";
        }
        if (this.doNotLeave) {
            result += "**MARK DO NOT LEAVE IF ADDRESS NOT AT HOME**\n";
        }
        if (this.returnReceiptRequested) {
            result += "**MARK RETURN RECEIPT REQUESTED**\n";
        }
        return result;
    };
    return ShipmentDecorator;
}());
exports.ShipmentDecorator = ShipmentDecorator;

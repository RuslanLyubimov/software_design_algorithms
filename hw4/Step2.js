"use strict";
exports.__esModule = true;
exports.PacificParcelShipper = exports.ChicagoSprintShipper = exports.AirEastShipper = void 0;
var AirEastShipper = /** @class */ (function () {
    function AirEastShipper() {
    }
    AirEastShipper.prototype.getCost = function (weight) {
        return weight * 0.39;
    };
    return AirEastShipper;
}());
exports.AirEastShipper = AirEastShipper;
var ChicagoSprintShipper = /** @class */ (function () {
    function ChicagoSprintShipper() {
    }
    ChicagoSprintShipper.prototype.getCost = function (weight) {
        return weight * 0.42;
    };
    return ChicagoSprintShipper;
}());
exports.ChicagoSprintShipper = ChicagoSprintShipper;
var PacificParcelShipper = /** @class */ (function () {
    function PacificParcelShipper() {
    }
    PacificParcelShipper.prototype.getCost = function (weight) {
        return weight * 0.51;
    };
    return PacificParcelShipper;
}());
exports.PacificParcelShipper = PacificParcelShipper;

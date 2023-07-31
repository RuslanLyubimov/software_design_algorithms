"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Oversize = exports.Package = exports.Letter = exports.ShipmentItem = void 0;
var ShipmentItem = /** @class */ (function () {
    function ShipmentItem(weight) {
        this.weight = weight;
    }
    return ShipmentItem;
}());
exports.ShipmentItem = ShipmentItem;
var Letter = /** @class */ (function (_super) {
    __extends(Letter, _super);
    function Letter(weight) {
        return _super.call(this, weight) || this;
    }
    Letter.prototype.getCost = function () {
        return this.weight * 0.39;
    };
    return Letter;
}(ShipmentItem));
exports.Letter = Letter;
var Package = /** @class */ (function (_super) {
    __extends(Package, _super);
    function Package(weight) {
        return _super.call(this, weight) || this;
    }
    Package.prototype.getCost = function () {
        return this.weight * 0.25;
    };
    return Package;
}(ShipmentItem));
exports.Package = Package;
var Oversize = /** @class */ (function (_super) {
    __extends(Oversize, _super);
    function Oversize(weight) {
        return _super.call(this, weight) || this;
    }
    Oversize.prototype.getCost = function () {
        return 10 + this.weight * 0.02;
    };
    return Oversize;
}(ShipmentItem));
exports.Oversize = Oversize;

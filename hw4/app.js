"use strict";
exports.__esModule = true;
// app.ts
var Client_1 = require("./Client");
var client = Client_1.Client.getInstance();
var shipment1 = client.getShipment();
shipment1.updateShipmentInfo(10, 10, "123 Main St", "12345", "456 Elm St", "56789"); // Air East
client.ship(shipment1);
var shipment2 = client.getShipment();
shipment2.updateShipmentInfo(10, 10, "123 Main St", "45678", "456 Elm St", "56789"); // Chicago Sprint
client.ship(shipment2);
var shipment3 = client.getShipment();
shipment3.updateShipmentInfo(10, 10, "123 Main St", "78901", "456 Elm St", "56789"); // Pacific Parcel
client.ship(shipment3);

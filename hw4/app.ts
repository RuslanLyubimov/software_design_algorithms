import { Client } from "./Client";

const client = Client.getInstance();

const shipment1 = client.getShipment();
shipment1.updateShipmentInfo(10, 10, "123 Main St", "12345", "456 Elm St", "56789"); // Air East
client.ship(shipment1);

const shipment2 = client.getShipment();
shipment2.updateShipmentInfo(10, 160, "123 Main St", "45678", "456 Elm St", "56789"); // Chicago Sprint
client.ship(shipment2);

const shipment3 = client.getShipment();
shipment3.updateShipmentInfo(10, 200, "123 Main St", "78901", "456 Elm St", "56789"); // Pacific Parcel
client.ship(shipment3);

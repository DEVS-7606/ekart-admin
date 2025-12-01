import type { Notification } from "@/pages/notificationHistory/types";

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    dateTime: "2024-07-20 10:30:00",
    customer: "Rahul Sharma",
    machine: "ORD-100234",
    type: "Email",
    alarm: "Order Placed",
    description:
      "Order ORD-100234 was placed on the website for 3 items worth 4,500.00 INR.",
    status: "success",
  },
  {
    id: 2,
    dateTime: "2024-07-20 10:32:00",
    customer: "Rahul Sharma",
    machine: "ORD-100234",
    type: "UPI",
    alarm: "Payment Successful",
    description:
      "Payment for order ORD-100234 was captured successfully via UPI.",
    status: "success",
  },
  {
    id: 3,
    dateTime: "2024-07-20 10:40:00",
    customer: "Rahul Sharma",
    machine: "ORD-100234",
    type: "Email",
    alarm: "Order Confirmation Sent",
    description:
      "Order confirmation email was sent to the customer for order ORD-100234.",
    status: "success",
  },
  {
    id: 4,
    dateTime: "2024-07-20 13:15:00",
    customer: "Neha Agarwal",
    machine: "ORD-100235",
    type: "Card",
    alarm: "Payment Failed",
    description:
      "Card payment for order ORD-100235 was declined by the issuing bank.",
    status: "failed",
  },
  {
    id: 5,
    dateTime: "2024-07-20 13:18:00",
    customer: "Neha Agarwal",
    machine: "ORD-100235",
    type: "SMS",
    alarm: "Payment Failed Notification",
    description:
      "SMS notification sent to the customer about the failed payment for order ORD-100235.",
    status: "success",
  },
  {
    id: 6,
    dateTime: "2024-07-21 09:05:00",
    customer: "Acme Retail Pvt. Ltd.",
    machine: "ORD-100240",
    type: "Email",
    alarm: "Order Shipped",
    description:
      "Shipment SHP-88421 was created for order ORD-100240 via Delhivery Standard.",
    status: "success",
  },
  {
    id: 7,
    dateTime: "2024-07-21 09:10:00",
    customer: "Acme Retail Pvt. Ltd.",
    machine: "ORD-100240",
    type: "Whatsapp",
    alarm: "Shipment Tracking Shared",
    description:
      "WhatsApp message with the tracking link was sent for shipment SHP-88421.",
    status: "success",
  },
  {
    id: 8,
    dateTime: "2024-07-21 18:45:00",
    customer: "Kiran Electronics",
    machine: "ORD-100245",
    type: "Email",
    alarm: "Delivery Attempt Failed",
    description:
      "First delivery attempt for order ORD-100245 failed: customer not available.",
    status: "failed",
  },
  {
    id: 9,
    dateTime: "2024-07-22 11:20:00",
    customer: "Kiran Electronics",
    machine: "ORD-100245",
    type: "Email",
    alarm: "Order Delivered",
    description:
      "Order ORD-100245 was delivered successfully on the second attempt.",
    status: "success",
  },
  {
    id: 10,
    dateTime: "2024-07-22 16:05:00",
    customer: "Rahul Sharma",
    machine: "ORD-100234",
    type: "UPI",
    alarm: "Refund Issued",
    description:
      "Partial refund of 750.00 INR was processed for a returned item in order ORD-100234.",
    status: "success",
  },
];

export type Notification = {
  id: number;
  dateTime: string;
  customer: string;
  machine: string;
  type: string;
  alarm: string;
  description: string;
  status: "success" | "failed";
};

export type NotificationFilters = {
  customer: string;
  machine: string;
  notificationType: string;
  alarm: string;
  dateFrom: string;
  dateTo: string;
  lastN: string;
};

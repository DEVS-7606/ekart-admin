import { useState } from "react";
import NotificationHistoryTemplate from "@/pages/notificationHistory/components/template/notificationHistory";
import { MOCK_NOTIFICATIONS } from "@/shared/constants/notificationHistory.constant";
import type { Notification } from "@/pages/notificationHistory/types";

export default function NotificationHistory() {
  const [notifications, setNotifications] = useState<Notification[]>(
    () => MOCK_NOTIFICATIONS
  );
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const handleViewNotification = (notification: Notification) => {
    setSelectedNotification(notification);
  };

  const handleCloseViewNotification = () => {
    setSelectedNotification(null);
  };

  return (
    <NotificationHistoryTemplate
      notifications={notifications}
      setNotifications={setNotifications}
      selectedNotification={selectedNotification}
      onViewNotification={handleViewNotification}
      onCloseViewNotification={handleCloseViewNotification}
    />
  );
}

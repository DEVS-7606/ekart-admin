import NotificationHistoryDataTable from "@/pages/notificationHistory/components/organism/notificationHistoryDataTable";
import NotificationHistorySectionHeader from "@/pages/notificationHistory/components/organism/notificationHistorySectionHeader";
import NotificationViewSheet from "@/pages/notificationHistory/components/organism/notificationViewSheet";
import type { Notification } from "@/pages/notificationHistory/types";

interface NotificationHistoryTemplateProps {
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  selectedNotification: Notification | null;
  onViewNotification: (notification: Notification) => void;
  onCloseViewNotification: () => void;
}

export default function NotificationHistoryTemplate({
  notifications,
  setNotifications,
  selectedNotification,
  onViewNotification,
  onCloseViewNotification,
}: NotificationHistoryTemplateProps) {
  return (
    <>
      <NotificationHistorySectionHeader
        setNotifications={setNotifications}
        notifications={notifications}
      />
      <NotificationHistoryDataTable
        data={notifications}
        onView={onViewNotification}
      />
      <NotificationViewSheet
        open={!!selectedNotification}
        notification={selectedNotification}
        onOpenChange={(open) => {
          if (!open) {
            onCloseViewNotification();
          }
        }}
      />
    </>
  );
}

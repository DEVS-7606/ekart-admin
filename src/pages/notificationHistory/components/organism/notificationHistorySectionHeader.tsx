import NotificationHistoryFilterPopover from "@/pages/notificationHistory/components/organism/notificationHistoryFilterPopover";
import type { Notification } from "@/pages/notificationHistory/types";
import TitleAndSubtitle from "@/shared/components/molecules/titleAndSubtitle";

interface NotificationHistorySectionHeaderProps {
  setNotifications: (notifications: Notification[]) => void;
  notifications: Notification[];
}

const NotificationHistorySectionHeader = ({
  setNotifications,
  notifications,
}: NotificationHistorySectionHeaderProps) => {
  const renderTitle = () => {
    return (
      <TitleAndSubtitle
        title={{
          component: "h2",
          variant: "3xl",
          weight: "bold",
          text: "Notification History",
        }}
      />
    );
  };

  const renderFilterPopover = () => {
    return (
      <NotificationHistoryFilterPopover
        onFiltersChange={setNotifications}
        notifications={notifications}
      />
    );
  };

  return (
    <div className="module-header">
      {renderTitle()}
      <div className="module-header-buttons">{renderFilterPopover()}</div>
    </div>
  );
};

export default NotificationHistorySectionHeader;

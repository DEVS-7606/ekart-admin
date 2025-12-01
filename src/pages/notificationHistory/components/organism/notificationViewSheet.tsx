import { Sheet, SheetContent } from "@/shared/components/atoms/sheet";
import { Typography } from "@/shared/components/atoms/Typography";
import type { Notification } from "@/pages/notificationHistory/types";

interface NotificationViewSheetProps {
  open: boolean;
  notification: Notification | null;
  onOpenChange: (open: boolean) => void;
}

const NotificationViewSheet = ({
  open,
  notification,
  onOpenChange,
}: NotificationViewSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="sm:max-w-xl p-0 flex h-full flex-col"
        aria-describedby={undefined}
      >
        {notification && (
          <>
            <div className="border-b border-border px-6 py-4">
              <Typography
                component="h2"
                variant="xl"
                weight="semiBold"
                className="text-foreground"
              >
                Notification Details
              </Typography>
              <Typography
                component="p"
                variant="sm"
                className="text-muted-foreground"
              >
                View complete notification information
              </Typography>
            </div>

            <div className="flex-1 overflow-auto px-6 py-4">
              <div className="space-y-4 text-sm">
                <div className="flex gap-2">
                  <Typography component="span" variant="sm" weight="bold">
                    Date & Time:
                  </Typography>
                  <Typography component="span" variant="sm">
                    {notification.dateTime}
                  </Typography>
                </div>

                <div className="flex gap-2">
                  <Typography component="span" variant="sm" weight="bold">
                    Customer:
                  </Typography>
                  <Typography component="span" variant="sm">
                    {notification.customer}
                  </Typography>
                </div>

                <div className="flex gap-2">
                  <Typography component="span" variant="sm" weight="bold">
                    Machine:
                  </Typography>
                  <Typography component="span" variant="sm">
                    {notification.machine}
                  </Typography>
                </div>

                <div className="flex gap-2">
                  <Typography component="span" variant="sm" weight="bold">
                    Type:
                  </Typography>
                  <Typography component="span" variant="sm">
                    {notification.type}
                  </Typography>
                </div>

                <div className="flex gap-2">
                  <Typography component="span" variant="sm" weight="bold">
                    Alarm:
                  </Typography>
                  <Typography component="span" variant="sm">
                    {notification.alarm}
                  </Typography>
                </div>

                <div className="flex gap-2">
                  <Typography component="span" variant="sm" weight="bold">
                    Status:
                  </Typography>
                  <Typography
                    component="span"
                    variant="sm"
                    weight="bold"
                    className={
                      notification.status === "success"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {notification.status.charAt(0).toUpperCase() +
                      notification.status.slice(1)}
                  </Typography>
                </div>

                <div className="space-y-2">
                  <Typography component="span" variant="sm" weight="bold">
                    Description:
                  </Typography>
                  <Typography
                    component="p"
                    variant="sm"
                    className="text-gray-700"
                  >
                    {notification.description}
                  </Typography>
                </div>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default NotificationViewSheet;

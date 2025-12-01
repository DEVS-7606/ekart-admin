import type { Notification, NotificationFilters } from "@/pages/notificationHistory/types";

export const matchesNotificationFilters = (
    notification: Notification,
    filters: NotificationFilters
) => {
    if (
        filters.customer &&
        !notification.customer.toLowerCase().includes(filters.customer.toLowerCase())
    ) {
        return false;
    }

    if (
        filters.machine &&
        !notification.machine.toLowerCase().includes(filters.machine.toLowerCase())
    ) {
        return false;
    }

    if (
        filters.notificationType !== "all" &&
        notification.type.toLowerCase() !== filters.notificationType.toLowerCase()
    ) {
        return false;
    }

    if (
        filters.alarm &&
        !notification.alarm.toLowerCase().includes(filters.alarm.toLowerCase())
    ) {
        return false;
    }

    if (filters.dateFrom) {
        const from = new Date(filters.dateFrom).getTime();
        const date = new Date(notification.dateTime).getTime();
        if (Number.isFinite(from) && Number.isFinite(date) && date < from) {
            return false;
        }
    }

    if (filters.dateTo) {
        const to = new Date(filters.dateTo).getTime();
        const date = new Date(notification.dateTime).getTime();
        if (Number.isFinite(to) && Number.isFinite(date) && date > to) {
            return false;
        }
    }

    return true;
};

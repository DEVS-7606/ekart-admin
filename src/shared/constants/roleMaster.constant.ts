export const MOCK_ROLES = [
    {
        id: 1,
        srNo: 1,
        name: "Admin",
        description: "Full system access",
        // Broad access across devices, machines, users and system configuration
        policyIds: [
            1, 2, 3, 4, 5, // Device*
            10, 11, 12, 13, 14, // Machine
            40, 41, // System configuration & firmware
        ],
        policies: 12,
    },
    {
        id: 2,
        srNo: 2,
        name: "Customer Admin",
        description: "Manage customer-specific configuration",
        // Customer and reporting focused policies
        policyIds: [
            15, 16, 17, 18, 19, // Reports / analytics / dashboard
            30, 31, 32, // Customer & OEM settings
        ],
        policies: 8,
    },
    {
        id: 3,
        srNo: 3,
        name: "Operator",
        description: "Daily operations and monitoring",
        // Operator-level, mostly read / acknowledge / control
        policyIds: [
            1, 6, 10, // read access to device / sensor / machine
            19, // dashboard view
            20, 21, 22, // alarm*
            33, 34, // maintenance schedule & history
        ],
        policies: 9,
    },
    {
        id: 4,
        srNo: 4,
        name: "Viewer",
        description: "Read-only dashboard access",
        // Purely read-only / view permissions
        policyIds: [
            1, 6, 10, 15, 19, 20, 22, 30,
        ],
        policies: 8,
    },
    {
        id: 5,
        srNo: 5,
        name: "Maintenance",
        description: "Manage incidents and maintenance tasks",
        // Maintenance team: diagnostics, alarms and maintenance tasks
        policyIds: [
            5, // DeviceDiagnosticsAccess
            20, 21, 22, 23, 24, // alarm & notification
            33, 34, 35, // maintenance*
        ],
        policies: 9,
    },
];

export const MOCK_ROLE_POLICIES = [
    { id: 1, name: "DeviceReadAccess" },
    { id: 2, name: "DeviceFullAccess" },
    { id: 3, name: "DeviceWriteAccess" },
    { id: 4, name: "DeviceConfigAccess" },
    { id: 5, name: "DeviceDiagnosticsAccess" },

    { id: 6, name: "SensorReadAccess" },
    { id: 7, name: "SensorWriteAccess" },
    { id: 8, name: "SensorCalibrationAccess" },
    { id: 9, name: "SensorThresholdModifyAccess" },

    { id: 10, name: "MachineReadAccess" },
    { id: 11, name: "MachineFullAccess" },
    { id: 12, name: "MachineOperationControlAccess" },
    { id: 13, name: "MachineHealthMonitoringAccess" },
    { id: 14, name: "MachineShutdownAccess" },

    { id: 15, name: "ReportReadAccess" },
    { id: 16, name: "ReportFullAccess" },
    { id: 17, name: "AnalyticsViewAccess" },
    { id: 18, name: "AnalyticsExportAccess" },
    { id: 19, name: "DashboardViewAccess" },

    { id: 20, name: "AlarmReadAccess" },
    { id: 21, name: "AlarmAcknowledgeAccess" },
    { id: 22, name: "AlarmHistoryAccess" },
    { id: 23, name: "NotificationViewAccess" },
    { id: 24, name: "NotificationSettingsAccess" },

    { id: 25, name: "UserReadAccess" },
    { id: 26, name: "UserFullAccess" },
    { id: 27, name: "RoleReadAccess" },
    { id: 28, name: "RoleModifyAccess" },
    { id: 29, name: "PolicyAssignAccess" },

    { id: 30, name: "CustomerReadAccess" },
    { id: 31, name: "CustomerFullAccess" },
    { id: 32, name: "OEMSettingsAccess" },

    { id: 33, name: "MaintenanceScheduleAccess" },
    { id: 34, name: "MaintenanceHistoryAccess" },
    { id: 35, name: "MaintenanceTaskApprovalAccess" },

    { id: 36, name: "ModelReadAccess" },
    { id: 37, name: "ModelFullAccess" },
    { id: 38, name: "AssetReadAccess" },
    { id: 39, name: "AssetFullAccess" },

    { id: 40, name: "SystemConfigurationAccess" },
    { id: 41, name: "FirmwareUpdateAccess" }
];


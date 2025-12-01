export type DataPointCopy = {
  srNo: number;
  patchName: string;
  createdBy: string;
  createdOn: string;
  copiedBy: string;
  copiedOn: string;
};

export const MOCK_PATCH_MACHINES: string[] = [
  "MACHINE 1",
  "MACHINE 2",
  "MACHINE 3",
  "MACHINE 4",
];

export const MOCK_DATA_POINT_COPY_ROWS: DataPointCopy[] = [
  {
    srNo: 1,
    patchName: "Fault on HMI add",
    createdBy: "Lineomatic",
    createdOn: "08/08/25",
    copiedBy: "Lineomatic",
    copiedOn: "08/08/25",
  },
  {
    srNo: 2,
    patchName: "Fault on HMI add",
    createdBy: "Lineomatic",
    createdOn: "08/09/25",
    copiedBy: "Lineomatic",
    copiedOn: "08/09/25",
  },
  {
    srNo: 3,
    patchName: "Fault on HMI add",
    createdBy: "Lineomatic",
    createdOn: "20/09/25",
    copiedBy: "Lineomatic",
    copiedOn: "20/09/25",
  },
  {
    srNo: 4,
    patchName: "Fault on HMI add",
    createdBy: "Lineomatic",
    createdOn: "25/09/25",
    copiedBy: "Lineomatic",
    copiedOn: "25/09/25",
  },
  {
    srNo: 5,
    patchName: "No of book for flip",
    createdBy: "Lineomatic",
    createdOn: "01/10/25",
    copiedBy: "Lineomatic",
    copiedOn: "01/10/25",
  },
  {
    srNo: 6,
    patchName: "No of book for flip",
    createdBy: "Lineomatic",
    createdOn: "15/10/25",
    copiedBy: "Lineomatic",
    copiedOn: "15/10/25",
  },
  {
    srNo: 7,
    patchName: "No of book for flip",
    createdBy: "Lineomatic",
    createdOn: "21/10/25",
    copiedBy: "Lineomatic",
    copiedOn: "21/10/25",
  },
];

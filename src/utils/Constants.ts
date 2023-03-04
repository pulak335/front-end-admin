export const BASEURL = process.env.REACT_APP_SERVICE_URL;
export const IMAGEPATH = process.env.REACT_APP_IMAGE_BASE_URL;

export type PostDataType = {
  userName: string;
  password: string;
};

export const OwnerTypes = {
  customer: 6,
  manufacturer: 7,
  supplier: 8,
  supervisor: 4,
  serviceProvider: 9,
};

export const ProfileTypes = {
  SUPERADMIN: 1,
  HUBREPRESENTATIVE: 2,
  SUPERVISOR: 3,
  SALESAGENT: 4,
  LOCALSERVICEPROVIDER: 5,
  SERVICEPROVIDER: 9,
};

export const GenderTypes = {
  MALE: 1,
  FEMALE: 2,
};

export const SERVICEPROVIDERS = {
  BHALO: "BHALO",
};

export const serviceDependencies = {
  FARM: 1,
  CUSTOMER: 2,
  RECEIVABLE: 3,
  COLLECTION: 4,
};

export const serviceTypes = {
  BDT: 1,
  PERCENTAGE: 2,
};

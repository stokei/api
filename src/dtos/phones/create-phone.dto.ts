export interface CreatePhoneDTO {
  parent: string;
  countryCode: string;
  areaCode: string;
  number: string;
  default?: boolean;
  app: string;
  createdBy: string;
}

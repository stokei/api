export interface CreatePhoneDTO {
  parent: string;
  countryCode: string;
  areaCode: string;
  number: string;
  default?: boolean;
  createdBy: string;
}

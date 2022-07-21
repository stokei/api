import { PhoneStatus } from '@/enums/phone-status.enum';

export interface ExistsPhonesWhereDTO {
  parent?: string;
  countryCode?: string;
  areaCode?: string;
  number?: string;
  validationCode?: string;
  status?: PhoneStatus;
  default?: boolean;
}

export interface ExistsPhonesDTO {
  where: ExistsPhonesWhereDTO;
}

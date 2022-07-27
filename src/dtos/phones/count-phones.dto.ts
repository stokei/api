import { IBaseCountDTO, IWhereData } from '@stokei/nestjs';

import { PhoneStatus } from '@/enums/phone-status.enum';

export interface CountPhonesWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereData;
  countryCode?: IWhereData<string>;
  areaCode?: IWhereData<string>;
  number?: IWhereData<string>;
  validationCode?: IWhereData<string>;
  status?: PhoneStatus;
  default?: IWhereData<boolean>;
  active?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountPhonesWhereDTO = keyof CountPhonesWhereDTO;

export type CountPhonesDTO = IBaseCountDTO<CountPhonesWhereDTO>;

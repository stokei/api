import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

import { PhoneStatus } from '@/enums/phone-status.enum';

export interface CountPhonesWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  countryCode?: IWhereData<string>;
  areaCode?: IWhereData<string>;
  number?: IWhereData<string>;
  validationCode?: IWhereData<string>;
  status?: PhoneStatus;
  active?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountPhonesWhereDTO = keyof CountPhonesWhereDTO;

export type CountPhonesDTO = IBaseCountDTO<CountPhonesWhereDTO>;

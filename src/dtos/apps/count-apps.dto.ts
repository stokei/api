import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

import { AppStatus } from '@/enums/app-status.enum';

export interface CountAppsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  name?: IWhereDataSearch;
  description?: IWhereDataSearch<string>;
  status?: AppStatus;
  plan?: IWhereData<string>;
  currency?: IWhereData<string>;
  active?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountAppsWhereDTO = keyof CountAppsWhereDTO;

export type CountAppsDTO = IBaseCountDTO<CountAppsWhereDTO>;

import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

import { AccountRole } from '@/enums/account-role.enum';

export interface CountAccountsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  firstname?: IWhereDataSearch;
  lastname?: IWhereDataSearch;
  email?: IWhereData;
  roles?: AccountRole[];
  username?: IWhereData;
}
export type IKeysCountAccountsWhereDTO = keyof CountAccountsWhereDTO;

export type CountAccountsDTO = IBaseCountDTO<CountAccountsWhereDTO>;

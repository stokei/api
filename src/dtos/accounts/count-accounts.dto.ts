import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountAccountsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  firstname?: IWhereDataSearch;
  lastname?: IWhereDataSearch;
  email?: IWhereData;
  username?: IWhereData;
}
export type IKeysCountAccountsWhereDTO = keyof CountAccountsWhereDTO;

export type CountAccountsDTO = IBaseCountDTO<CountAccountsWhereDTO>;

import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountRolesWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  name?: IWhereDataSearch;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountRolesWhereDTO = keyof CountRolesWhereDTO;

export type CountRolesDTO = IBaseCountDTO<CountRolesWhereDTO>;

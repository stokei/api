import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountPhonesWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountPhonesWhereDTO = keyof CountPhonesWhereDTO;

export type CountPhonesDTO = IBaseCountDTO<CountPhonesWhereDTO>;

import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountAccessesWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountAccessesWhereDTO = keyof CountAccessesWhereDTO;

export type CountAccessesDTO = IBaseCountDTO<CountAccessesWhereDTO>;

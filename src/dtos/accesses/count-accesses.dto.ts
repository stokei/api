import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountAccessesWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountAccessesWhereDTO = keyof CountAccessesWhereDTO;

export type CountAccessesDTO = IBaseCountDTO<CountAccessesWhereDTO>;

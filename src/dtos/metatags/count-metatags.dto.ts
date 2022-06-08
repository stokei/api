import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountMetatagsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountMetatagsWhereDTO = keyof CountMetatagsWhereDTO;

export type CountMetatagsDTO = IBaseCountDTO<CountMetatagsWhereDTO>;

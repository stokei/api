import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountProjectsMembersWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountProjectsMembersWhereDTO =
  keyof CountProjectsMembersWhereDTO;

export type CountProjectsMembersDTO =
  IBaseCountDTO<CountProjectsMembersWhereDTO>;

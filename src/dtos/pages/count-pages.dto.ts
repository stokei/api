import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

import { PageType } from '@/enums/page-type.enum';

export interface CountPagesWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  title?: IWhereDataSearch;
  slug?: IWhereDataSearch;
  type?: PageType;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountPagesWhereDTO = keyof CountPagesWhereDTO;

export type CountPagesDTO = IBaseCountDTO<CountPagesWhereDTO>;

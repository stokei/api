import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountModulesVideosWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountModulesVideosWhereDTO = keyof CountModulesVideosWhereDTO;

export type CountModulesVideosDTO = IBaseCountDTO<CountModulesVideosWhereDTO>;

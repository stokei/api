import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountModuleVideosWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountModuleVideosWhereDTO = keyof CountModuleVideosWhereDTO;

export type CountModuleVideosDTO = IBaseCountDTO<CountModuleVideosWhereDTO>;

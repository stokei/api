import { IBaseCountDTO, IWhereData } from '@stokei/nestjs';

export interface CountModuleVideosWhereDTO {
  ids?: string[];
  module?: IWhereData;
  video?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountModuleVideosWhereDTO = keyof CountModuleVideosWhereDTO;

export type CountModuleVideosDTO = IBaseCountDTO<CountModuleVideosWhereDTO>;

import { IBaseCountDTO, IWhereData } from '@stokei/nestjs';

export interface CountImagesWhereDTO {
  ids?: string[];
  app?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountImagesWhereDTO = keyof CountImagesWhereDTO;

export type CountImagesDTO = IBaseCountDTO<CountImagesWhereDTO>;

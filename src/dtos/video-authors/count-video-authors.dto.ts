import { IBaseCountDTO, IWhereData } from '@stokei/nestjs';

export interface CountVideoAuthorsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  video?: IWhereData;
  author?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountVideoAuthorsWhereDTO = keyof CountVideoAuthorsWhereDTO;

export type CountVideoAuthorsDTO = IBaseCountDTO<CountVideoAuthorsWhereDTO>;

import { IBaseCountDTO, IWhereData } from '@stokei/nestjs';

export interface CountVideoAuthorsWhereDTO {
  ids?: string[];
  video?: IWhereData;
  author?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountVideoAuthorsWhereDTO = keyof CountVideoAuthorsWhereDTO;

export type CountVideoAuthorsDTO = IBaseCountDTO<CountVideoAuthorsWhereDTO>;

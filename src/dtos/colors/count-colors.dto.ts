import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountColorsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountColorsWhereDTO = keyof CountColorsWhereDTO;

export type CountColorsDTO = IBaseCountDTO<CountColorsWhereDTO>;

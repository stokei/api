import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountFilesWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountFilesWhereDTO = keyof CountFilesWhereDTO;

export type CountFilesDTO = IBaseCountDTO<CountFilesWhereDTO>;

import { IBaseFindManyDTO, IOrderBy, IWhereData } from '@stokei/nestjs';

import { FileStatus } from '@/enums/file-status.enum';

export interface WhereDataFindAllFilesDTO {
  ids?: string[];
  app?: IWhereData;
  status?: FileStatus;
  active?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllFilesDTO = keyof WhereDataFindAllFilesDTO;

export interface OrderByDataFindAllFilesDTO {
  status?: IOrderBy;
  active?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllFilesDTO = keyof OrderByDataFindAllFilesDTO;

export type FindAllFilesDTO = IBaseFindManyDTO<
  WhereDataFindAllFilesDTO,
  OrderByDataFindAllFilesDTO
>;

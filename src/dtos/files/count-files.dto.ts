import { IBaseCountDTO, IWhereData } from '@stokei/nestjs';

import { FileStatus } from '@/enums/file-status.enum';

export interface CountFilesWhereDTO {
  ids?: string[];
  app?: IWhereData;
  status?: FileStatus;
  active?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountFilesWhereDTO = keyof CountFilesWhereDTO;

export type CountFilesDTO = IBaseCountDTO<CountFilesWhereDTO>;

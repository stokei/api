import { FileStatus } from '@/enums/file-status.enum';

export interface ActivateFileRepositoryDataDTO {
  status: FileStatus;
  active: boolean;
  updatedBy: string;
}

export interface ActivateFileRepositoryWhereDTO {
  app: string;
  file: string;
}

export interface ActivateFileRepositoryDTO {
  data: ActivateFileRepositoryDataDTO;
  where: ActivateFileRepositoryWhereDTO;
}

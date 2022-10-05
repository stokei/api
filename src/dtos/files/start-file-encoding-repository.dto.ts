import { FileStatus } from '@/enums/file-status.enum';

export interface StartFileEncodingRepositoryDataDTO {
  status: FileStatus;
  active: boolean;
  updatedBy: string;
}

export interface StartFileEncodingRepositoryWhereDTO {
  app: string;
  file: string;
}

export interface StartFileEncodingRepositoryDTO {
  data: StartFileEncodingRepositoryDataDTO;
  where: StartFileEncodingRepositoryWhereDTO;
}

import { FileStatus } from '@/enums/file-status.enum';

import { CreateFileDTO } from './create-file.dto';

export interface CreateFileRepositoryDTO extends CreateFileDTO {
  status: FileStatus;
  active: boolean;
}

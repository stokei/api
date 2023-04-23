import { AppStatus } from '@/enums/app-status.enum';

import { CreateAppDTO } from './create-app.dto';

export interface CreateAppRepositoryDTO extends CreateAppDTO {
  slug: string;
  catalog?: string;
  language: string;
  status: AppStatus;
}

import { CreatePageDTO } from './create-page.dto';

export interface CreatePageRepositoryDTO extends CreatePageDTO {
  slug: string;
  version: string;
  draftVersion: string;
}

import { PageType } from '@/enums/page-type.enum';

export interface UpdatePageDataDTO {
  title?: string;
  version?: string;
  slug?: string;
  url?: string;
  type?: PageType;
  draftVersion?: string;
  updatedBy: string;
}

export interface UpdatePageWhereDTO {
  app: string;
  page: string;
}

export interface UpdatePageDTO {
  data: UpdatePageDataDTO;
  where: UpdatePageWhereDTO;
}

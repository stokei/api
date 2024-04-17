import { PageType } from '@/enums/page-type.enum';
export class CreatePageDTO {
  parent: string;
  title: string;
  url?: string;
  type?: PageType;
  app: string;
  createdBy: string;
}

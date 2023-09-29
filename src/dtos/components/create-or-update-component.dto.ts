import { ComponentType } from '@/enums/component-type.enum';

export class CreateOrUpdateComponentDTO {
  id?: string;
  parent: string;
  order?: number;
  type: ComponentType;
  data?: any;
  app: string;
  createdBy: string;
}

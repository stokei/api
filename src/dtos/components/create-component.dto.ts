import { ComponentType } from '@/enums/component-type.enum';

export class CreateComponentDTO {
  parent: string;
  order?: number;
  type: ComponentType;
  data?: any;
  app: string;
  createdBy: string;
}

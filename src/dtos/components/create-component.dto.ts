import { ComponentType } from '@/enums/component-type.enum';

export class CreateComponentDTO {
  parent: string;
  type: ComponentType;
  data?: any;
  app: string;
  createdBy: string;
}

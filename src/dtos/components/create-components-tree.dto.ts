import { CreateComponentDTO } from './create-component.dto';

export class CreateComponentsTreeComponentDTO extends CreateComponentDTO {
  components: CreateComponentsTreeComponentDTO[];
}

export class CreateComponentsTreeDTO {
  tree: CreateComponentsTreeComponentDTO[];
  app: string;
  createdBy: string;
}

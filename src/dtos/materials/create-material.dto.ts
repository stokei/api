export class CreateMaterialDTO {
  parent: string;
  file: string;
  name: string;
  description?: string;
  avatar?: string;
  free?: boolean;
  app: string;
  createdBy: string;
}

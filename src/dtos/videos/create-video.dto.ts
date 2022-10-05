export class CreateVideoDTO {
  parent: string;
  file: string;
  name?: string;
  description?: string;
  poster?: string;
  app: string;
  createdBy: string;
}

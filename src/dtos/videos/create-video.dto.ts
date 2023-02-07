export class CreateVideoDTO {
  parent: string;
  name: string;
  description?: string;
  file?: string;
  poster?: string;
  private?: boolean;
  app: string;
  createdBy: string;
}

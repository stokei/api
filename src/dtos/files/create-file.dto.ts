export class CreateFileDTO {
  filename?: string;
  extension?: string;
  mimetype?: string;
  size?: number;
  url?: string;
  app: string;
  createdBy: string;
}

import { VersionModel } from '@/models/version.model';

export class RemoveVersionComponentsDTO {
  removedBy: string;
  app: string;
  version: VersionModel;
}

import { PublishVersionDTO } from './publish-version.dto';

export interface PublishVersionRepositoryDTO extends PublishVersionDTO {
  published: boolean;
}

import { CreateVideoDTO } from './create-video.dto';

export interface CreateVideoRepositoryDTO extends CreateVideoDTO {
  active: boolean;
  slug: string;
}

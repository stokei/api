import { CreateAccessDTO } from '@/dtos/accesses/create-access.dto';

export interface CreateAccessRepositoryDTO extends CreateAccessDTO {
  expiresIn: string;
  active: boolean;
}

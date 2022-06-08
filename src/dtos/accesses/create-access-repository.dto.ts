import { CreateAccessDTO } from '@/dtos/accesses/create-access.dto';

export interface CreateAccessRepositoryDTO extends CreateAccessDTO {
  readonly expiresIn: string;
  readonly active: boolean;
}

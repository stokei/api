import { convertToISODateString } from '@stokei/nestjs';

import { AccessEntity } from '@/entities';
import { AccessModel } from '@/models/access.model';

export class AccessMapper {
  toModel(access: AccessEntity) {
    return (
      access &&
      new AccessModel({
        ...access,
        expiresIn: convertToISODateString(access.expiresIn),
        canceledAt: convertToISODateString(access.canceledAt),
        updatedAt: convertToISODateString(access.updatedAt),
        createdAt: convertToISODateString(access.createdAt)
      })
    );
  }
  toModels(accesses: AccessEntity[]) {
    return accesses?.length > 0
      ? accesses.map(this.toModel).filter(Boolean)
      : [];
  }
}

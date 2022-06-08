import { convertToISODateString } from '@stokei/nestjs';
import { DomainEntity } from '@/entities';
import { DomainModel } from '@/models/domain.model';

export class DomainMapper {
  toModel(domain: DomainEntity) {
    return (
      domain &&
      new DomainModel({
        ...domain,
        updatedAt: convertToISODateString(domain.updatedAt),
        createdAt: convertToISODateString(domain.createdAt)
      })
    );
  }
  toModels(domains: DomainEntity[]) {
    return domains?.length > 0 ? domains.map(this.toModel).filter(Boolean) : [];
  }
}

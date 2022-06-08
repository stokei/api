import { convertToISODateString } from '@stokei/nestjs';
import { AddressEntity } from '@/entities';
import { AddressModel } from '@/models/address.model';

export class AddressMapper {
  toModel(address: AddressEntity) {
    return (
      address &&
      new AddressModel({
        ...address,
        updatedAt: convertToISODateString(address.updatedAt),
        createdAt: convertToISODateString(address.createdAt)
      })
    );
  }
  toModels(addresses: AddressEntity[]) {
    return addresses?.length > 0
      ? addresses.map(this.toModel).filter(Boolean)
      : [];
  }
}

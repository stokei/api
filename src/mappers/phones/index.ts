import { convertToISODateString } from '@stokei/nestjs';
import { PhoneEntity } from '@/entities';
import { PhoneModel } from '@/models/phone.model';

export class PhoneMapper {
  toModel(phone: PhoneEntity) {
    return (
      phone &&
      new PhoneModel({
        ...phone,
        updatedAt: convertToISODateString(phone.updatedAt),
        createdAt: convertToISODateString(phone.createdAt)
      })
    );
  }
  toModels(phones: PhoneEntity[]) {
    return phones?.length > 0 ? phones.map(this.toModel).filter(Boolean) : [];
  }
}

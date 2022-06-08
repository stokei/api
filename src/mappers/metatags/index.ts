import { convertToISODateString } from '@stokei/nestjs';
import { MetatagEntity } from '@/entities';
import { MetatagModel } from '@/models/metatag.model';

export class MetatagMapper {
  toModel(metatag: MetatagEntity) {
    return (
      metatag &&
      new MetatagModel({
        ...metatag,
        updatedAt: convertToISODateString(metatag.updatedAt),
        createdAt: convertToISODateString(metatag.createdAt)
      })
    );
  }
  toModels(metatags: MetatagEntity[]) {
    return metatags?.length > 0
      ? metatags.map(this.toModel).filter(Boolean)
      : [];
  }
}

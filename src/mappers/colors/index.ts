import { convertToISODateString } from '@stokei/nestjs';

import { ColorEntity } from '@/entities';
import { ColorModel } from '@/models/color.model';

export class ColorMapper {
  toModel(color: ColorEntity) {
    return (
      color &&
      new ColorModel({
        ...color,
        updatedAt: convertToISODateString(color.updatedAt),
        createdAt: convertToISODateString(color.createdAt)
      })
    );
  }
  toModels(colors: ColorEntity[]) {
    return colors?.length > 0 ? colors.map(this.toModel).filter(Boolean) : [];
  }
}

import { Injectable, Scope } from '@nestjs/common';
import { FindAllColorsService } from '@/services/colors/find-all-colors';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class ColorsLoader {
  constructor(private readonly colorsService: FindAllColorsService) {}

  readonly findByIds = new DataLoader(async (colorIds: string[]) => {
    const colors = await this.colorsService.execute({
      where: {
        AND: {
          ids: colorIds
        }
      }
    });
    const colorsMap = new Map(colors?.items?.map((color) => [color.id, color]));
    return colorIds.map((colorId) => colorsMap.get(colorId));
  });
}

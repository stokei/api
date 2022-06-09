import { Args, Query, Resolver } from '@nestjs/graphql';

import { ColorsLoader } from '@/controllers/graphql/dataloaders/colors.loader';
import { Color } from '@/controllers/graphql/types/color';
import { ColorNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Color)
export class ColorResolver {
  constructor(private readonly colorsLoader: ColorsLoader) {}

  @Query(() => Color)
  async color(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const color = await this.colorsLoader.findByIds.load(id);
    if (!color) {
      throw new ColorNotFoundException();
    }
    return color;
  }
}

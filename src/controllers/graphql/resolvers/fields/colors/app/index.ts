import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Color } from '@/controllers/graphql/types/color';
import { ColorModel } from '@/models/color.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Resolver(() => Color)
export class ColorAppResolver {
  constructor(private readonly findAppByIdService: FindAppByIdService) {}

  @ResolveField(() => Color)
  app(@Parent() color: ColorModel) {
    return this.findAppByIdService.execute(color.app);
  }
}

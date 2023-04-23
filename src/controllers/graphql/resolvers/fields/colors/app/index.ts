import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { Color } from '@/controllers/graphql/types/color';
import { ColorModel } from '@/models/color.model';

@Resolver(() => Color)
export class ColorAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App, { nullable: true })
  app(@Parent() color: ColorModel) {
    return color.app && this.appsLoader.findByIds.load(color.app);
  }
}

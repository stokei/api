import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ImagesLoader } from '@/controllers/graphql/dataloaders/images.loader';
import { Image } from '@/controllers/graphql/types/image';
import { Language } from '@/controllers/graphql/types/language';
import { LanguageModel } from '@/models/language.model';

@Resolver(() => Language)
export class LanguageIconResolver {
  constructor(private readonly imagesLoader: ImagesLoader) {}

  @ResolveField(() => Image, { nullable: true })
  icon(@Parent() language: LanguageModel) {
    return language.icon && this.imagesLoader.findByIds.load(language.icon);
  }
}

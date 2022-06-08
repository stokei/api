import { Args, Query, Resolver } from '@nestjs/graphql';
import { LanguagesLoader } from '@/controllers/graphql/dataloaders/languages.loader';
import { Language } from '@/controllers/graphql/types/language';
import { LanguageNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Language)
export class LanguageResolver {
  constructor(private readonly languagesLoader: LanguagesLoader) {}

  @Query(() => Language)
  async language(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const language = await this.languagesLoader.findByIds.load(id);
    if (!language) {
      throw new LanguageNotFoundException();
    }
    return language;
  }
}

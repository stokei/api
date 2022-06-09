import { Resolver, ResolveReference } from '@nestjs/graphql';

import { LanguagesLoader } from '@/controllers/graphql/dataloaders/languages.loader';
import { Language } from '@/controllers/graphql/types/language';

@Resolver(() => Language)
export class LanguageReferenceResolver {
  constructor(private readonly languagesLoader: LanguagesLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.languagesLoader.findByIds.load(reference.id);
  }
}

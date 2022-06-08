import { Args, Query, Resolver } from '@nestjs/graphql';
import { MetatagsLoader } from '@/controllers/graphql/dataloaders/metatags.loader';
import { Metatag } from '@/controllers/graphql/types/metatag';
import { MetatagNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Metatag)
export class MetatagResolver {
  constructor(private readonly metatagsLoader: MetatagsLoader) {}

  @Query(() => Metatag)
  async metatag(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const metatag = await this.metatagsLoader.findByIds.load(id);
    if (!metatag) {
      throw new MetatagNotFoundException();
    }
    return metatag;
  }
}

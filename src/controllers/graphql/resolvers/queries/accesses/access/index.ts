import { Args, Query, Resolver } from '@nestjs/graphql';
import { AccessesLoader } from '@/controllers/graphql/dataloaders/accesses.loader';
import { Access } from '@/controllers/graphql/types/access';
import { AccessNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Access)
export class AccessResolver {
  constructor(private readonly accessesLoader: AccessesLoader) {}

  @Query(() => Access)
  async access(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const access = await this.accessesLoader.findByIds.load(id);
    if (!access) {
      throw new AccessNotFoundException();
    }
    return access;
  }
}

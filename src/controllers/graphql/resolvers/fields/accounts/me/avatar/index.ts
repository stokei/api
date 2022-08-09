import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ImagesLoader } from '@/controllers/graphql/dataloaders/images.loader';
import { Image } from '@/controllers/graphql/types/image';
import { MeAccount } from '@/controllers/graphql/types/me-account';
import { AccountModel } from '@/models/account.model';

@Resolver(() => MeAccount)
export class MeAccountAvatarResolver {
  constructor(private readonly imagesLoader: ImagesLoader) {}

  @ResolveField(() => Image)
  avatar(@Parent() account: AccountModel) {
    return account.avatar && this.imagesLoader.findByIds.load(account.avatar);
  }
}

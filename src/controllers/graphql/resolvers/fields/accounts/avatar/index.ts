import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ImagesLoader } from '@/controllers/graphql/dataloaders/images.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Image } from '@/controllers/graphql/types/image';
import { AccountModel } from '@/models/account.model';

@Resolver(() => Account)
export class AccountAvatarResolver {
  constructor(private readonly imagesLoader: ImagesLoader) {}

  @ResolveField(() => Image)
  avatar(@Parent() account: AccountModel) {
    return account.avatar && this.imagesLoader.findByIds.load(account.avatar);
  }
}

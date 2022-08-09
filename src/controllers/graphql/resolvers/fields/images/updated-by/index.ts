import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Image } from '@/controllers/graphql/types/image';
import { ImageModel } from '@/models/image.model';

@Resolver(() => Image)
export class ImageUpdatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  updatedBy(@Parent() image: ImageModel) {
    return (
      image.updatedBy && this.accountsLoader.findByIds.load(image.updatedBy)
    );
  }
}

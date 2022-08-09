import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Image } from '@/controllers/graphql/types/image';
import { ImageModel } from '@/models/image.model';

@Resolver(() => Image)
export class ImageCreatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  createdBy(@Parent() image: ImageModel) {
    return (
      image.createdBy && this.accountsLoader.findByIds.load(image.createdBy)
    );
  }
}

import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { Image } from '@/controllers/graphql/types/image';
import { ImageModel } from '@/models/image.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => Image)
export class ImageUpdatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  updatedBy(@Parent() image: ImageModel) {
    return this.findAccountByIdService.execute(image.updatedBy);
  }
}

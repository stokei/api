import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { Color } from '@/controllers/graphql/types/color';
import { ColorModel } from '@/models/color.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => Color)
export class ColorUpdatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  updatedBy(@Parent() color: ColorModel) {
    return this.findAccountByIdService.execute(color.updatedBy);
  }
}

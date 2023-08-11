import { Query, Resolver } from '@nestjs/graphql';

import { phoneCodes } from '@/constants/phone-codes';
import { PhoneCode } from '@/controllers/graphql/types/phone-code';

@Resolver(() => PhoneCode)
export class PhoneCodesResolver {
  @Query(() => [PhoneCode])
  async phoneCodes() {
    return phoneCodes;
  }
}

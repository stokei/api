import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Phone } from '@/controllers/graphql/types/phone';
import { PhoneModel } from '@/models/phone.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Resolver(() => Phone)
export class PhoneAppResolver {
  constructor(private readonly findAppByIdService: FindAppByIdService) {}

  @ResolveField(() => Phone)
  app(@Parent() phone: PhoneModel) {
    return this.findAppByIdService.execute(phone.app);
  }
}

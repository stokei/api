import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { Phone } from '@/controllers/graphql/types/phone';
import { PhoneModel } from '@/models/phone.model';

@Resolver(() => Phone)
export class PhoneAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App)
  app(@Parent() phone: PhoneModel) {
    return phone.app && this.appsLoader.findByIds.load(phone.app);
  }
}

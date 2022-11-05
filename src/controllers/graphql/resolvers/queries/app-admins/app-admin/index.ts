import { Args, Query, Resolver } from '@nestjs/graphql';

import { AppAdminsLoader } from '@/controllers/graphql/dataloaders/app-admins.loader';
import { AppAdmin } from '@/controllers/graphql/types/app-admin';
import { AppAdminNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => AppAdmin)
export class AppAdminResolver {
  constructor(private readonly appAdminsLoader: AppAdminsLoader) {}

  @Query(() => AppAdmin)
  async appAdmin(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const appAdmin = await this.appAdminsLoader.findByIds.load(id);
    if (!appAdmin) {
      throw new AppAdminNotFoundException();
    }
    return appAdmin;
  }
}

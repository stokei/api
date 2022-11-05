import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { RemoveAppInstructorInput } from '@/controllers/graphql/inputs/app-instructors/remove-app-instructor.input';
import { AppInstructor } from '@/controllers/graphql/types/app-instructor';
import { RemoveAppInstructorService } from '@/services/app-instructors/remove-app-instructor';

@Resolver(() => AppInstructor)
export class RemoveAppInstructorResolver {
  constructor(
    private readonly removeAppInstructorService: RemoveAppInstructorService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => AppInstructor)
  async removeAppInstructor(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: RemoveAppInstructorInput
  ) {
    const response = await this.removeAppInstructorService.execute({
      ...data,
      where: {
        ...data?.where,
        app: appId,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}

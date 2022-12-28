import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { AppConfig } from '@/common/decorators/app-config.decorator';
import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateAppInstructorInput } from '@/controllers/graphql/inputs/app-instructors/create-app-instructor.input';
import { AppInstructor } from '@/controllers/graphql/types/app-instructor';
import { CreateAppInstructorService } from '@/services/app-instructors/create-app-instructor';

@Resolver(() => AppInstructor)
export class CreateAppInstructorResolver {
  constructor(
    private readonly createAppInstructorService: CreateAppInstructorService
  ) {}

  @AppConfig({
    isAllowedToUsePlan: true,
    isRequired: true
  })
  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => AppInstructor)
  async createAppInstructor(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreateAppInstructorInput
  ) {
    const response = await this.createAppInstructorService.execute({
      ...data,
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}

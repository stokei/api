import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { CreatePhoneInput } from '@/controllers/graphql/inputs/phones/create-phone.input';
import { Phone } from '@/controllers/graphql/types/phone';
import { CreatePhoneService } from '@/services/phones/create-phone';

@Resolver(() => Phone)
export class CreatePhoneResolver {
  constructor(private readonly createPhoneService: CreatePhoneService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Phone)
  async createPhone(
    @Args('input') data: CreatePhoneInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createPhoneService.execute(data);
    return response;
  }
}

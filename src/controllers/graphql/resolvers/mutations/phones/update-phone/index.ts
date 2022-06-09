import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { UpdatePhoneInput } from '@/controllers/graphql/inputs/phones/update-phone.input';
import { Phone } from '@/controllers/graphql/types/phone';
import { UpdatePhoneService } from '@/services/phones/update-phone';

@Resolver(() => Phone)
export class UpdatePhoneResolver {
  constructor(private readonly updatePhoneService: UpdatePhoneService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Phone)
  async updatePhone(
    @Args('input') data: UpdatePhoneInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updatePhoneService.execute(data);
    return response;
  }
}

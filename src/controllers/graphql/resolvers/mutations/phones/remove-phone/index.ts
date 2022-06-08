import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { RemovePhoneInput } from '@/controllers/graphql/inputs/phones/remove-phone.input';
import { Phone } from '@/controllers/graphql/types/phone';
import { RemovePhoneService } from '@/services/phones/remove-phone';

@Resolver(() => Phone)
export class RemovePhoneResolver {
  constructor(private readonly removePhoneService: RemovePhoneService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Phone)
  async removePhone(
    @Args('input') data: RemovePhoneInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removePhoneService.execute(data);
    return response;
  }
}

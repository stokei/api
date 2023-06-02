import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { UpdateFileInput } from '@/controllers/graphql/inputs/files/update-file.input';
import { File } from '@/controllers/graphql/types/file';
import { UpdateFileService } from '@/services/files/update-file';

@Resolver(() => File)
export class UpdateFileResolver {
  constructor(private readonly updateFileService: UpdateFileService) {}

  @UseGuards(AppGuard, AuthenticatedGuard)
  @Mutation(() => File)
  async updateFile(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: UpdateFileInput
  ) {
    const response = await this.updateFileService.execute({
      ...data,
      data: {
        ...data.data,
        updatedBy: currentAccountId
      },
      where: {
        ...data.where,
        app: appId
      }
    });
    return response;
  }
}

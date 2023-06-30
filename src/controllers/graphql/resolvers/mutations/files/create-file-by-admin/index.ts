import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateFileByAdminInput } from '@/controllers/graphql/inputs/files/create-file-by-admin.input';
import { File } from '@/controllers/graphql/types/file';
import { ActivateFileService } from '@/services/files/activate-file';
import { CreateFileService } from '@/services/files/create-file';

@Resolver(() => File)
export class CreateFileByAdminResolver {
  constructor(
    private readonly createFileService: CreateFileService,
    private readonly activateFileService: ActivateFileService
  ) {}

  @UseGuards(AppGuard, AuthenticatedGuard)
  @Mutation(() => File)
  async createFileByAdmin(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreateFileByAdminInput
  ) {
    const fileCreated = await this.createFileService.execute({
      ...data,
      createdBy: currentAccountId,
      app: appId
    });
    if (fileCreated) {
      const fileActivated = await this.activateFileService.execute({
        app: fileCreated?.app,
        file: fileCreated?.id,
        updatedBy: fileCreated?.createdBy
      });
      return fileActivated;
    }
    return fileCreated;
  }
}

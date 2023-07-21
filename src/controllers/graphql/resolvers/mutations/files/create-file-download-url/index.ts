import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateFileDownloadURLInput } from '@/controllers/graphql/inputs/files/create-file-download-url.input';
import { File } from '@/controllers/graphql/types/file';
import { CreateFileDownloadURLService } from '@/services/files/create-file-download-url';

@Resolver(() => File)
export class CreateFileDownloadURLResolver {
  constructor(
    private readonly createFileDownloadURLService: CreateFileDownloadURLService
  ) {}

  @UseGuards(AppGuard, AuthenticatedGuard)
  @Mutation(() => String)
  async createFileDownloadURL(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreateFileDownloadURLInput
  ) {
    return await this.createFileDownloadURLService.execute({
      ...data,
      createdBy: currentAccountId,
      app: appId
    });
  }
}

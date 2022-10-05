import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  AuthenticatedGuard,
  AuthenticationConfig,
  CurrentAccount
} from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { REST_CONTROLLERS_URL_NAMES } from '@/constants/rest-controllers';
import { REST_VERSIONS } from '@/constants/rest-versions';
import { deleteFile, FileUploaderInterceptor } from '@/interceptors';
import { FileModel } from '@/models/file.model';
import { FileUploadInterceptorModel } from '@/models/file-upload-interceptor.model';
import { CreateFileService } from '@/services/files/create-file';

@ApiTags(REST_CONTROLLERS_URL_NAMES.FILES)
@Controller({
  path: REST_CONTROLLERS_URL_NAMES.FILES,
  version: REST_VERSIONS.V1
})
export class CreateFileController {
  constructor(private readonly createFileService: CreateFileService) {}

  @Post()
  @UseGuards(AuthenticatedGuard, AppGuard)
  @AuthenticationConfig({ isRequired: false })
  @UseInterceptors(
    FileUploaderInterceptor({
      fieldName: 'file'
    })
  )
  @ApiCreatedResponse({
    description: 'The file has been successfully created.',
    type: FileModel
  })
  async createFile(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @UploadedFile() fileFile: any
  ) {
    const fileUploaded = new FileUploadInterceptorModel(fileFile);
    try {
      return await this.createFileService.execute({
        file: fileUploaded.file,
        app: appId,
        createdBy: currentAccountId
      });
    } catch (error) {
      await deleteFile(fileUploaded.file);
      throw error;
    }
  }
}

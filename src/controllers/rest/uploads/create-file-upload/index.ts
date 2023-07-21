import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { REST_CONTROLLERS_URL_NAMES } from '@/constants/rest-controllers';
import { REST_VERSIONS } from '@/constants/rest-versions';
import { ErrorUploadingFileException } from '@/errors';
import { FileUploaderInterceptor } from '@/interceptors';
import { FileUploadInterceptorModel } from '@/models/file-upload-interceptor.model';
import { ActivateFileService } from '@/services/files/activate-file';
import { CreateFileService } from '@/services/files/create-file';

@ApiTags(REST_CONTROLLERS_URL_NAMES.UPLOADS_FILES)
@Controller({
  path: REST_CONTROLLERS_URL_NAMES.UPLOADS_FILES,
  version: REST_VERSIONS.V1
})
export class CreateFileUploadController {
  constructor(
    private readonly createFileService: CreateFileService,
    private readonly activateFileService: ActivateFileService
  ) {}

  @Post()
  @UseGuards(AppGuard, AuthenticatedGuard)
  @UseInterceptors(
    FileUploaderInterceptor({
      fieldName: 'file'
    })
  )
  async createFileUpload(
    @UploadedFile() fileUploaded: any,
    @CurrentApp('id') appId: string,
    @CurrentAccount('id') accountId: string
  ) {
    try {
      const fileData = new FileUploadInterceptorModel(fileUploaded);
      const file = await this.createFileService.execute({
        filename: fileData?.filename,
        mimetype: fileData?.mimetype,
        extension: fileData?.extension,
        size: fileData?.size,
        app: appId,
        createdBy: accountId
      });
      const fileActivated = await this.activateFileService.execute({
        app: file?.app,
        file: file?.id,
        updatedBy: file?.createdBy
      });
      return { file: fileActivated };
    } catch (error) {
      throw new ErrorUploadingFileException();
    }
  }
}

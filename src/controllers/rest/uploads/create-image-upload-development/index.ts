import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { REST_CONTROLLERS_URL_NAMES } from '@/constants/rest-controllers';
import { REST_VERSIONS } from '@/constants/rest-versions';
import { ErrorUploadingFileException } from '@/errors';
import { ImageUploaderInterceptor } from '@/interceptors';
import { FileUploadInterceptorModel } from '@/models/file-upload-interceptor.model';
import { ActivateFileService } from '@/services/files/activate-file';
import { FindFileByIdService } from '@/services/files/find-file-by-id';
import { UpdateFileService } from '@/services/files/update-file';
import { CreateImageService } from '@/services/images/create-image';

@ApiTags(REST_CONTROLLERS_URL_NAMES.UPLOADS_IMAGES)
@Controller({
  path: REST_CONTROLLERS_URL_NAMES.UPLOADS_IMAGES,
  version: REST_VERSIONS.V1
})
export class CreateImageUploadDevelopmentController {
  constructor(
    private readonly updateFileService: UpdateFileService,
    private readonly findFileByIdService: FindFileByIdService,
    private readonly createImageService: CreateImageService,
    private readonly activateFileService: ActivateFileService
  ) {}

  @Post(':file')
  @UseInterceptors(
    ImageUploaderInterceptor({
      fieldName: 'file'
    })
  )
  async createImageUpload(
    @Param('file') fileId: any,
    @UploadedFile() fileUploaded: any
  ) {
    try {
      const file = await this.findFileByIdService.execute(fileId);
      const image = await this.createImageService.execute({
        app: file.app,
        file: file.id,
        createdBy: file.createdBy
      });
      const fileData = new FileUploadInterceptorModel(fileUploaded);
      const dataUpdated = {
        filename: fileData?.filename,
        mimetype: fileData?.mimetype,
        extension: fileData?.extension,
        size: fileData?.size,
        updatedBy: file?.createdBy
      };
      await this.updateFileService.execute({
        data: dataUpdated,
        where: {
          app: file?.app,
          file: file?.id
        }
      });
      const fileActivated = await this.activateFileService.execute({
        app: file?.app,
        file: file?.id,
        updatedBy: file?.createdBy
      });
      return { file: fileActivated, image };
    } catch (error) {
      throw new ErrorUploadingFileException();
    }
  }
}

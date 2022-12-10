import { ICommand } from '@nestjs/cqrs';

import { CreateVideoUploadURLDTO } from '@/dtos/files/create-video-upload-url.dto';

export class CreateVideoUploadURLCommand
  implements ICommand, CreateVideoUploadURLDTO
{
  tusResumable: string;
  uploadLength: string;
  uploadMetadata: string;
  app: string;
  createdBy: string;

  constructor(data: CreateVideoUploadURLDTO) {
    this.tusResumable = data.tusResumable;
    this.uploadLength = data.uploadLength;
    this.uploadMetadata = data.uploadMetadata;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}

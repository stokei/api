import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateVideoUploadURLCommand } from '@/commands/implements/files/create-video-upload-url.command';
import { CreateVideoUploadURLDTO } from '@/dtos/files/create-video-upload-url.dto';
import { CreateVideoUploadURLResponse } from '@/dtos/files/create-video-upload-url-response.dto';

@Injectable()
export class CreateVideoUploadURLService
  implements
    IBaseService<
      CreateVideoUploadURLDTO,
      Promise<CreateVideoUploadURLResponse>
    >
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: CreateVideoUploadURLDTO
  ): Promise<CreateVideoUploadURLResponse> {
    return await this.commandBus.execute(new CreateVideoUploadURLCommand(data));
  }
}

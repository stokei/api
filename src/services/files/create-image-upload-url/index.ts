import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateImageUploadURLCommand } from '@/commands/implements/files/create-image-upload-url.command';
import { CreateImageUploadURLDTO } from '@/dtos/files/create-image-upload-url.dto';
import { CreateImageUploadURLResponse } from '@/dtos/files/create-image-upload-url-response.dto';

@Injectable()
export class CreateImageUploadURLService
  implements
    IBaseService<
      CreateImageUploadURLDTO,
      Promise<CreateImageUploadURLResponse>
    >
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: CreateImageUploadURLDTO
  ): Promise<CreateImageUploadURLResponse> {
    return await this.commandBus.execute(new CreateImageUploadURLCommand(data));
  }
}

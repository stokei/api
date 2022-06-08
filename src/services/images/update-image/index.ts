import { UpdateImageCommand } from '@/commands/implements/images/update-image.command';
import { UpdateImageDTO } from '@/dtos/images/update-image.dto';
import { ImageModel } from '@/models/image.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class UpdateImageService
  implements IBaseService<UpdateImageDTO, Promise<ImageModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateImageDTO): Promise<ImageModel> {
    return await this.commandBus.execute(new UpdateImageCommand(data));
  }
}

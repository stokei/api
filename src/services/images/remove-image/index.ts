import { RemoveImageCommand } from '@/commands/implements/images/remove-image.command';
import { RemoveImageDTO } from '@/dtos/images/remove-image.dto';
import { ImageModel } from '@/models/image.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemoveImageService
  implements IBaseService<RemoveImageDTO, Promise<ImageModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveImageDTO): Promise<ImageModel> {
    return await this.commandBus.execute(new RemoveImageCommand(data));
  }
}

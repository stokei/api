import { CreateImageCommand } from '@/commands/implements/images/create-image.command';
import { CreateImageDTO } from '@/dtos/images/create-image.dto';
import { ImageModel } from '@/models/image.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreateImageService
  implements IBaseService<CreateImageDTO, Promise<ImageModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateImageDTO): Promise<ImageModel> {
    return await this.commandBus.execute(new CreateImageCommand(data));
  }
}

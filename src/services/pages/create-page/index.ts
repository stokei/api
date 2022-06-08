import { CreatePageCommand } from '@/commands/implements/pages/create-page.command';
import { CreatePageDTO } from '@/dtos/pages/create-page.dto';
import { PageModel } from '@/models/page.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreatePageService
  implements IBaseService<CreatePageDTO, Promise<PageModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreatePageDTO): Promise<PageModel> {
    return await this.commandBus.execute(new CreatePageCommand(data));
  }
}

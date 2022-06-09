import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdatePageCommand } from '@/commands/implements/pages/update-page.command';
import { UpdatePageDTO } from '@/dtos/pages/update-page.dto';
import { PageModel } from '@/models/page.model';

@Injectable()
export class UpdatePageService
  implements IBaseService<UpdatePageDTO, Promise<PageModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdatePageDTO): Promise<PageModel> {
    return await this.commandBus.execute(new UpdatePageCommand(data));
  }
}

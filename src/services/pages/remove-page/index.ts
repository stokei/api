import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemovePageCommand } from '@/commands/implements/pages/remove-page.command';
import { RemovePageDTO } from '@/dtos/pages/remove-page.dto';
import { PageModel } from '@/models/page.model';

@Injectable()
export class RemovePageService
  implements IBaseService<RemovePageDTO, Promise<PageModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemovePageDTO): Promise<PageModel> {
    return await this.commandBus.execute(new RemovePageCommand(data));
  }
}

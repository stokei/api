import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateLoginPageCommand } from '@/commands/implements/pages/create-login-page.command';
import { CreateLoginPageDTO } from '@/dtos/pages/create-login-page.dto';
import { PageModel } from '@/models/page.model';

@Injectable()
export class CreateLoginPageService
  implements IBaseService<CreateLoginPageDTO, Promise<PageModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateLoginPageDTO): Promise<PageModel> {
    return await this.commandBus.execute(new CreateLoginPageCommand(data));
  }
}

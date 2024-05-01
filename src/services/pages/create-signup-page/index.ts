import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateSignUpPageCommand } from '@/commands/implements/pages/create-signup-page.command';
import { CreateSignUpPageDTO } from '@/dtos/pages/create-signup-page.dto';
import { PageModel } from '@/models/page.model';

@Injectable()
export class CreateSignUpPageService
  implements IBaseService<CreateSignUpPageDTO, Promise<PageModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateSignUpPageDTO): Promise<PageModel> {
    return await this.commandBus.execute(new CreateSignUpPageCommand(data));
  }
}

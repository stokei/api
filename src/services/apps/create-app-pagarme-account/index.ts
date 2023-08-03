import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateAppPagarmeAccountCommand } from '@/commands/implements/apps/create-app-pagarme-account.command';
import { CreateAppPagarmeAccountDTO } from '@/dtos/apps/create-app-pagarme-account.dto';
import { AppModel } from '@/models/app.model';

@Injectable()
export class CreateAppPagarmeAccountService
  implements IBaseService<CreateAppPagarmeAccountDTO, Promise<AppModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateAppPagarmeAccountDTO): Promise<AppModel> {
    return await this.commandBus.execute(
      new CreateAppPagarmeAccountCommand(data)
    );
  }
}

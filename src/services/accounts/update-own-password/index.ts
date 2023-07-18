import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateOwnPasswordCommand } from '@/commands/implements/accounts/update-own-password.command';
import { UpdateOwnPasswordDTO } from '@/dtos/accounts/update-own-password.dto';
@Injectable()
export class UpdateOwnPasswordService
  implements IBaseService<UpdateOwnPasswordDTO, Promise<boolean>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateOwnPasswordDTO): Promise<boolean> {
    return await this.commandBus.execute(new UpdateOwnPasswordCommand(data));
  }
}

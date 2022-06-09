import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { SignUpCommand } from '@/commands/implements/accounts/signup.command';
import { SignUpDTO } from '@/dtos/accounts/signup.dto';
import { AccountModel } from '@/models/account.model';

@Injectable()
export class SignUpService
  implements IBaseService<SignUpDTO, Promise<AccountModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: SignUpDTO): Promise<AccountModel> {
    return await this.commandBus.execute(new SignUpCommand(data));
  }
}

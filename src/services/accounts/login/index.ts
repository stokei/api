import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { LoginCommand } from '@/commands/implements/accounts/login.command';
import { AuthResponse } from '@/controllers/graphql/types/auth-response';
import { LoginDTO } from '@/dtos/accounts/login.dto';

@Injectable()
export class LoginService
  implements IBaseService<LoginDTO, Promise<AuthResponse>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: LoginDTO): Promise<AuthResponse> {
    return await this.commandBus.execute(new LoginCommand(data));
  }
}

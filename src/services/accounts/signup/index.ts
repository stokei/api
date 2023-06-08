import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { SignUpCommand } from '@/commands/implements/accounts/signup.command';
import { AuthResponse } from '@/controllers/graphql/types/auth-response';
import { SignUpDTO } from '@/dtos/accounts/signup.dto';

@Injectable()
export class SignUpService
  implements IBaseService<SignUpDTO, Promise<AuthResponse>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: SignUpDTO): Promise<AuthResponse> {
    return await this.commandBus.execute(new SignUpCommand(data));
  }
}

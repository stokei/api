import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CompleteAccountConfigurationCommand } from '@/commands/implements/accounts/complete-account-configuration.command';
import { AuthResponse } from '@/controllers/graphql/types/auth-response';
import { CompleteAccountConfigurationDTO } from '@/dtos/accounts/complete-account-configuration.dto';

@Injectable()
export class CompleteAccountConfigurationService
  implements
    IBaseService<CompleteAccountConfigurationDTO, Promise<AuthResponse>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CompleteAccountConfigurationDTO): Promise<AuthResponse> {
    return await this.commandBus.execute(
      new CompleteAccountConfigurationCommand(data)
    );
  }
}

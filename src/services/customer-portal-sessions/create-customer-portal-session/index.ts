import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateCustomerPortalSessionCommand } from '@/commands/implements/customer-portal-sessions/create-customer-portal-session.command';
import { CreateCustomerPortalSessionDTO } from '@/dtos/customer-portal-sessions/create-customer-portal-session.dto';
import { CustomerPortalSessionModel } from '@/models/customer-portal-session.model';

@Injectable()
export class CreateCustomerPortalSessionService
  implements
    IBaseService<
      CreateCustomerPortalSessionDTO,
      Promise<CustomerPortalSessionModel>
    >
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: CreateCustomerPortalSessionDTO
  ): Promise<CustomerPortalSessionModel> {
    return await this.commandBus.execute(
      new CreateCustomerPortalSessionCommand(data)
    );
  }
}

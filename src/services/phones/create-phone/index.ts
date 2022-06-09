import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreatePhoneCommand } from '@/commands/implements/phones/create-phone.command';
import { CreatePhoneDTO } from '@/dtos/phones/create-phone.dto';
import { PhoneModel } from '@/models/phone.model';

@Injectable()
export class CreatePhoneService
  implements IBaseService<CreatePhoneDTO, Promise<PhoneModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreatePhoneDTO): Promise<PhoneModel> {
    return await this.commandBus.execute(new CreatePhoneCommand(data));
  }
}

import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdatePhoneCommand } from '@/commands/implements/phones/update-phone.command';
import { UpdatePhoneDTO } from '@/dtos/phones/update-phone.dto';
import { PhoneModel } from '@/models/phone.model';

@Injectable()
export class UpdatePhoneService
  implements IBaseService<UpdatePhoneDTO, Promise<PhoneModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdatePhoneDTO): Promise<PhoneModel> {
    return await this.commandBus.execute(new UpdatePhoneCommand(data));
  }
}

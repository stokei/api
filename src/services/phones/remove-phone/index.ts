import { RemovePhoneCommand } from '@/commands/implements/phones/remove-phone.command';
import { RemovePhoneDTO } from '@/dtos/phones/remove-phone.dto';
import { PhoneModel } from '@/models/phone.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemovePhoneService
  implements IBaseService<RemovePhoneDTO, Promise<PhoneModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemovePhoneDTO): Promise<PhoneModel> {
    return await this.commandBus.execute(new RemovePhoneCommand(data));
  }
}

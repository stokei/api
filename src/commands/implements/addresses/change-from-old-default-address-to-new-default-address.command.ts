import { ICommand } from '@nestjs/cqrs';

import { ChangeFromOldDefaultAddressToNewDefaultAddressDTO } from '@/dtos/addresses/change-from-old-default-address-to-new-default-address.dto';

export class ChangeFromOldDefaultAddressToNewDefaultAddressCommand
  implements ICommand
{
  newAddress: string;
  updatedBy: string;
  app: string;
  constructor(data: ChangeFromOldDefaultAddressToNewDefaultAddressDTO) {
    this.newAddress = data.newAddress;
    this.app = data.app;
    this.updatedBy = data.updatedBy;
  }
}

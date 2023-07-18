import { ICommand } from '@nestjs/cqrs';

import { UpdateOwnPasswordDTO } from '@/dtos/accounts/update-own-password.dto';

export class UpdateOwnPasswordCommand
  implements ICommand, UpdateOwnPasswordDTO
{
  account: string;
  app: string;
  constructor(data: UpdateOwnPasswordDTO) {
    this.account = data?.account;
    this.app = data?.app;
  }
}

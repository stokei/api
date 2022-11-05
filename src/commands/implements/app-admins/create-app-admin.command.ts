import { ICommand } from '@nestjs/cqrs';

import { CreateAppAdminDTO } from '@/dtos/app-admins/create-app-admin.dto';

export class CreateAppAdminCommand implements ICommand, CreateAppAdminDTO {
  admin: string;
  app: string;
  createdBy: string;

  constructor(data: CreateAppAdminDTO) {
    this.admin = data.admin;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}

import { ICommand } from '@nestjs/cqrs';

import { CreateAppDefaultLandingPageDTO } from '@/dtos/apps/create-app-default-landing-page.dto';

export class CreateAppDefaultLandingPageCommand
  implements ICommand, CreateAppDefaultLandingPageDTO
{
  app: string;
  createdBy: string;

  constructor(data: CreateAppDefaultLandingPageDTO) {
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}

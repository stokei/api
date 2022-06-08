import { ICommand } from '@nestjs/cqrs';
import { CreateSiteDTO } from '@/dtos/sites/create-site.dto';

export class CreateSiteCommand implements ICommand, CreateSiteDTO {
  name: string;
  parent: string;

  constructor(data: CreateSiteDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}

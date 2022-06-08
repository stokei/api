import { ICommand } from '@nestjs/cqrs';
import { CreateVersionDTO } from '@/dtos/versions/create-version.dto';

export class CreateVersionCommand implements ICommand, CreateVersionDTO {
  name: string;
  parent: string;

  constructor(data: CreateVersionDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}

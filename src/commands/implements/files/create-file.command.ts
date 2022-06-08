import { ICommand } from '@nestjs/cqrs';
import { CreateFileDTO } from '@/dtos/files/create-file.dto';

export class CreateFileCommand implements ICommand, CreateFileDTO {
  name: string;
  parent: string;

  constructor(data: CreateFileDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}

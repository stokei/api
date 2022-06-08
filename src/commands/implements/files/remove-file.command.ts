import { ICommand } from '@nestjs/cqrs';
import {
  RemoveFileDTO,
  RemoveFileWhereDTO
} from '@/dtos/files/remove-file.dto';

export class RemoveFileCommand implements ICommand, RemoveFileDTO {
  where: RemoveFileWhereDTO;
  constructor(data: RemoveFileDTO) {
    this.where = data.where;
  }
}

import { ICommand } from '@nestjs/cqrs';

export class RemoveComponentsCommand implements ICommand {
  ids: string[];
  constructor(ids: string[]) {
    this.ids = ids;
  }
}

import { ICommand } from '@nestjs/cqrs';

import { CloneComponentsTreeDTO } from '@/dtos/components/clone-components-tree.dto';

export class CloneComponentsTreeCommand
  implements ICommand, CloneComponentsTreeDTO
{
  app: string;
  currentParent: string;
  newParent: string;
  createdBy: string;

  constructor(data: CloneComponentsTreeDTO) {
    this.app = data.app;
    this.currentParent = data.currentParent;
    this.newParent = data.newParent;
    this.createdBy = data.createdBy;
  }
}

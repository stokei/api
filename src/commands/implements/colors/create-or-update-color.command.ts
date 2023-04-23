import { ICommand } from '@nestjs/cqrs';

import { CreateOrUpdateColorDTO } from '@/dtos/colors/create-or-update-color.dto';
import { ColorType } from '@/enums/color-type.enum';
import { ThemeMode } from '@/enums/theme-mode.enum';

export class CreateOrUpdateColorCommand
  implements ICommand, CreateOrUpdateColorDTO
{
  parent: string;
  themeMode: ThemeMode;
  type: ColorType;
  color: string;
  app: string;
  createdBy: string;

  constructor(data: CreateOrUpdateColorDTO) {
    this.themeMode = data.themeMode;
    this.type = data.type;
    this.color = data.color;
    this.parent = data.parent;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}

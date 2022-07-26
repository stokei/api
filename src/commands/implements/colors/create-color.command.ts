import { ICommand } from '@nestjs/cqrs';

import { CreateColorDTO } from '@/dtos/colors/create-color.dto';
import { ColorType } from '@/enums/color-type.enum';
import { ThemeMode } from '@/enums/theme-mode.enum';

export class CreateColorCommand implements ICommand, CreateColorDTO {
  parent: string;
  themeMode: ThemeMode;
  type: ColorType;
  color: string;
  app: string;
  createdBy: string;

  constructor(data: CreateColorDTO) {
    this.themeMode = data.themeMode;
    this.type = data.type;
    this.color = data.color;
    this.parent = data.parent;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}

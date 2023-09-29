import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { CreateOrUpdateComponentDTO } from '@/dtos/components/create-or-update-component.dto';
import { ComponentModel } from '@/models/component.model';

import { CreateComponentService } from '../create-component';
import { UpdateComponentService } from '../update-component';

@Injectable()
export class CreateOrUpdateComponentService
  implements IBaseService<CreateOrUpdateComponentDTO, Promise<ComponentModel>>
{
  constructor(
    private readonly updateComponentService: UpdateComponentService,
    private readonly createComponentService: CreateComponentService
  ) {}

  async execute({
    id,
    ...data
  }: CreateOrUpdateComponentDTO): Promise<ComponentModel> {
    if (id) {
      return await this.updateComponentService.execute({
        data: {
          parent: data.parent,
          order: data.order,
          data: data.data,
          updatedBy: data.createdBy
        },
        where: {
          app: data.app,
          component: id
        }
      });
    }
    if (!!data.parent) {
      return await this.createComponentService.execute(data);
    }
    return;
  }
}

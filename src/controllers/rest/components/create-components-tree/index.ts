import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { REST_CONTROLLERS_URL_NAMES } from '@/constants/rest-controllers';
import { REST_VERSIONS } from '@/constants/rest-versions';
import {
  CreateComponentsTreeComponentDTO,
  CreateComponentsTreeDTO
} from '@/dtos/components/create-components-tree.dto';
import { CreateComponentsTreeService } from '@/services/components/create-components-tree';

@ApiTags(REST_CONTROLLERS_URL_NAMES.COMPONENTS)
@Controller({
  path: REST_CONTROLLERS_URL_NAMES.COMPONENTS,
  version: REST_VERSIONS.V1
})
export class CreateComponentsTreeController {
  constructor(
    private readonly createComponentsTreeService: CreateComponentsTreeService
  ) {}

  @Post('tree')
  @UseGuards(AuthenticatedGuard, AppGuard)
  async createComponentsTree(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Body() data: CreateComponentsTreeDTO
  ) {
    const addAppToComponents = (
      components: CreateComponentsTreeComponentDTO[]
    ): CreateComponentsTreeComponentDTO[] =>
      components?.map((treeItem) => ({
        ...treeItem,
        components: addAppToComponents(treeItem.components),
        app: appId,
        createdBy: currentAccountId
      }));
    const response = await this.createComponentsTreeService.execute({
      ...data,
      tree: addAppToComponents(data.tree),
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}

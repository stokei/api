import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { defaultAccountId } from '@/constants/default-account-id';
import { defaultAppId } from '@/constants/default-app-id';
import { CreatePlanDTO } from '@/dtos/plans/create-plan.dto';
import { PlanType } from '@/enums/plan-type.enum';
import { PlanModel } from '@/models/plan.model';
import { CreatePlanService } from '@/services/plans/create-plan';
import { FindAllPlansService } from '@/services/plans/find-all-plans';
import { CreatePriceService } from '@/services/prices/create-price';
import { CreateProductService } from '@/services/products/create-product';

@Injectable()
export class PlansSeeds implements IBaseService<any, Promise<PlanModel[]>> {
  private readonly data: CreatePlanDTO[];

  constructor(
    private readonly createProductService: CreateProductService,
    private readonly createPriceService: CreatePriceService,
    private readonly createPlanService: CreatePlanService,
    private readonly findAllPlansService: FindAllPlansService
  ) {
    this.data = [
      {
        name: 'Serviço de Administradores',
        app: defaultAppId,
        type: PlanType.ADMIN,
        createdBy: defaultAccountId
      },
      {
        name: 'Serviço de Cursos',
        app: defaultAppId,
        type: PlanType.COURSE,
        createdBy: defaultAccountId
      },
      {
        name: 'Serviço de Domínios',
        app: defaultAppId,
        type: PlanType.DOMAIN,
        createdBy: defaultAccountId
      },
      {
        name: 'Serviço de Professores',
        app: defaultAppId,
        type: PlanType.INSTRUCTOR,
        createdBy: defaultAccountId
      },
      {
        name: 'Serviço de Storage',
        app: defaultAppId,
        type: PlanType.STORAGE,
        createdBy: defaultAccountId
      }
    ];
  }

  async execute(): Promise<PlanModel[]> {
    return await Promise.all(
      this.data.map(async (planData) => {
        const plan = await this.createPlanService.execute(planData);
        return plan;
      })
    );
  }
}

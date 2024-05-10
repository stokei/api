import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { defaultAccountId } from '@/constants/default-account-id';
import { defaultAppId } from '@/constants/default-app-id';
import { defaultCurrencyId } from '@/constants/default-currency-id';
import { getPlanPriceAmountByType } from '@/constants/default-plan-prices';
import { CreatePlanDTO } from '@/dtos/plans/create-plan.dto';
import { CreatePriceDTO } from '@/dtos/prices/create-price.dto';
import { BillingScheme } from '@/enums/billing-scheme.enum';
import { IntervalType } from '@/enums/interval-type.enum';
import { InventoryType } from '@/enums/inventory-type.enum';
import { PlanType } from '@/enums/plan-type.enum';
import { PriceType } from '@/enums/price-type.enum';
import { TiersMode } from '@/enums/tiers-mode.enum';
import { UsageType } from '@/enums/usage-type.enum';
import { CreatePlanService } from '@/services/plans/create-plan';
import { FindAllPlansService } from '@/services/plans/find-all-plans';
import { CreatePriceService } from '@/services/prices/create-price';
import { CreateProductService } from '@/services/products/create-product';
import { sleep } from '@/utils/sleep';

import { BaseSeeds } from '../base-seeds';

interface PlanDataDTO {
  plan: CreatePlanDTO;
  price: CreatePriceDTO;
}

interface PlansSeedsDTO {
  appId: string;
  accountId: string;
}

@Injectable()
export class PlansSeeds
  extends BaseSeeds
  implements IBaseService<PlansSeedsDTO, Promise<void>>
{
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly createPriceService: CreatePriceService,
    private readonly createPlanService: CreatePlanService,
    private readonly findAllPlansService: FindAllPlansService
  ) {
    super();
  }

  async execute(): Promise<void> {
    const planData = this.createData();
    const plansFounded = await this.findAllPlansService.execute({});
    let plansToCreate = planData;
    if (plansFounded?.items?.length > 0) {
      plansToCreate = plansToCreate?.filter(({ plan }) => {
        const existsPlan = plansFounded?.items?.find(
          (planFounded) => planFounded.type === plan.type
        );
        return !existsPlan;
      });
    }
    plansToCreate?.forEach(async (planData) => {
      const plan = await this.createPlanService.execute(planData.plan);
      await sleep(500);
      const product = await this.createProductService.execute({
        app: plan.app,
        parent: plan.id,
        name: plan.name,
        description: plan.description,
        createdBy: plan.createdBy
      });
      await sleep(500);
      await this.createPriceService.execute({
        ...planData.price,
        nickname: product.name,
        parent: product.id
      });
      await sleep(500);
      return plan;
    });
  }

  private createData(): PlanDataDTO[] {
    return [
      {
        plan: {
          name: 'Videos - Minutos Armazenados',
          icon: 'video',
          app: defaultAppId,
          type: PlanType.VIDEO,
          createdBy: defaultAccountId
        },
        price: {
          parent: undefined,
          app: defaultAppId,
          nickname: 'Videos - Minutos Armazenados',
          unit: 'Min',
          billingScheme: BillingScheme.PER_UNIT,
          currency: defaultCurrencyId,
          inventoryType: InventoryType.INFINITE,
          tiersMode: TiersMode.VOLUME,
          type: PriceType.RECURRING,
          amount: getPlanPriceAmountByType(PlanType.VIDEO),
          fromAmount: undefined,
          quantity: undefined,
          tiers: undefined,
          createdBy: defaultAccountId,
          recurring: {
            app: defaultAppId,
            interval: IntervalType.MONTH,
            intervalCount: 1,
            usageType: UsageType.LICENSED,
            createdBy: defaultAccountId
          }
        }
      },
      {
        plan: {
          name: 'Storage',
          app: defaultAppId,
          icon: 'storage',
          type: PlanType.STORAGE,
          createdBy: defaultAccountId
        },
        price: {
          parent: undefined,
          app: defaultAppId,
          nickname: 'Storage',
          unit: 'Mb',
          billingScheme: BillingScheme.PER_UNIT,
          currency: defaultCurrencyId,
          inventoryType: InventoryType.INFINITE,
          tiersMode: TiersMode.VOLUME,
          type: PriceType.RECURRING,
          amount: getPlanPriceAmountByType(PlanType.STORAGE),
          fromAmount: undefined,
          quantity: undefined,
          tiers: undefined,
          createdBy: defaultAccountId,
          recurring: {
            app: defaultAppId,
            interval: IntervalType.MONTH,
            intervalCount: 1,
            usageType: UsageType.LICENSED,
            createdBy: defaultAccountId
          }
        }
      }
    ];
  }
}

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
import { PlanModel } from '@/models/plan.model';
import { CreatePlanService } from '@/services/plans/create-plan';
import { FindAllPlansService } from '@/services/plans/find-all-plans';
import { CreatePriceService } from '@/services/prices/create-price';
import { CreateProductService } from '@/services/products/create-product';
import { sleep } from '@/utils/sleep';

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
  implements IBaseService<PlansSeedsDTO, Promise<PlanModel[]>>
{
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly createPriceService: CreatePriceService,
    private readonly createPlanService: CreatePlanService,
    private readonly findAllPlansService: FindAllPlansService
  ) {}

  async execute(): Promise<PlanModel[]> {
    const planData = this.createData();
    const plansFounded = await this.findAllPlansService.execute({
      where: {
        AND: {
          app: {
            equals: defaultAccountId
          }
        }
      }
    });
    let plansToCreate = planData;
    if (plansFounded?.items?.length > 0) {
      plansToCreate = plansToCreate?.filter(({ plan }) => {
        const existsLanguage = plansFounded?.items?.find(
          (planFounded) => planFounded.type === plan.type
        );
        return !existsLanguage;
      });
    }
    const plansCreated = await Promise.all(
      plansToCreate?.map(async (planData) => {
        const plan = await this.createPlanService.execute(planData.plan);
        await sleep(5000);
        const product = await this.createProductService.execute({
          app: plan.app,
          parent: plan.id,
          name: plan.name,
          description: plan.description,
          checkoutVisible: true,
          createdBy: plan.createdBy
        });
        await sleep(5000);
        await this.createPriceService.execute({
          ...planData.price,
          nickname: product.name,
          parent: product.id
        });
        await sleep(5000);
        return plan;
      })
    );
    return [...plansFounded?.items, ...plansCreated];
  }

  private createData(): PlanDataDTO[] {
    return [
      {
        plan: {
          name: 'Administradores',
          app: defaultAppId,
          type: PlanType.ADMIN,
          createdBy: defaultAccountId
        },
        price: {
          parent: undefined,
          app: defaultAppId,
          nickname: 'Administradores',
          billingScheme: BillingScheme.PER_UNIT,
          currency: defaultCurrencyId,
          inventoryType: InventoryType.INFINITE,
          tiersMode: undefined,
          type: PriceType.RECURRING,
          amount: getPlanPriceAmountByType(PlanType.ADMIN),
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
          name: 'Cursos',
          app: defaultAppId,
          type: PlanType.COURSE,
          createdBy: defaultAccountId
        },
        price: {
          parent: undefined,
          app: defaultAppId,
          nickname: 'Cursos',
          billingScheme: BillingScheme.PER_UNIT,
          currency: defaultCurrencyId,
          inventoryType: InventoryType.INFINITE,
          tiersMode: undefined,
          type: PriceType.RECURRING,
          amount: getPlanPriceAmountByType(PlanType.COURSE),
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
          name: 'Domínios',
          app: defaultAppId,
          type: PlanType.DOMAIN,
          createdBy: defaultAccountId
        },
        price: {
          parent: undefined,
          app: defaultAppId,
          nickname: 'Domínios',
          billingScheme: BillingScheme.PER_UNIT,
          currency: defaultCurrencyId,
          inventoryType: InventoryType.INFINITE,
          tiersMode: undefined,
          type: PriceType.RECURRING,
          amount: getPlanPriceAmountByType(PlanType.DOMAIN),
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
          name: 'Professores',
          app: defaultAppId,
          type: PlanType.INSTRUCTOR,
          createdBy: defaultAccountId
        },
        price: {
          parent: undefined,
          app: defaultAppId,
          nickname: 'Professores',
          billingScheme: BillingScheme.PER_UNIT,
          currency: defaultCurrencyId,
          inventoryType: InventoryType.INFINITE,
          tiersMode: undefined,
          type: PriceType.RECURRING,
          amount: getPlanPriceAmountByType(PlanType.INSTRUCTOR),
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
          type: PlanType.STORAGE,
          createdBy: defaultAccountId
        },
        price: {
          parent: undefined,
          app: defaultAppId,
          nickname: 'Storage',
          billingScheme: BillingScheme.TIERED,
          currency: defaultCurrencyId,
          inventoryType: InventoryType.INFINITE,
          tiersMode: TiersMode.VOLUME,
          type: PriceType.RECURRING,
          amount: undefined,
          fromAmount: undefined,
          quantity: undefined,
          tiers: [
            {
              app: defaultAppId,
              createdBy: defaultAccountId,
              infinite: true,
              amount: getPlanPriceAmountByType(PlanType.STORAGE)
            }
          ],
          createdBy: defaultAccountId,
          recurring: {
            app: defaultAppId,
            interval: IntervalType.MONTH,
            intervalCount: 1,
            usageType: UsageType.METERED,
            createdBy: defaultAccountId
          }
        }
      }
    ];
  }
}
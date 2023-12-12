import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  cleanValueBoolean,
  cleanValueNumber
} from '@stokei/nestjs';

import { CreatePriceCommand } from '@/commands/implements/prices/create-price.command';
import { BillingScheme } from '@/enums/billing-scheme.enum';
import { PriceType } from '@/enums/price-type.enum';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException,
  PriceTiersNotFoundException,
  ProductNotFoundException,
  RecurringNotFoundException
} from '@/errors';
import { RecurringModel } from '@/models/recurring.model';
import { CreatePriceRepository } from '@/repositories/prices/create-price';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { CreatePriceTierService } from '@/services/price-tiers/create-price-tier';
import { FindAllPricesService } from '@/services/prices/find-all-prices';
import { FindProductByIdService } from '@/services/products/find-product-by-id';
import { CreateRecurringService } from '@/services/recurrings/create-recurring';

type CreatePriceCommandKeys = keyof CreatePriceCommand;

@CommandHandler(CreatePriceCommand)
export class CreatePriceCommandHandler
  implements ICommandHandler<CreatePriceCommand>
{
  constructor(
    private readonly createPriceRepository: CreatePriceRepository,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findProductByIdService: FindProductByIdService,
    private readonly createRecurringService: CreateRecurringService,
    private readonly createPriceTierService: CreatePriceTierService,
    private readonly findAllPricesService: FindAllPricesService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreatePriceCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreatePriceCommandKeys>('parent');
    }
    if (!data?.currency) {
      throw new ParamNotFoundException<CreatePriceCommandKeys>('currency');
    }
    if (!data?.app) {
      throw new ParamNotFoundException<CreatePriceCommandKeys>('app');
    }

    const app = await this.findAppByIdService.execute(data.app);
    if (!app) {
      throw new AppNotFoundException();
    }
    const product = await this.findProductByIdService.execute(data.parent);
    if (!product) {
      throw new ProductNotFoundException();
    }
    data.unit = data.unit || null;
    data.automaticRenew = !!data.automaticRenew;

    let recurring: RecurringModel;
    if (data.type === PriceType.RECURRING) {
      recurring = await this.createRecurringService.execute(data.recurring);
      if (!recurring) {
        throw new RecurringNotFoundException();
      }
    } else {
      data.automaticRenew = false;
    }
    const { tiers: tiersPrices, defaultPrice, ...dataCreated } = data;
    let tiers = tiersPrices;
    if (data.billingScheme === BillingScheme.TIERED) {
      if (!tiers?.length) {
        throw new PriceTiersNotFoundException();
      }
    } else {
      tiers = undefined;
      dataCreated.tiersMode = undefined;
    }

    const priceIsDefault = await this.isDefaultPrice({
      defaultPrice,
      parent: data.parent
    });
    const priceCreated = await this.createPriceRepository.execute({
      ...dataCreated,
      unit: data.unit,
      recurring: recurring?.id
    });
    if (!priceCreated) {
      throw new PriceNotFoundException();
    }

    if (dataCreated.billingScheme === BillingScheme.TIERED) {
      const priceTiers = await Promise.all(
        tiers?.map((tier) =>
          this.createPriceTierService.execute({
            amount: tier.amount,
            app: tier.app,
            infinite: tier.infinite,
            parent: priceCreated.id,
            upTo: tier.upTo,
            createdBy: tier.createdBy
          })
        )
      );
      if (!priceTiers?.length) {
        throw new PriceTiersNotFoundException();
      }
    }
    const priceModel = this.publisher.mergeObjectContext(priceCreated);
    priceModel.createdPrice({
      createdBy: dataCreated.createdBy,
      defaultPrice: priceIsDefault
    });
    priceModel.commit();

    return priceCreated;
  }

  private async isDefaultPrice(data: {
    defaultPrice?: boolean;
    parent: string;
  }): Promise<boolean> {
    if (data.defaultPrice) {
      return true;
    }
    const prices = await this.findAllPricesService.execute({
      where: {
        AND: {
          parent: {
            equals: data.parent
          }
        }
      },
      page: {
        limit: 1
      }
    });
    const isFirstPrice = prices.totalCount === 0;
    return isFirstPrice;
  }

  private clearData(command: CreatePriceCommand): CreatePriceCommand {
    return cleanObject({
      parent: cleanValue(command?.parent),
      nickname: cleanValue(command?.nickname),
      defaultPrice: cleanValueBoolean(command?.defaultPrice),
      automaticRenew: cleanValueBoolean(command?.automaticRenew),
      fromAmount: cleanValueNumber(command?.fromAmount),
      amount: cleanValueNumber(command?.amount),
      currency: cleanValue(command?.currency),
      unit: cleanValue(command?.unit),
      type: cleanValue(command?.type),
      tiers: command?.tiers,
      inventoryType: cleanValue(command?.inventoryType),
      billingScheme: cleanValue(command?.billingScheme),
      tiersMode: cleanValue(command?.tiersMode),
      recurring: command?.recurring,
      quantity: cleanValueNumber(command?.quantity),
      app: cleanValue(command?.app),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}

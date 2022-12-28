import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, cleanValueNumber } from '@stokei/nestjs';

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
import { PriceMapper } from '@/mappers/prices';
import { RecurringModel } from '@/models/recurring.model';
import { CreatePriceRepository } from '@/repositories/prices/create-price';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { CreatePriceTierService } from '@/services/price-tiers/create-price-tier';
import { FindProductByIdService } from '@/services/products/find-product-by-id';
import { CreateRecurringService } from '@/services/recurrings/create-recurring';
import { CreateStripePriceService } from '@/services/stripe/create-stripe-price';

type CreatePriceCommandKeys = keyof CreatePriceCommand;

@CommandHandler(CreatePriceCommand)
export class CreatePriceCommandHandler
  implements ICommandHandler<CreatePriceCommand>
{
  constructor(
    private readonly createPriceRepository: CreatePriceRepository,
    private readonly createStripePriceService: CreateStripePriceService,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findProductByIdService: FindProductByIdService,
    private readonly createRecurringService: CreateRecurringService,
    private readonly createPriceTierService: CreatePriceTierService,
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
    let recurring: RecurringModel;
    if (data.type === PriceType.RECURRING) {
      recurring = await this.createRecurringService.execute(data.recurring);
      if (!recurring) {
        throw new RecurringNotFoundException();
      }
    }
    const { tiers: tiersPrices, ...dataCreated } = data;
    let tiers = tiersPrices;
    if (data.billingScheme === BillingScheme.TIERED) {
      if (!tiers?.length) {
        throw new PriceTiersNotFoundException();
      }
    } else {
      tiers = undefined;
      dataCreated.tiersMode = undefined;
    }
    const priceMapper = new PriceMapper();
    const stripePrice = await this.createStripePriceService.execute({
      amount: data.amount,
      currency: data.currency,
      billingScheme: priceMapper.billingSchemeToStripeBillingScheme(
        data.billingScheme
      ),
      tiers,
      tiersMode: data.tiersMode
        ? priceMapper.tiersModeToStripeTiersMode(data.tiersMode)
        : undefined,
      app: app.id,
      recurring,
      type: data.type,
      stripeProduct: product.stripeProduct,
      stripeAccount: app.stripeAccount
    });

    const priceCreated = await this.createPriceRepository.execute({
      ...dataCreated,
      recurring: recurring?.id,
      stripePrice: stripePrice.id
    });
    if (!priceCreated) {
      throw new PriceNotFoundException();
    }

    if (data.billingScheme === BillingScheme.TIERED) {
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
      createdBy: data.createdBy
    });
    priceModel.commit();

    return priceCreated;
  }

  private clearData(command: CreatePriceCommand): CreatePriceCommand {
    return cleanObject({
      parent: cleanValue(command?.parent),
      nickname: cleanValue(command?.nickname),
      fromAmount: cleanValueNumber(command?.fromAmount),
      amount: cleanValueNumber(command?.amount),
      currency: cleanValue(command?.currency),
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

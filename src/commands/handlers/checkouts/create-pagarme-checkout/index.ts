import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreatePagarmeCheckoutCommand } from '@/commands/implements/checkouts/create-pagarme-checkout.command';
import {
  AccountNotFoundException,
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException,
  ProductNotFoundException,
  SubscriptionContractAlreadyActiveException,
  SubscriptionContractNotFoundException
} from '@/errors';
import { PixCheckoutMapper } from '@/mappers/pix-checkouts';
import { PriceModel } from '@/models/price.model';
import { ProductModel } from '@/models/product.model';
import { RecurringModel } from '@/models/recurring.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { CreatePagarmeOrderService } from '@/services/pagarme/create-pagarme-order';
import { FindPriceByIdService } from '@/services/prices/find-price-by-id';
import { FindProductByIdService } from '@/services/products/find-product-by-id';
import { CreateRecurringService } from '@/services/recurrings/create-recurring';
import { FindRecurringByIdService } from '@/services/recurrings/find-recurring-by-id';
import { CreateSubscriptionContractItemService } from '@/services/subscription-contract-items/create-subscription-contract-item';
import { FindAllSubscriptionContractItemsService } from '@/services/subscription-contract-items/find-all-subscription-contract-items';
import { CancelSubscriptionContractService } from '@/services/subscription-contracts/cancel-subscription-contract';
import { CreateSubscriptionContractService } from '@/services/subscription-contracts/create-subscription-contract';
import { FindSubscriptionContractByIdService } from '@/services/subscription-contracts/find-subscription-contract-by-id';

type CreatePagarmeCheckoutCommandKeys = keyof CreatePagarmeCheckoutCommand;

@CommandHandler(CreatePagarmeCheckoutCommand)
export class CreatePagarmeCheckoutCommandHandler
  implements ICommandHandler<CreatePagarmeCheckoutCommand>
{
  constructor(
    private readonly createSubscriptionContractService: CreateSubscriptionContractService,
    private readonly cancelSubscriptionContractService: CancelSubscriptionContractService,
    private readonly createSubscriptionContractItemService: CreateSubscriptionContractItemService,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findProductByIdService: FindProductByIdService,
    private readonly findSubscriptionContractByIdService: FindSubscriptionContractByIdService,
    private readonly findAllSubscriptionContractItemsService: FindAllSubscriptionContractItemsService,
    private readonly findPriceByIdService: FindPriceByIdService,
    private readonly createPagarmeOrderService: CreatePagarmeOrderService,
    private readonly findAccountByIdService: FindAccountByIdService,
    private readonly createRecurringService: CreateRecurringService,
    private readonly findRecurringByIdService: FindRecurringByIdService
  ) {}

  async execute(command: CreatePagarmeCheckoutCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.customer) {
      throw new ParamNotFoundException<CreatePagarmeCheckoutCommandKeys>(
        'customer'
      );
    }
    if (!data?.createdBy) {
      throw new ParamNotFoundException<CreatePagarmeCheckoutCommandKeys>(
        'createdBy'
      );
    }
    if (!data?.price) {
      throw new ParamNotFoundException<CreatePagarmeCheckoutCommandKeys>(
        'price'
      );
    }

    const customer = await this.findAccountByIdService.execute(data.customer);
    if (!customer) {
      throw new AccountNotFoundException();
    }

    const customerApp = await this.findAppByIdService.execute(data.app);
    if (!customerApp) {
      throw new AppNotFoundException();
    }

    const price = await this.findPriceByIdService.execute(data?.price);
    if (!price || !price.active || price.app !== data.app) {
      throw new PriceNotFoundException();
    }

    const product = await this.findProductByIdService.execute(price.parent);
    if (!product) {
      throw new ProductNotFoundException();
    }

    const hasActivePrice = await this.hasSubscriptionActive({
      price,
      product,
      customer: customer?.id
    });
    if (hasActivePrice) {
      throw new SubscriptionContractAlreadyActiveException();
    }

    const subscriptionContract =
      await this.createSubscriptionContractService.execute({
        parent: customer.id,
        app: customerApp.id,
        type: price.type,
        createdByAdmin: false,
        automaticRenew: price.automaticRenew,
        createdBy: data.createdBy
      });

    if (!subscriptionContract) {
      throw new SubscriptionContractNotFoundException();
    }

    const priceRecurring = await this.findRecurringByIdService.execute(
      price.recurring
    );
    let recurring: RecurringModel;
    if (priceRecurring) {
      recurring = await this.createRecurringService.execute({
        app: customerApp.id,
        interval: priceRecurring?.interval,
        intervalCount: priceRecurring?.intervalCount,
        usageType: priceRecurring?.usageType,
        createdBy: subscriptionContract?.createdBy
      });
    }
    const quantity = 1;
    await this.createSubscriptionContractItemService.execute({
      app: customerApp.id,
      parent: subscriptionContract?.id,
      product: product.id,
      quantity,
      createdByAdmin: true,
      recurring: recurring?.id,
      createdBy: subscriptionContract?.createdBy
    });

    try {
      const pagarmeOrder = await this.createPagarmeOrderService.execute({
        appRecipient: customerApp.pagarmeAccount,
        currency: price.currency,
        customer: customer.pagarmeCustomer,
        orderId: subscriptionContract.id,
        prices: [
          {
            id: price.id,
            amount: price.amount,
            name: price.nickname || product.name,
            quantity
          }
        ]
      });

      if (!pagarmeOrder?.pix?.qrCodeURL) {
        throw new SubscriptionContractNotFoundException();
      }
      return new PixCheckoutMapper().toModel({
        qrCodeURL: pagarmeOrder?.pix?.qrCodeURL
      });
    } catch (error) {
      await this.cancelSubscriptionContractService.execute({
        app: customerApp.id,
        subscriptionContract: subscriptionContract.id,
        updatedBy: customer.id
      });
      throw error;
    }
  }

  private async hasSubscriptionActive({
    customer,
    product,
    price
  }: {
    customer: string;
    product: ProductModel;
    price: PriceModel;
  }): Promise<boolean> {
    const customerSubscriptionContractItems =
      await this.findAllSubscriptionContractItemsService.execute({
        where: {
          AND: {
            createdBy: {
              equals: customer
            },
            product: {
              equals: product.parent
            },
            price: {
              equals: price.id
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

    if (customerSubscriptionContractItems?.totalCount > 0) {
      const subscriptionContracts = await Promise.all(
        customerSubscriptionContractItems?.items?.map(
          async (customerSubscriptionContractItem) => {
            try {
              const customerSubscriptionContract =
                await this.findSubscriptionContractByIdService.execute(
                  customerSubscriptionContractItem?.parent
                );
              return customerSubscriptionContract;
            } catch (error) {
              return null;
            }
          }
        )
      );
      return subscriptionContracts
        ?.filter(Boolean)
        ?.some((subscriptionContract) => !!subscriptionContract.active);
    }
    return false;
  }

  private clearData(
    command: CreatePagarmeCheckoutCommand
  ): CreatePagarmeCheckoutCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      customer: cleanValue(command?.customer),
      price: cleanValue(command?.price)
    });
  }
}

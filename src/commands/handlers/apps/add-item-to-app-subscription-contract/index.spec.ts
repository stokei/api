import { Test } from '@nestjs/testing';
import { PaginationMapper } from '@stokei/nestjs';

import { AddItemToAppSubscriptionContractCommand } from '@/commands/implements/apps/add-item-to-app-subscription-contract.command';
import { BillingScheme } from '@/enums/billing-scheme.enum';
import { SubscriptionContractStatus } from '@/enums/subscription-contract-status.enum';
import { TiersMode } from '@/enums/tiers-mode.enum';
import { SubscriptionContractNotFoundException } from '@/errors';
import { AccountModelMock } from '@/mocks/models/account.mock';
import { AppModelMock } from '@/mocks/models/app.mock';
import { PriceModelMock } from '@/mocks/models/price.mock';
import { ProductModelMock } from '@/mocks/models/product.mock';
import { SubscriptionContractModelMock } from '@/mocks/models/subscription-contract.mock';
import { SubscriptionContractItemModelMock } from '@/mocks/models/subscription-contract-item.mock';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindAppCurrentSubscriptionContractService } from '@/services/apps/find-app-current-subscription-contract';
import { FindPaymentMethodByIdService } from '@/services/payment-methods/find-payment-method-by-id';
import { FindPriceByIdService } from '@/services/prices/find-price-by-id';
import { FindProductByIdService } from '@/services/products/find-product-by-id';
import { CreateStripeSubscriptionService } from '@/services/stripe/create-stripe-subscription';
import { FindStripeSubscriptionByIdService } from '@/services/stripe/find-subscription-by-id';
import { CreateSubscriptionContractItemService } from '@/services/subscription-contract-items/create-subscription-contract-item';
import { FindAllSubscriptionContractItemsService } from '@/services/subscription-contract-items/find-all-subscription-contract-items';
import { UpdateSubscriptionContractItemService } from '@/services/subscription-contract-items/update-subscription-contract-item';
import { ActivateSubscriptionContractService } from '@/services/subscription-contracts/activate-subscription-contract';
import { CancelSubscriptionContractService } from '@/services/subscription-contracts/cancel-subscription-contract';
import { CreateSubscriptionContractService } from '@/services/subscription-contracts/create-subscription-contract';
import { CreateUsageRecordService } from '@/services/usage-records/create-usage-record';

import { AddItemToAppSubscriptionContractCommandHandler } from '.';

describe('AddItemToAppSubscriptionContractCommandHandler', () => {
  let addItemToAppSubscriptionContractCommandHandler: AddItemToAppSubscriptionContractCommandHandler;
  let activateSubscriptionContractService: ActivateSubscriptionContractService;
  let findAppByIdService: FindAppByIdService;
  let findAccountByIdService: FindAccountByIdService;
  let findStripeSubscriptionByIdService: FindStripeSubscriptionByIdService;
  let createSubscriptionContractService: CreateSubscriptionContractService;
  let createSubscriptionContractItemService: CreateSubscriptionContractItemService;
  let createStripeSubscriptionService: CreateStripeSubscriptionService;
  let createUsageRecordService: CreateUsageRecordService;
  let findPriceByIdService: FindPriceByIdService;
  let findProductByIdService: FindProductByIdService;
  let findAppCurrentSubscriptionContractService: FindAppCurrentSubscriptionContractService;
  let findAllSubscriptionContractItemsService: FindAllSubscriptionContractItemsService;
  let updateSubscriptionContractItemService: UpdateSubscriptionContractItemService;

  const app = new AppModelMock({
    _id: 'app_any'
  });
  const account = new AccountModelMock({
    app: app.id
  });
  const product = new ProductModelMock({
    app: app.id,
    createdBy: account.id
  });

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        AddItemToAppSubscriptionContractCommandHandler,
        {
          provide: FindAppByIdService,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: FindAccountByIdService,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: FindPaymentMethodByIdService,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CancelSubscriptionContractService,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CreateSubscriptionContractService,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CreateSubscriptionContractItemService,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: FindStripeSubscriptionByIdService,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CreateStripeSubscriptionService,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CreateUsageRecordService,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: FindPriceByIdService,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: FindProductByIdService,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: FindAppCurrentSubscriptionContractService,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: FindAllSubscriptionContractItemsService,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: ActivateSubscriptionContractService,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: UpdateSubscriptionContractItemService,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    addItemToAppSubscriptionContractCommandHandler =
      moduleRef.get<AddItemToAppSubscriptionContractCommandHandler>(
        AddItemToAppSubscriptionContractCommandHandler
      );
    findAppByIdService = moduleRef.get<FindAppByIdService>(FindAppByIdService);
    findStripeSubscriptionByIdService =
      moduleRef.get<FindStripeSubscriptionByIdService>(
        FindStripeSubscriptionByIdService
      );
    activateSubscriptionContractService =
      moduleRef.get<ActivateSubscriptionContractService>(
        ActivateSubscriptionContractService
      );
    createSubscriptionContractService =
      moduleRef.get<CreateSubscriptionContractService>(
        CreateSubscriptionContractService
      );
    createSubscriptionContractItemService =
      moduleRef.get<CreateSubscriptionContractItemService>(
        CreateSubscriptionContractItemService
      );
    createStripeSubscriptionService =
      moduleRef.get<CreateStripeSubscriptionService>(
        CreateStripeSubscriptionService
      );
    createUsageRecordService = moduleRef.get<CreateUsageRecordService>(
      CreateUsageRecordService
    );
    findPriceByIdService =
      moduleRef.get<FindPriceByIdService>(FindPriceByIdService);
    findAccountByIdService = moduleRef.get<FindAccountByIdService>(
      FindAccountByIdService
    );
    findProductByIdService = moduleRef.get<FindProductByIdService>(
      FindProductByIdService
    );
    findAppCurrentSubscriptionContractService =
      moduleRef.get<FindAppCurrentSubscriptionContractService>(
        FindAppCurrentSubscriptionContractService
      );
    findAllSubscriptionContractItemsService =
      moduleRef.get<FindAllSubscriptionContractItemsService>(
        FindAllSubscriptionContractItemsService
      );
    updateSubscriptionContractItemService =
      moduleRef.get<UpdateSubscriptionContractItemService>(
        UpdateSubscriptionContractItemService
      );

    jest.spyOn(findAppByIdService, 'execute').mockResolvedValue(app);
    jest.spyOn(findAccountByIdService, 'execute').mockResolvedValue(account);
  });

  it('should be defined', () => {
    expect(addItemToAppSubscriptionContractCommandHandler).toBeDefined();
    expect(findAppByIdService).toBeDefined();
    expect(findAccountByIdService).toBeDefined();
    expect(findStripeSubscriptionByIdService).toBeDefined();
    expect(activateSubscriptionContractService).toBeDefined();
    expect(createSubscriptionContractService).toBeDefined();
    expect(createSubscriptionContractItemService).toBeDefined();
    expect(createStripeSubscriptionService).toBeDefined();
    expect(createUsageRecordService).toBeDefined();
    expect(findPriceByIdService).toBeDefined();
    expect(findProductByIdService).toBeDefined();
    expect(findAppCurrentSubscriptionContractService).toBeDefined();
    expect(findAllSubscriptionContractItemsService).toBeDefined();
    expect(updateSubscriptionContractItemService).toBeDefined();
  });

  describe('execute', () => {
    it('should update subscription item quantity when app has subscription item with different tier billing scheme', async () => {
      const price = new PriceModelMock({
        parent: product.id,
        app: app.id,
        createdBy: account.id
      });
      const subscriptionContract = new SubscriptionContractModelMock({
        app: app.id,
        createdBy: account.id
      });
      const subscriptionContractItem = new SubscriptionContractItemModelMock({
        parent: subscriptionContract.id,
        app: app.id
      });
      const quantityToAdd = 1;
      const expectSubscriptionContractItemResponse =
        new SubscriptionContractItemModelMock({
          parent: subscriptionContract.id,
          app: app.id,
          quantity: subscriptionContractItem.quantity + quantityToAdd
        });

      jest.spyOn(findPriceByIdService, 'execute').mockResolvedValue(price);
      jest
        .spyOn(
          addItemToAppSubscriptionContractCommandHandler,
          'findOrCreateSubscription'
        )
        .mockResolvedValue({ subscriptionContract });
      jest
        .spyOn(
          addItemToAppSubscriptionContractCommandHandler,
          'findOrCreateSubscriptionItem'
        )
        .mockResolvedValue(subscriptionContractItem);
      jest
        .spyOn(updateSubscriptionContractItemService, 'execute')
        .mockResolvedValue(expectSubscriptionContractItemResponse);

      expect(
        await addItemToAppSubscriptionContractCommandHandler.execute(
          new AddItemToAppSubscriptionContractCommand({
            app: app.id,
            price: price.id,
            quantity: quantityToAdd,
            createdBy: account.id
          })
        )
      ).toStrictEqual(expectSubscriptionContractItemResponse);
    });

    it('should create usage record when subscription item has tier billing scheme', async () => {
      const price = new PriceModelMock({
        billingScheme: BillingScheme.TIERED,
        tiersMode: TiersMode.VOLUME,
        parent: product.id,
        app: app.id,
        createdBy: account.id
      });
      const subscriptionContract = new SubscriptionContractModelMock({
        app: app.id,
        createdBy: account.id
      });
      const subscriptionContractItem = new SubscriptionContractItemModelMock({
        parent: subscriptionContract.id,
        app: app.id
      });
      const quantityToAdd = 100;
      const expectSubscriptionContractItemResponse =
        new SubscriptionContractItemModelMock({
          id: subscriptionContractItem.id,
          parent: subscriptionContract.id,
          app: app.id,
          quantity: subscriptionContractItem.quantity
        });

      jest.spyOn(findPriceByIdService, 'execute').mockResolvedValue(price);
      jest
        .spyOn(
          addItemToAppSubscriptionContractCommandHandler,
          'findOrCreateSubscription'
        )
        .mockResolvedValue({ subscriptionContract });
      jest
        .spyOn(
          addItemToAppSubscriptionContractCommandHandler,
          'findOrCreateSubscriptionItem'
        )
        .mockResolvedValue(subscriptionContractItem);
      jest
        .spyOn(updateSubscriptionContractItemService, 'execute')
        .mockResolvedValue(expectSubscriptionContractItemResponse);

      expect(
        await addItemToAppSubscriptionContractCommandHandler.execute(
          new AddItemToAppSubscriptionContractCommand({
            app: app.id,
            price: price.id,
            quantity: quantityToAdd,
            createdBy: account.id
          })
        )
      ).toStrictEqual(expectSubscriptionContractItemResponse);
    });
  });

  describe('findOrCreateSubscription', () => {
    it('should return app current subscription contract when app has a valid subscription', async () => {
      const stripeSubscription = 'stripeSubscriptionId';
      const price = new PriceModelMock({
        parent: product.id,
        app: app.id,
        createdBy: account.id
      });
      const expectSubscriptionContractResponse =
        new SubscriptionContractModelMock({
          parent: account.id,
          app: app.id,
          status: SubscriptionContractStatus.ACTIVE,
          stripeSubscription
        });
      jest
        .spyOn(findAppCurrentSubscriptionContractService, 'execute')
        .mockResolvedValue(expectSubscriptionContractResponse);
      jest
        .spyOn(findStripeSubscriptionByIdService, 'execute')
        .mockResolvedValue({
          id: expectSubscriptionContractResponse.stripeSubscription,
          status: 'active'
        } as any);
      expect(
        await addItemToAppSubscriptionContractCommandHandler.findOrCreateSubscription(
          {
            app: app,
            price: price,
            quantity: 1,
            createdBy: account.id
          }
        )
      ).toStrictEqual({
        subscriptionContract: expectSubscriptionContractResponse
      });
    });
    it('should create a new subscription when app has no subscription', async () => {
      const stripeSubscription = 'stripeSubscriptionId';
      const stripeSubscriptionItemId = 'stripeSubscriptionItemId';
      const price = new PriceModelMock({
        parent: product.id,
        app: app.id,
        createdBy: account.id
      });
      const subscriptionContractCreated = new SubscriptionContractModelMock({
        parent: app.id,
        app: app.id,
        status: SubscriptionContractStatus.PENDING,
        stripeSubscription
      });
      const expectSubscriptionContractResponse =
        new SubscriptionContractModelMock({
          parent: account.id,
          app: app.id,
          status: SubscriptionContractStatus.ACTIVE,
          stripeSubscription
        });

      jest.spyOn(createStripeSubscriptionService, 'execute').mockResolvedValue({
        id: expectSubscriptionContractResponse.stripeSubscription,
        items: {
          data: [
            {
              id: stripeSubscriptionItemId
            }
          ]
        }
      } as any);
      jest
        .spyOn(createSubscriptionContractService, 'execute')
        .mockResolvedValue(subscriptionContractCreated);
      jest
        .spyOn(findAppCurrentSubscriptionContractService, 'execute')
        .mockRejectedValue(new SubscriptionContractNotFoundException());
      jest
        .spyOn(activateSubscriptionContractService, 'execute')
        .mockResolvedValue(expectSubscriptionContractResponse);

      expect(
        await addItemToAppSubscriptionContractCommandHandler.findOrCreateSubscription(
          {
            app: app,
            price: price,
            quantity: 1,
            createdBy: account.id
          }
        )
      ).toStrictEqual({
        subscriptionContract: expectSubscriptionContractResponse,
        stripeSubscriptionContractItemId: stripeSubscriptionItemId
      });
    });
  });
  describe('findOrCreateSubscriptionItem', () => {
    it('should return app current subscription contract item when app has a valid subscription item', async () => {
      const price = new PriceModelMock({
        parent: product.id,
        app: app.id,
        createdBy: account.id
      });
      const subscriptionContract = new SubscriptionContractModelMock({
        parent: app.id,
        app: app.id
      });
      const subscriptionContractItem = new SubscriptionContractItemModelMock({
        parent: subscriptionContract.id,
        app: app.id
      });

      jest
        .spyOn(findAllSubscriptionContractItemsService, 'execute')
        .mockResolvedValue(
          new PaginationMapper().toPaginationList({
            items: [subscriptionContractItem],
            totalCount: 1
          })
        );

      expect(
        await addItemToAppSubscriptionContractCommandHandler.findOrCreateSubscriptionItem(
          {
            appCurrentSubscriptionContract: subscriptionContract,
            app: app,
            price: price,
            quantity: 1,
            createdBy: account.id
          }
        )
      ).toStrictEqual(subscriptionContractItem);
    });
    it('should create a new subscription item when app has no subscription item', async () => {
      const price = new PriceModelMock({
        parent: product.id,
        app: app.id,
        createdBy: account.id
      });
      const subscriptionContract = new SubscriptionContractModelMock({
        parent: app.id,
        app: app.id
      });
      const subscriptionContractItem = new SubscriptionContractItemModelMock({
        parent: subscriptionContract.id,
        app: app.id,
        price: price.id,
        product: product.parent
      });

      jest.spyOn(findProductByIdService, 'execute').mockResolvedValue(product);
      jest
        .spyOn(createSubscriptionContractItemService, 'execute')
        .mockResolvedValue(subscriptionContractItem);
      jest
        .spyOn(findAllSubscriptionContractItemsService, 'execute')
        .mockResolvedValue(
          new PaginationMapper().toPaginationList({
            items: [],
            totalCount: 0
          })
        );

      expect(
        await addItemToAppSubscriptionContractCommandHandler.findOrCreateSubscriptionItem(
          {
            appCurrentSubscriptionContract: subscriptionContract,
            app: app,
            price: price,
            quantity: 1,
            createdBy: account.id
          }
        )
      ).toStrictEqual(subscriptionContractItem);
    });
  });
});

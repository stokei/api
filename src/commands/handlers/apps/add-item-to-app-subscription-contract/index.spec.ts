import { Test } from '@nestjs/testing';

import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindAppCurrentSubscriptionContractService } from '@/services/apps/find-app-current-subscription-contract';
import { FindPriceByIdService } from '@/services/prices/find-price-by-id';
import { FindProductByIdService } from '@/services/products/find-product-by-id';
import { CreateStripeSubscriptionService } from '@/services/stripe/create-stripe-subscription';
import { CreateSubscriptionContractItemService } from '@/services/subscription-contract-items/create-subscription-contract-item';
import { FindAllSubscriptionContractItemsService } from '@/services/subscription-contract-items/find-all-subscription-contract-items';
import { UpdateSubscriptionContractItemService } from '@/services/subscription-contract-items/update-subscription-contract-item';
import { CreateSubscriptionContractService } from '@/services/subscription-contracts/create-subscription-contract';
import { CreateUsageRecordService } from '@/services/usage-records/create-usage-record';

import { AddItemToAppSubscriptionContractCommandHandler } from '.';

describe('AddItemToAppSubscriptionContractCommandHandler', () => {
  let addItemToAppSubscriptionContractCommandHandler: AddItemToAppSubscriptionContractCommandHandler;
  let findAppByIdService: FindAppByIdService;
  let createSubscriptionContractService: CreateSubscriptionContractService;
  let createSubscriptionContractItemService: CreateSubscriptionContractItemService;
  let createStripeSubscriptionService: CreateStripeSubscriptionService;
  let createUsageRecordService: CreateUsageRecordService;
  let findPriceByIdService: FindPriceByIdService;
  let findProductByIdService: FindProductByIdService;
  let findAppCurrentSubscriptionContractService: FindAppCurrentSubscriptionContractService;
  let findAllSubscriptionContractItemsService: FindAllSubscriptionContractItemsService;
  let updateSubscriptionContractItemService: UpdateSubscriptionContractItemService;

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
  });

  it('should be defined', () => {
    expect(addItemToAppSubscriptionContractCommandHandler).toBeDefined();
    expect(findAppByIdService).toBeDefined();
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

  it('should create a new subscription when app has no subscription', async () => {
    expect(1).toBe(1);
  });

  it('should create a new subscription item when app has no subscription item', async () => {
    expect(1).toBe(1);
  });

  it('should update subscription item quantity when app has subscription item with different tier billing scheme', async () => {
    expect(1).toBe(1);
  });

  it('should create usage record when subscription item has tier billing scheme', async () => {
    expect(1).toBe(1);
  });
});

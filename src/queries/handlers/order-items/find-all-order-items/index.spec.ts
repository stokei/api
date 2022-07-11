import { Test } from '@nestjs/testing';

import { CountOrderItemsRepository } from '@/repositories/order-items/count-order-items';
import { FindAllOrderItemsRepository } from '@/repositories/order-items/find-all-order-items';

import { FindAllOrderItemsQueryHandler } from '.';

describe('FindAllOrderItemsQueryHandler', () => {
  let findAllOrderItemsRepository: FindAllOrderItemsRepository;
  let findAllOrderItemsQueryHandler: FindAllOrderItemsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllOrderItemsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountOrderItemsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllOrderItemsQueryHandler
      ]
    }).compile();

    findAllOrderItemsRepository = moduleRef.get(FindAllOrderItemsRepository);
    findAllOrderItemsQueryHandler = moduleRef.get(
      FindAllOrderItemsQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllOrderItemsQueryHandler).toBeDefined();
    expect(findAllOrderItemsRepository).toBeDefined();
  });
});

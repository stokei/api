import { Test } from '@nestjs/testing';

import { CountOrdersItemsRepository } from '@/repositories/orders-items/count-orders-items';
import { FindAllOrdersItemsRepository } from '@/repositories/orders-items/find-all-orders-items';

import { FindAllOrdersItemsQueryHandler } from '.';

describe('FindAllOrdersItemsQueryHandler', () => {
  let findAllOrdersItemsRepository: FindAllOrdersItemsRepository;
  let findAllOrdersItemsQueryHandler: FindAllOrdersItemsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllOrdersItemsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountOrdersItemsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllOrdersItemsQueryHandler
      ]
    }).compile();

    findAllOrdersItemsRepository = moduleRef.get(FindAllOrdersItemsRepository);
    findAllOrdersItemsQueryHandler = moduleRef.get(
      FindAllOrdersItemsQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllOrdersItemsQueryHandler).toBeDefined();
    expect(findAllOrdersItemsRepository).toBeDefined();
  });
});

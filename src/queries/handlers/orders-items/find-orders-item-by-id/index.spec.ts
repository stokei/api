import { Test } from '@nestjs/testing';

import { FindOrdersItemByIdRepository } from '@/repositories/orders-items/find-orders-item-by-id';

import { FindOrdersItemByIdQueryHandler } from '.';

describe('FindOrdersItemByIdQueryHandler', () => {
  let findOrdersItemByIdRepository: FindOrdersItemByIdRepository;
  let findOrdersItemByIdQueryHandler: FindOrdersItemByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindOrdersItemByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindOrdersItemByIdQueryHandler
      ]
    }).compile();

    findOrdersItemByIdRepository = moduleRef.get(FindOrdersItemByIdRepository);
    findOrdersItemByIdQueryHandler = moduleRef.get(
      FindOrdersItemByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findOrdersItemByIdQueryHandler).toBeDefined();
    expect(findOrdersItemByIdRepository).toBeDefined();
  });
});

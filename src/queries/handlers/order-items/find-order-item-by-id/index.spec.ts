import { Test } from '@nestjs/testing';

import { FindOrderItemByIdRepository } from '@/repositories/order-items/find-order-item-by-id';

import { FindOrderItemByIdQueryHandler } from '.';

describe('FindOrderItemByIdQueryHandler', () => {
  let findOrderItemByIdRepository: FindOrderItemByIdRepository;
  let findOrderItemByIdQueryHandler: FindOrderItemByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindOrderItemByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindOrderItemByIdQueryHandler
      ]
    }).compile();

    findOrderItemByIdRepository = moduleRef.get(FindOrderItemByIdRepository);
    findOrderItemByIdQueryHandler = moduleRef.get(
      FindOrderItemByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findOrderItemByIdQueryHandler).toBeDefined();
    expect(findOrderItemByIdRepository).toBeDefined();
  });
});

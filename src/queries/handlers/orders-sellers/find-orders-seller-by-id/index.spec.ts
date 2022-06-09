import { Test } from '@nestjs/testing';

import { FindOrdersSellerByIdRepository } from '@/repositories/orders-sellers/find-orders-seller-by-id';

import { FindOrdersSellerByIdQueryHandler } from '.';

describe('FindOrdersSellerByIdQueryHandler', () => {
  let findOrdersSellerByIdRepository: FindOrdersSellerByIdRepository;
  let findOrdersSellerByIdQueryHandler: FindOrdersSellerByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindOrdersSellerByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindOrdersSellerByIdQueryHandler
      ]
    }).compile();

    findOrdersSellerByIdRepository = moduleRef.get(
      FindOrdersSellerByIdRepository
    );
    findOrdersSellerByIdQueryHandler = moduleRef.get(
      FindOrdersSellerByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findOrdersSellerByIdQueryHandler).toBeDefined();
    expect(findOrdersSellerByIdRepository).toBeDefined();
  });
});

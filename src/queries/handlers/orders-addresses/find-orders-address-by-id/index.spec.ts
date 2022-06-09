import { Test } from '@nestjs/testing';

import { FindOrdersAddressByIdRepository } from '@/repositories/orders-addresses/find-orders-address-by-id';

import { FindOrdersAddressByIdQueryHandler } from '.';

describe('FindOrdersAddressByIdQueryHandler', () => {
  let findOrdersAddressByIdRepository: FindOrdersAddressByIdRepository;
  let findOrdersAddressByIdQueryHandler: FindOrdersAddressByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindOrdersAddressByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindOrdersAddressByIdQueryHandler
      ]
    }).compile();

    findOrdersAddressByIdRepository = moduleRef.get(
      FindOrdersAddressByIdRepository
    );
    findOrdersAddressByIdQueryHandler = moduleRef.get(
      FindOrdersAddressByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findOrdersAddressByIdQueryHandler).toBeDefined();
    expect(findOrdersAddressByIdRepository).toBeDefined();
  });
});

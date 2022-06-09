import { Test } from '@nestjs/testing';

import { CountOrdersAddressesRepository } from '@/repositories/orders-addresses/count-orders-addresses';
import { FindAllOrdersAddressesRepository } from '@/repositories/orders-addresses/find-all-orders-addresses';

import { FindAllOrdersAddressesQueryHandler } from '.';

describe('FindAllOrdersAddressesQueryHandler', () => {
  let findAllOrdersAddressesRepository: FindAllOrdersAddressesRepository;
  let findAllOrdersAddressesQueryHandler: FindAllOrdersAddressesQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllOrdersAddressesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountOrdersAddressesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllOrdersAddressesQueryHandler
      ]
    }).compile();

    findAllOrdersAddressesRepository = moduleRef.get(
      FindAllOrdersAddressesRepository
    );
    findAllOrdersAddressesQueryHandler = moduleRef.get(
      FindAllOrdersAddressesQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllOrdersAddressesQueryHandler).toBeDefined();
    expect(findAllOrdersAddressesRepository).toBeDefined();
  });
});

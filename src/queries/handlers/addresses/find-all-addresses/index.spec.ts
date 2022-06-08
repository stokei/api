import { CountAddressesRepository } from '@/repositories/addresses/count-addresses';
import { FindAllAddressesRepository } from '@/repositories/addresses/find-all-addresses';
import { Test } from '@nestjs/testing';
import { FindAllAddressesQueryHandler } from '.';

describe('FindAllAddressesQueryHandler', () => {
  let findAllAddressesRepository: FindAllAddressesRepository;
  let findAllAddressesQueryHandler: FindAllAddressesQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllAddressesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountAddressesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllAddressesQueryHandler
      ]
    }).compile();

    findAllAddressesRepository = moduleRef.get(FindAllAddressesRepository);
    findAllAddressesQueryHandler = moduleRef.get(FindAllAddressesQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllAddressesQueryHandler).toBeDefined();
    expect(findAllAddressesRepository).toBeDefined();
  });
});

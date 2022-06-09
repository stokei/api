import { Test } from '@nestjs/testing';

import { FindAddressByIdRepository } from '@/repositories/addresses/find-address-by-id';

import { FindAddressByIdQueryHandler } from '.';

describe('FindAddressByIdQueryHandler', () => {
  let findAddressByIdRepository: FindAddressByIdRepository;
  let findAddressByIdQueryHandler: FindAddressByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAddressByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAddressByIdQueryHandler
      ]
    }).compile();

    findAddressByIdRepository = moduleRef.get(FindAddressByIdRepository);
    findAddressByIdQueryHandler = moduleRef.get(FindAddressByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAddressByIdQueryHandler).toBeDefined();
    expect(findAddressByIdRepository).toBeDefined();
  });
});

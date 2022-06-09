import { Test } from '@nestjs/testing';

import { FindCardByIdRepository } from '@/repositories/cards/find-card-by-id';

import { FindCardByIdQueryHandler } from '.';

describe('FindCardByIdQueryHandler', () => {
  let findCardByIdRepository: FindCardByIdRepository;
  let findCardByIdQueryHandler: FindCardByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindCardByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindCardByIdQueryHandler
      ]
    }).compile();

    findCardByIdRepository = moduleRef.get(FindCardByIdRepository);
    findCardByIdQueryHandler = moduleRef.get(FindCardByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findCardByIdQueryHandler).toBeDefined();
    expect(findCardByIdRepository).toBeDefined();
  });
});

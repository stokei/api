import { Test } from '@nestjs/testing';

import { FindAppByIdRepository } from '@/repositories/apps/find-app-by-id';

import { FindAppByIdQueryHandler } from '.';

describe('FindAppByIdQueryHandler', () => {
  let findAppByIdRepository: FindAppByIdRepository;
  let findAppByIdQueryHandler: FindAppByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAppByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAppByIdQueryHandler
      ]
    }).compile();

    findAppByIdRepository = moduleRef.get(FindAppByIdRepository);
    findAppByIdQueryHandler = moduleRef.get(FindAppByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAppByIdQueryHandler).toBeDefined();
    expect(findAppByIdRepository).toBeDefined();
  });
});

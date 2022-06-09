import { Test } from '@nestjs/testing';

import { FindPageByIdRepository } from '@/repositories/pages/find-page-by-id';

import { FindPageByIdQueryHandler } from '.';

describe('FindPageByIdQueryHandler', () => {
  let findPageByIdRepository: FindPageByIdRepository;
  let findPageByIdQueryHandler: FindPageByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindPageByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindPageByIdQueryHandler
      ]
    }).compile();

    findPageByIdRepository = moduleRef.get(FindPageByIdRepository);
    findPageByIdQueryHandler = moduleRef.get(FindPageByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findPageByIdQueryHandler).toBeDefined();
    expect(findPageByIdRepository).toBeDefined();
  });
});

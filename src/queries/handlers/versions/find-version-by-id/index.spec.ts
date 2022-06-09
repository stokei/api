import { Test } from '@nestjs/testing';

import { FindVersionByIdRepository } from '@/repositories/versions/find-version-by-id';

import { FindVersionByIdQueryHandler } from '.';

describe('FindVersionByIdQueryHandler', () => {
  let findVersionByIdRepository: FindVersionByIdRepository;
  let findVersionByIdQueryHandler: FindVersionByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindVersionByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindVersionByIdQueryHandler
      ]
    }).compile();

    findVersionByIdRepository = moduleRef.get(FindVersionByIdRepository);
    findVersionByIdQueryHandler = moduleRef.get(FindVersionByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findVersionByIdQueryHandler).toBeDefined();
    expect(findVersionByIdRepository).toBeDefined();
  });
});

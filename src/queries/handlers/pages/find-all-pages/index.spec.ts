import { Test } from '@nestjs/testing';

import { CountPagesRepository } from '@/repositories/pages/count-pages';
import { FindAllPagesRepository } from '@/repositories/pages/find-all-pages';

import { FindAllPagesQueryHandler } from '.';

describe('FindAllPagesQueryHandler', () => {
  let findAllPagesRepository: FindAllPagesRepository;
  let findAllPagesQueryHandler: FindAllPagesQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllPagesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountPagesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllPagesQueryHandler
      ]
    }).compile();

    findAllPagesRepository = moduleRef.get(FindAllPagesRepository);
    findAllPagesQueryHandler = moduleRef.get(FindAllPagesQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllPagesQueryHandler).toBeDefined();
    expect(findAllPagesRepository).toBeDefined();
  });
});

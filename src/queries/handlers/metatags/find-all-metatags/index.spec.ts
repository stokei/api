import { Test } from '@nestjs/testing';

import { CountMetatagsRepository } from '@/repositories/metatags/count-metatags';
import { FindAllMetatagsRepository } from '@/repositories/metatags/find-all-metatags';

import { FindAllMetatagsQueryHandler } from '.';

describe('FindAllMetatagsQueryHandler', () => {
  let findAllMetatagsRepository: FindAllMetatagsRepository;
  let findAllMetatagsQueryHandler: FindAllMetatagsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllMetatagsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountMetatagsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllMetatagsQueryHandler
      ]
    }).compile();

    findAllMetatagsRepository = moduleRef.get(FindAllMetatagsRepository);
    findAllMetatagsQueryHandler = moduleRef.get(FindAllMetatagsQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllMetatagsQueryHandler).toBeDefined();
    expect(findAllMetatagsRepository).toBeDefined();
  });
});

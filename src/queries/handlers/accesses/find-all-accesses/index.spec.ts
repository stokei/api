import { Test } from '@nestjs/testing';

import { CountAccessesRepository } from '@/repositories/accesses/count-accesses';
import { FindAllAccessesRepository } from '@/repositories/accesses/find-all-accesses';

import { FindAllAccessesQueryHandler } from '.';

describe('FindAllAccessesQueryHandler', () => {
  let findAllAccessesRepository: FindAllAccessesRepository;
  let findAllAccessesQueryHandler: FindAllAccessesQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllAccessesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountAccessesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllAccessesQueryHandler
      ]
    }).compile();

    findAllAccessesRepository = moduleRef.get(FindAllAccessesRepository);
    findAllAccessesQueryHandler = moduleRef.get(FindAllAccessesQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllAccessesQueryHandler).toBeDefined();
    expect(findAllAccessesRepository).toBeDefined();
  });
});

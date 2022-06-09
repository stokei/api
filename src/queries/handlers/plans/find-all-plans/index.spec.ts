import { Test } from '@nestjs/testing';

import { CountPlansRepository } from '@/repositories/plans/count-plans';
import { FindAllPlansRepository } from '@/repositories/plans/find-all-plans';

import { FindAllPlansQueryHandler } from '.';

describe('FindAllPlansQueryHandler', () => {
  let findAllPlansRepository: FindAllPlansRepository;
  let findAllPlansQueryHandler: FindAllPlansQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllPlansRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountPlansRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllPlansQueryHandler
      ]
    }).compile();

    findAllPlansRepository = moduleRef.get(FindAllPlansRepository);
    findAllPlansQueryHandler = moduleRef.get(FindAllPlansQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllPlansQueryHandler).toBeDefined();
    expect(findAllPlansRepository).toBeDefined();
  });
});

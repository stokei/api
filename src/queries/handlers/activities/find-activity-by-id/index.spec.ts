import { Test } from '@nestjs/testing';

import { FindActivityByIdRepository } from '@/repositories/activities/find-activity-by-id';

import { FindActivityByIdQueryHandler } from '.';

describe('FindActivityByIdQueryHandler', () => {
  let findActivityByIdRepository: FindActivityByIdRepository;
  let findActivityByIdQueryHandler: FindActivityByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindActivityByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindActivityByIdQueryHandler
      ]
    }).compile();

    findActivityByIdRepository = moduleRef.get(FindActivityByIdRepository);
    findActivityByIdQueryHandler = moduleRef.get(FindActivityByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findActivityByIdQueryHandler).toBeDefined();
    expect(findActivityByIdRepository).toBeDefined();
  });
});

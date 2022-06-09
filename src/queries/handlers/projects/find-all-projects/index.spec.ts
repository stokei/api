import { Test } from '@nestjs/testing';

import { CountProjectsRepository } from '@/repositories/projects/count-projects';
import { FindAllProjectsRepository } from '@/repositories/projects/find-all-projects';

import { FindAllProjectsQueryHandler } from '.';

describe('FindAllProjectsQueryHandler', () => {
  let findAllProjectsRepository: FindAllProjectsRepository;
  let findAllProjectsQueryHandler: FindAllProjectsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllProjectsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountProjectsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllProjectsQueryHandler
      ]
    }).compile();

    findAllProjectsRepository = moduleRef.get(FindAllProjectsRepository);
    findAllProjectsQueryHandler = moduleRef.get(FindAllProjectsQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllProjectsQueryHandler).toBeDefined();
    expect(findAllProjectsRepository).toBeDefined();
  });
});

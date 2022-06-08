import { FindProjectByIdRepository } from '@/repositories/projects/find-project-by-id';
import { Test } from '@nestjs/testing';
import { FindProjectByIdQueryHandler } from '.';

describe('FindProjectByIdQueryHandler', () => {
  let findProjectByIdRepository: FindProjectByIdRepository;
  let findProjectByIdQueryHandler: FindProjectByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindProjectByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindProjectByIdQueryHandler
      ]
    }).compile();

    findProjectByIdRepository = moduleRef.get(FindProjectByIdRepository);
    findProjectByIdQueryHandler = moduleRef.get(FindProjectByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findProjectByIdQueryHandler).toBeDefined();
    expect(findProjectByIdRepository).toBeDefined();
  });
});

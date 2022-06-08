import { FindAccessByIdRepository } from '@/repositories/accesses/find-access-by-id';
import { Test } from '@nestjs/testing';
import { FindAccessByIdQueryHandler } from '.';

describe('FindAccessByIdQueryHandler', () => {
  let findAccessByIdRepository: FindAccessByIdRepository;
  let findAccessByIdQueryHandler: FindAccessByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAccessByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAccessByIdQueryHandler
      ]
    }).compile();

    findAccessByIdRepository = moduleRef.get(FindAccessByIdRepository);
    findAccessByIdQueryHandler = moduleRef.get(FindAccessByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAccessByIdQueryHandler).toBeDefined();
    expect(findAccessByIdRepository).toBeDefined();
  });
});

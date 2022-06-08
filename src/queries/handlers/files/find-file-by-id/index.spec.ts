import { FindFileByIdRepository } from '@/repositories/files/find-file-by-id';
import { Test } from '@nestjs/testing';
import { FindFileByIdQueryHandler } from '.';

describe('FindFileByIdQueryHandler', () => {
  let findFileByIdRepository: FindFileByIdRepository;
  let findFileByIdQueryHandler: FindFileByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindFileByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindFileByIdQueryHandler
      ]
    }).compile();

    findFileByIdRepository = moduleRef.get(FindFileByIdRepository);
    findFileByIdQueryHandler = moduleRef.get(FindFileByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findFileByIdQueryHandler).toBeDefined();
    expect(findFileByIdRepository).toBeDefined();
  });
});

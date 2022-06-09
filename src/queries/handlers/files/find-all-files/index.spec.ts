import { Test } from '@nestjs/testing';

import { CountFilesRepository } from '@/repositories/files/count-files';
import { FindAllFilesRepository } from '@/repositories/files/find-all-files';

import { FindAllFilesQueryHandler } from '.';

describe('FindAllFilesQueryHandler', () => {
  let findAllFilesRepository: FindAllFilesRepository;
  let findAllFilesQueryHandler: FindAllFilesQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllFilesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountFilesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllFilesQueryHandler
      ]
    }).compile();

    findAllFilesRepository = moduleRef.get(FindAllFilesRepository);
    findAllFilesQueryHandler = moduleRef.get(FindAllFilesQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllFilesQueryHandler).toBeDefined();
    expect(findAllFilesRepository).toBeDefined();
  });
});

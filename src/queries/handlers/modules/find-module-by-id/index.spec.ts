import { Test } from '@nestjs/testing';

import { FindModuleByIdRepository } from '@/repositories/modules/find-module-by-id';

import { FindModuleByIdQueryHandler } from '.';

describe('FindModuleByIdQueryHandler', () => {
  let findModuleByIdRepository: FindModuleByIdRepository;
  let findModuleByIdQueryHandler: FindModuleByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindModuleByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindModuleByIdQueryHandler
      ]
    }).compile();

    findModuleByIdRepository = moduleRef.get(FindModuleByIdRepository);
    findModuleByIdQueryHandler = moduleRef.get(FindModuleByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findModuleByIdQueryHandler).toBeDefined();
    expect(findModuleByIdRepository).toBeDefined();
  });
});

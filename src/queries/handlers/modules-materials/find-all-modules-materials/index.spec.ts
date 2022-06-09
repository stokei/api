import { Test } from '@nestjs/testing';

import { CountModulesMaterialsRepository } from '@/repositories/modules-materials/count-modules-materials';
import { FindAllModulesMaterialsRepository } from '@/repositories/modules-materials/find-all-modules-materials';

import { FindAllModulesMaterialsQueryHandler } from '.';

describe('FindAllModulesMaterialsQueryHandler', () => {
  let findAllModulesMaterialsRepository: FindAllModulesMaterialsRepository;
  let findAllModulesMaterialsQueryHandler: FindAllModulesMaterialsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllModulesMaterialsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountModulesMaterialsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllModulesMaterialsQueryHandler
      ]
    }).compile();

    findAllModulesMaterialsRepository = moduleRef.get(
      FindAllModulesMaterialsRepository
    );
    findAllModulesMaterialsQueryHandler = moduleRef.get(
      FindAllModulesMaterialsQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllModulesMaterialsQueryHandler).toBeDefined();
    expect(findAllModulesMaterialsRepository).toBeDefined();
  });
});

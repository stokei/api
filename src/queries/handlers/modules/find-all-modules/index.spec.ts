import { Test } from '@nestjs/testing';

import { CountModulesRepository } from '@/repositories/modules/count-modules';
import { FindAllModulesRepository } from '@/repositories/modules/find-all-modules';

import { FindAllModulesQueryHandler } from '.';

describe('FindAllModulesQueryHandler', () => {
  let findAllModulesRepository: FindAllModulesRepository;
  let findAllModulesQueryHandler: FindAllModulesQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllModulesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountModulesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllModulesQueryHandler
      ]
    }).compile();

    findAllModulesRepository = moduleRef.get(FindAllModulesRepository);
    findAllModulesQueryHandler = moduleRef.get(FindAllModulesQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllModulesQueryHandler).toBeDefined();
    expect(findAllModulesRepository).toBeDefined();
  });
});

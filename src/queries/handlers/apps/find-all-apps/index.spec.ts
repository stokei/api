import { Test } from '@nestjs/testing';

import { CountAppsRepository } from '@/repositories/apps/count-apps';
import { FindAllAppsRepository } from '@/repositories/apps/find-all-apps';

import { FindAllAppsQueryHandler } from '.';

describe('FindAllAppsQueryHandler', () => {
  let findAllAppsRepository: FindAllAppsRepository;
  let findAllAppsQueryHandler: FindAllAppsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllAppsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountAppsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllAppsQueryHandler
      ]
    }).compile();

    findAllAppsRepository = moduleRef.get(FindAllAppsRepository);
    findAllAppsQueryHandler = moduleRef.get(FindAllAppsQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllAppsQueryHandler).toBeDefined();
    expect(findAllAppsRepository).toBeDefined();
  });
});

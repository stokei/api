import { Test } from '@nestjs/testing';

import { CountSitesRepository } from '@/repositories/sites/count-sites';
import { FindAllSitesRepository } from '@/repositories/sites/find-all-sites';

import { FindAllSitesQueryHandler } from '.';

describe('FindAllSitesQueryHandler', () => {
  let findAllSitesRepository: FindAllSitesRepository;
  let findAllSitesQueryHandler: FindAllSitesQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllSitesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountSitesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllSitesQueryHandler
      ]
    }).compile();

    findAllSitesRepository = moduleRef.get(FindAllSitesRepository);
    findAllSitesQueryHandler = moduleRef.get(FindAllSitesQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllSitesQueryHandler).toBeDefined();
    expect(findAllSitesRepository).toBeDefined();
  });
});

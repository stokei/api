import { Test } from '@nestjs/testing';

import { FindSitesDarkColorByIdRepository } from '@/repositories/sites-dark-colors/find-sites-dark-color-by-id';

import { FindSitesDarkColorByIdQueryHandler } from '.';

describe('FindSitesDarkColorByIdQueryHandler', () => {
  let findSitesDarkColorByIdRepository: FindSitesDarkColorByIdRepository;
  let findSitesDarkColorByIdQueryHandler: FindSitesDarkColorByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindSitesDarkColorByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindSitesDarkColorByIdQueryHandler
      ]
    }).compile();

    findSitesDarkColorByIdRepository = moduleRef.get(
      FindSitesDarkColorByIdRepository
    );
    findSitesDarkColorByIdQueryHandler = moduleRef.get(
      FindSitesDarkColorByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findSitesDarkColorByIdQueryHandler).toBeDefined();
    expect(findSitesDarkColorByIdRepository).toBeDefined();
  });
});

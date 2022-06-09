import { Test } from '@nestjs/testing';

import { CountSitesDarkColorsRepository } from '@/repositories/sites-dark-colors/count-sites-dark-colors';
import { FindAllSitesDarkColorsRepository } from '@/repositories/sites-dark-colors/find-all-sites-dark-colors';

import { FindAllSitesDarkColorsQueryHandler } from '.';

describe('FindAllSitesDarkColorsQueryHandler', () => {
  let findAllSitesDarkColorsRepository: FindAllSitesDarkColorsRepository;
  let findAllSitesDarkColorsQueryHandler: FindAllSitesDarkColorsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllSitesDarkColorsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountSitesDarkColorsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllSitesDarkColorsQueryHandler
      ]
    }).compile();

    findAllSitesDarkColorsRepository = moduleRef.get(
      FindAllSitesDarkColorsRepository
    );
    findAllSitesDarkColorsQueryHandler = moduleRef.get(
      FindAllSitesDarkColorsQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllSitesDarkColorsQueryHandler).toBeDefined();
    expect(findAllSitesDarkColorsRepository).toBeDefined();
  });
});

import { CountSitesLightColorsRepository } from '@/repositories/sites-light-colors/count-sites-light-colors';
import { FindAllSitesLightColorsRepository } from '@/repositories/sites-light-colors/find-all-sites-light-colors';
import { Test } from '@nestjs/testing';
import { FindAllSitesLightColorsQueryHandler } from '.';

describe('FindAllSitesLightColorsQueryHandler', () => {
  let findAllSitesLightColorsRepository: FindAllSitesLightColorsRepository;
  let findAllSitesLightColorsQueryHandler: FindAllSitesLightColorsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllSitesLightColorsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountSitesLightColorsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllSitesLightColorsQueryHandler
      ]
    }).compile();

    findAllSitesLightColorsRepository = moduleRef.get(
      FindAllSitesLightColorsRepository
    );
    findAllSitesLightColorsQueryHandler = moduleRef.get(
      FindAllSitesLightColorsQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllSitesLightColorsQueryHandler).toBeDefined();
    expect(findAllSitesLightColorsRepository).toBeDefined();
  });
});

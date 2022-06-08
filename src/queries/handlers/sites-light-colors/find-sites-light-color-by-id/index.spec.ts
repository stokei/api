import { FindSitesLightColorByIdRepository } from '@/repositories/sites-light-colors/find-sites-light-color-by-id';
import { Test } from '@nestjs/testing';
import { FindSitesLightColorByIdQueryHandler } from '.';

describe('FindSitesLightColorByIdQueryHandler', () => {
  let findSitesLightColorByIdRepository: FindSitesLightColorByIdRepository;
  let findSitesLightColorByIdQueryHandler: FindSitesLightColorByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindSitesLightColorByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindSitesLightColorByIdQueryHandler
      ]
    }).compile();

    findSitesLightColorByIdRepository = moduleRef.get(
      FindSitesLightColorByIdRepository
    );
    findSitesLightColorByIdQueryHandler = moduleRef.get(
      FindSitesLightColorByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findSitesLightColorByIdQueryHandler).toBeDefined();
    expect(findSitesLightColorByIdRepository).toBeDefined();
  });
});

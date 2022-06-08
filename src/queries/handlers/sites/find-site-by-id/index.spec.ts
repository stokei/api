import { FindSiteByIdRepository } from '@/repositories/sites/find-site-by-id';
import { Test } from '@nestjs/testing';
import { FindSiteByIdQueryHandler } from '.';

describe('FindSiteByIdQueryHandler', () => {
  let findSiteByIdRepository: FindSiteByIdRepository;
  let findSiteByIdQueryHandler: FindSiteByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindSiteByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindSiteByIdQueryHandler
      ]
    }).compile();

    findSiteByIdRepository = moduleRef.get(FindSiteByIdRepository);
    findSiteByIdQueryHandler = moduleRef.get(FindSiteByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findSiteByIdQueryHandler).toBeDefined();
    expect(findSiteByIdRepository).toBeDefined();
  });
});

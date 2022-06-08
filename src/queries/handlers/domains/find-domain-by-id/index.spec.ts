import { FindDomainByIdRepository } from '@/repositories/domains/find-domain-by-id';
import { Test } from '@nestjs/testing';
import { FindDomainByIdQueryHandler } from '.';

describe('FindDomainByIdQueryHandler', () => {
  let findDomainByIdRepository: FindDomainByIdRepository;
  let findDomainByIdQueryHandler: FindDomainByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindDomainByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindDomainByIdQueryHandler
      ]
    }).compile();

    findDomainByIdRepository = moduleRef.get(FindDomainByIdRepository);
    findDomainByIdQueryHandler = moduleRef.get(FindDomainByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findDomainByIdQueryHandler).toBeDefined();
    expect(findDomainByIdRepository).toBeDefined();
  });
});

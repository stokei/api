import { Test } from '@nestjs/testing';

import { CountDomainsRepository } from '@/repositories/domains/count-domains';
import { FindAllDomainsRepository } from '@/repositories/domains/find-all-domains';

import { FindAllDomainsQueryHandler } from '.';

describe('FindAllDomainsQueryHandler', () => {
  let findAllDomainsRepository: FindAllDomainsRepository;
  let findAllDomainsQueryHandler: FindAllDomainsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllDomainsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountDomainsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllDomainsQueryHandler
      ]
    }).compile();

    findAllDomainsRepository = moduleRef.get(FindAllDomainsRepository);
    findAllDomainsQueryHandler = moduleRef.get(FindAllDomainsQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllDomainsQueryHandler).toBeDefined();
    expect(findAllDomainsRepository).toBeDefined();
  });
});

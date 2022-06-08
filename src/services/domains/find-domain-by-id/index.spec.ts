import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindDomainByIdService } from '.';

describe('FindDomainByIdService', () => {
  let findDomainByIdService: FindDomainByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindDomainByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findDomainByIdService = modRef.get(FindDomainByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findDomainByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});

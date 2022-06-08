import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllAddressesService } from '.';

describe('FindAllAddressesService', () => {
  let findAllAddressesService: FindAllAddressesService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllAddressesService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllAddressesService = modRef.get(FindAllAddressesService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllAddressesService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});

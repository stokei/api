import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindPhoneByIdService } from '.';

describe('FindPhoneByIdService', () => {
  let findPhoneByIdService: FindPhoneByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindPhoneByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findPhoneByIdService = modRef.get(FindPhoneByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findPhoneByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});

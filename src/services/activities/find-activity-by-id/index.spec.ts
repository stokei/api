import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindActivityByIdService } from '.';

describe('FindActivityByIdService', () => {
  let findActivityByIdService: FindActivityByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindActivityByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findActivityByIdService = modRef.get(FindActivityByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findActivityByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});

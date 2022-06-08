import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllPlansService } from '.';

describe('FindAllPlansService', () => {
  let findAllPlansService: FindAllPlansService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllPlansService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllPlansService = modRef.get(FindAllPlansService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllPlansService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});

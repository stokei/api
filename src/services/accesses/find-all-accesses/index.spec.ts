import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllAccessesService } from '.';

describe('FindAllAccessesService', () => {
  let findAllAccessesService: FindAllAccessesService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllAccessesService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllAccessesService = modRef.get(FindAllAccessesService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllAccessesService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});

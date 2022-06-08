import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllVersionsService } from '.';

describe('FindAllVersionsService', () => {
  let findAllVersionsService: FindAllVersionsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllVersionsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllVersionsService = modRef.get(FindAllVersionsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllVersionsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});

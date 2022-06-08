import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllTagsService } from '.';

describe('FindAllTagsService', () => {
  let findAllTagsService: FindAllTagsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllTagsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllTagsService = modRef.get(FindAllTagsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllTagsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});

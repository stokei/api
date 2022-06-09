import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllVideosTagsService } from '.';

describe('FindAllVideosTagsService', () => {
  let findAllVideosTagsService: FindAllVideosTagsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllVideosTagsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllVideosTagsService = modRef.get(FindAllVideosTagsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllVideosTagsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});

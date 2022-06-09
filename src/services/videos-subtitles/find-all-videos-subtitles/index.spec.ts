import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllVideosSubtitlesService } from '.';

describe('FindAllVideosSubtitlesService', () => {
  let findAllVideosSubtitlesService: FindAllVideosSubtitlesService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllVideosSubtitlesService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllVideosSubtitlesService = modRef.get(FindAllVideosSubtitlesService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllVideosSubtitlesService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});

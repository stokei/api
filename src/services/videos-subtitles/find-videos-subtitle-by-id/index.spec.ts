import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindVideosSubtitleByIdService } from '.';

describe('FindVideosSubtitleByIdService', () => {
  let findVideosSubtitleByIdService: FindVideosSubtitleByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindVideosSubtitleByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findVideosSubtitleByIdService = modRef.get(FindVideosSubtitleByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findVideosSubtitleByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});

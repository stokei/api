import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindVideosTagByIdService } from '.';

describe('FindVideosTagByIdService', () => {
  let findVideosTagByIdService: FindVideosTagByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindVideosTagByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findVideosTagByIdService = modRef.get(FindVideosTagByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findVideosTagByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});

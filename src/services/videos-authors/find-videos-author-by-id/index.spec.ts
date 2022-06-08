import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindVideosAuthorByIdService } from '.';

describe('FindVideosAuthorByIdService', () => {
  let findVideosAuthorByIdService: FindVideosAuthorByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindVideosAuthorByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findVideosAuthorByIdService = modRef.get(FindVideosAuthorByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findVideosAuthorByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});

import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllVideosService } from '.';

describe('FindAllVideosService', () => {
  let findAllVideosService: FindAllVideosService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllVideosService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllVideosService = modRef.get(FindAllVideosService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllVideosService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});

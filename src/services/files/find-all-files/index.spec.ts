import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllFilesService } from '.';

describe('FindAllFilesService', () => {
  let findAllFilesService: FindAllFilesService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllFilesService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllFilesService = modRef.get(FindAllFilesService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllFilesService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});

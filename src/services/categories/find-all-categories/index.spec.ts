import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllCategoriesService } from '.';

describe('FindAllCategoriesService', () => {
  let findAllCategoriesService: FindAllCategoriesService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllCategoriesService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllCategoriesService = modRef.get(FindAllCategoriesService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllCategoriesService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});

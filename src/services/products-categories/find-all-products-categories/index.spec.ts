import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllProductsCategoriesService } from '.';

describe('FindAllProductsCategoriesService', () => {
  let findAllProductsCategoriesService: FindAllProductsCategoriesService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllProductsCategoriesService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllProductsCategoriesService = modRef.get(
      FindAllProductsCategoriesService
    );
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllProductsCategoriesService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});

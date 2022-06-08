import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllCoursesService } from '.';

describe('FindAllCoursesService', () => {
  let findAllCoursesService: FindAllCoursesService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllCoursesService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllCoursesService = modRef.get(FindAllCoursesService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllCoursesService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});

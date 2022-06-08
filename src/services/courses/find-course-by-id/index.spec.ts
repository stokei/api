import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindCourseByIdService } from '.';

describe('FindCourseByIdService', () => {
  let findCourseByIdService: FindCourseByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindCourseByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findCourseByIdService = modRef.get(FindCourseByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findCourseByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});

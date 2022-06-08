import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindCoursesAdminByIdService } from '.';

describe('FindCoursesAdminByIdService', () => {
  let findCoursesAdminByIdService: FindCoursesAdminByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindCoursesAdminByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findCoursesAdminByIdService = modRef.get(FindCoursesAdminByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findCoursesAdminByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});

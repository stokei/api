import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindClassroomsPlanByIdService } from '.';

describe('FindClassroomsPlanByIdService', () => {
  let findClassroomsPlanByIdService: FindClassroomsPlanByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindClassroomsPlanByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findClassroomsPlanByIdService = modRef.get(FindClassroomsPlanByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findClassroomsPlanByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});

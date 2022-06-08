import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllClassroomsPlansService } from '.';

describe('FindAllClassroomsPlansService', () => {
  let findAllClassroomsPlansService: FindAllClassroomsPlansService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllClassroomsPlansService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllClassroomsPlansService = modRef.get(FindAllClassroomsPlansService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllClassroomsPlansService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});

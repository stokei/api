import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllClassroomsEnrollmentsService } from '.';

describe('FindAllClassroomsEnrollmentsService', () => {
  let findAllClassroomsEnrollmentsService: FindAllClassroomsEnrollmentsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllClassroomsEnrollmentsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllClassroomsEnrollmentsService = modRef.get(
      FindAllClassroomsEnrollmentsService
    );
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllClassroomsEnrollmentsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});

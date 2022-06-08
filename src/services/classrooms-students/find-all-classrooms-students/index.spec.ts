import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllClassroomsStudentsService } from '.';

describe('FindAllClassroomsStudentsService', () => {
  let findAllClassroomsStudentsService: FindAllClassroomsStudentsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllClassroomsStudentsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllClassroomsStudentsService = modRef.get(
      FindAllClassroomsStudentsService
    );
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllClassroomsStudentsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});

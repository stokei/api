import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllClassroomsInstructorsService } from '.';

describe('FindAllClassroomsInstructorsService', () => {
  let findAllClassroomsInstructorsService: FindAllClassroomsInstructorsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllClassroomsInstructorsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllClassroomsInstructorsService = modRef.get(
      FindAllClassroomsInstructorsService
    );
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllClassroomsInstructorsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});

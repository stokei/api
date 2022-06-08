import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllClassroomsService } from '.';

describe('FindAllClassroomsService', () => {
  let findAllClassroomsService: FindAllClassroomsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllClassroomsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllClassroomsService = modRef.get(FindAllClassroomsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllClassroomsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});

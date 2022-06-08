import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllClassroomsMaterialsService } from '.';

describe('FindAllClassroomsMaterialsService', () => {
  let findAllClassroomsMaterialsService: FindAllClassroomsMaterialsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllClassroomsMaterialsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllClassroomsMaterialsService = modRef.get(
      FindAllClassroomsMaterialsService
    );
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllClassroomsMaterialsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});

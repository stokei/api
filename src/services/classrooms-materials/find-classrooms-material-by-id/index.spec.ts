import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindClassroomsMaterialByIdService } from '.';

describe('FindClassroomsMaterialByIdService', () => {
  let findClassroomsMaterialByIdService: FindClassroomsMaterialByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindClassroomsMaterialByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findClassroomsMaterialByIdService = modRef.get(
      FindClassroomsMaterialByIdService
    );
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findClassroomsMaterialByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});

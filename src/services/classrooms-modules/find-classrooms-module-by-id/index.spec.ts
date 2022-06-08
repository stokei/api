import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindClassroomsModuleByIdService } from '.';

describe('FindClassroomsModuleByIdService', () => {
  let findClassroomsModuleByIdService: FindClassroomsModuleByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindClassroomsModuleByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findClassroomsModuleByIdService = modRef.get(
      FindClassroomsModuleByIdService
    );
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findClassroomsModuleByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});

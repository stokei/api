import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllClassroomsModulesService } from '.';

describe('FindAllClassroomsModulesService', () => {
  let findAllClassroomsModulesService: FindAllClassroomsModulesService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllClassroomsModulesService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllClassroomsModulesService = modRef.get(
      FindAllClassroomsModulesService
    );
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllClassroomsModulesService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});

import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindModulesVideoByIdService } from '.';

describe('FindModulesVideoByIdService', () => {
  let findModulesVideoByIdService: FindModulesVideoByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindModulesVideoByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findModulesVideoByIdService = modRef.get(FindModulesVideoByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findModulesVideoByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});

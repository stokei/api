import { Test } from '@nestjs/testing';

import { CountClassroomModulesRepository } from '@/repositories/classroom-modules/count-classroom-modules';
import { FindAllClassroomModulesRepository } from '@/repositories/classroom-modules/find-all-classroom-modules';

import { FindAllClassroomModulesQueryHandler } from '.';

describe('FindAllClassroomModulesQueryHandler', () => {
  let findAllClassroomModulesRepository: FindAllClassroomModulesRepository;
  let findAllClassroomModulesQueryHandler: FindAllClassroomModulesQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllClassroomModulesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountClassroomModulesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllClassroomModulesQueryHandler
      ]
    }).compile();

    findAllClassroomModulesRepository = moduleRef.get(
      FindAllClassroomModulesRepository
    );
    findAllClassroomModulesQueryHandler = moduleRef.get(
      FindAllClassroomModulesQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllClassroomModulesQueryHandler).toBeDefined();
    expect(findAllClassroomModulesRepository).toBeDefined();
  });
});

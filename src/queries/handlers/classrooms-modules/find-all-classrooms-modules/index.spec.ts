import { Test } from '@nestjs/testing';

import { CountClassroomsModulesRepository } from '@/repositories/classrooms-modules/count-classrooms-modules';
import { FindAllClassroomsModulesRepository } from '@/repositories/classrooms-modules/find-all-classrooms-modules';

import { FindAllClassroomsModulesQueryHandler } from '.';

describe('FindAllClassroomsModulesQueryHandler', () => {
  let findAllClassroomsModulesRepository: FindAllClassroomsModulesRepository;
  let findAllClassroomsModulesQueryHandler: FindAllClassroomsModulesQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllClassroomsModulesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountClassroomsModulesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllClassroomsModulesQueryHandler
      ]
    }).compile();

    findAllClassroomsModulesRepository = moduleRef.get(
      FindAllClassroomsModulesRepository
    );
    findAllClassroomsModulesQueryHandler = moduleRef.get(
      FindAllClassroomsModulesQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllClassroomsModulesQueryHandler).toBeDefined();
    expect(findAllClassroomsModulesRepository).toBeDefined();
  });
});

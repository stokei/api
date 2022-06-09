import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateCoursesStudentService } from '.';

describe('CreateCoursesStudentService', () => {
  let createCoursesStudentService: CreateCoursesStudentService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateCoursesStudentService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createCoursesStudentService = modRef.get(CreateCoursesStudentService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createCoursesStudentService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});

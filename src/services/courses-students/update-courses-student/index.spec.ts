import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateCoursesStudentService } from '.';

describe('UpdateCoursesStudentService', () => {
  let updateCoursesStudentService: UpdateCoursesStudentService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateCoursesStudentService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateCoursesStudentService = modRef.get(UpdateCoursesStudentService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateCoursesStudentService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});

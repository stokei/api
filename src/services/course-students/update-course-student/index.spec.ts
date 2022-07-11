import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateCourseStudentService } from '.';

describe('UpdateCourseStudentService', () => {
  let updateCourseStudentService: UpdateCourseStudentService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateCourseStudentService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateCourseStudentService = modRef.get(UpdateCourseStudentService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateCourseStudentService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});

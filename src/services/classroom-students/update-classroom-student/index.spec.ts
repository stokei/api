import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateClassroomStudentService } from '.';

describe('UpdateClassroomStudentService', () => {
  let updateClassroomStudentService: UpdateClassroomStudentService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateClassroomStudentService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateClassroomStudentService = modRef.get(UpdateClassroomStudentService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateClassroomStudentService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});

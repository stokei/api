import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveClassroomStudentService } from '.';

describe('RemoveClassroomStudentService', () => {
  let removeClassroomStudentService: RemoveClassroomStudentService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveClassroomStudentService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeClassroomStudentService = modRef.get(RemoveClassroomStudentService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeClassroomStudentService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});

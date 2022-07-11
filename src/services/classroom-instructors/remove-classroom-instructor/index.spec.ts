import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveClassroomInstructorService } from '.';

describe('RemoveClassroomInstructorService', () => {
  let removeClassroomInstructorService: RemoveClassroomInstructorService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveClassroomInstructorService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeClassroomInstructorService = modRef.get(
      RemoveClassroomInstructorService
    );
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeClassroomInstructorService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});

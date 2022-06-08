import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdateClassroomsEnrollmentService } from '.';

describe('UpdateClassroomsEnrollmentService', () => {
  let updateClassroomsEnrollmentService: UpdateClassroomsEnrollmentService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateClassroomsEnrollmentService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateClassroomsEnrollmentService = modRef.get(
      UpdateClassroomsEnrollmentService
    );
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateClassroomsEnrollmentService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});

import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdateClassroomsStudentService } from '.';

describe('UpdateClassroomsStudentService', () => {
  let updateClassroomsStudentService: UpdateClassroomsStudentService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateClassroomsStudentService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateClassroomsStudentService = modRef.get(UpdateClassroomsStudentService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateClassroomsStudentService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});

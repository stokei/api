import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdateClassroomsMaterialService } from '.';

describe('UpdateClassroomsMaterialService', () => {
  let updateClassroomsMaterialService: UpdateClassroomsMaterialService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateClassroomsMaterialService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateClassroomsMaterialService = modRef.get(
      UpdateClassroomsMaterialService
    );
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateClassroomsMaterialService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});

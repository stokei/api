import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdateClassroomsPlanService } from '.';

describe('UpdateClassroomsPlanService', () => {
  let updateClassroomsPlanService: UpdateClassroomsPlanService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateClassroomsPlanService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateClassroomsPlanService = modRef.get(UpdateClassroomsPlanService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateClassroomsPlanService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});

import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemoveClassroomsPlanService } from '.';

describe('RemoveClassroomsPlanService', () => {
  let removeClassroomsPlanService: RemoveClassroomsPlanService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveClassroomsPlanService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeClassroomsPlanService = modRef.get(RemoveClassroomsPlanService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeClassroomsPlanService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});

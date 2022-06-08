import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { CreateClassroomsPlanService } from '.';

describe('CreateClassroomsPlanService', () => {
  let createClassroomsPlanService: CreateClassroomsPlanService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateClassroomsPlanService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createClassroomsPlanService = modRef.get(CreateClassroomsPlanService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createClassroomsPlanService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});

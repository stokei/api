import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { CreateClassroomService } from '.';

describe('CreateClassroomService', () => {
  let createClassroomService: CreateClassroomService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateClassroomService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createClassroomService = modRef.get(CreateClassroomService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createClassroomService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});

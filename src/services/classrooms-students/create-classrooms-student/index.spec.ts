import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { CreateClassroomsStudentService } from '.';

describe('CreateClassroomsStudentService', () => {
  let createClassroomsStudentService: CreateClassroomsStudentService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateClassroomsStudentService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createClassroomsStudentService = modRef.get(CreateClassroomsStudentService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createClassroomsStudentService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});

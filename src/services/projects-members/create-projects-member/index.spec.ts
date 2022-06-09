import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateProjectsMemberService } from '.';

describe('CreateProjectsMemberService', () => {
  let createProjectsMemberService: CreateProjectsMemberService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateProjectsMemberService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createProjectsMemberService = modRef.get(CreateProjectsMemberService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createProjectsMemberService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});

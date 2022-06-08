import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { CreateDomainService } from '.';

describe('CreateDomainService', () => {
  let createDomainService: CreateDomainService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateDomainService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createDomainService = modRef.get(CreateDomainService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createDomainService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});

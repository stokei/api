import { CountProjectsPlansRepository } from '@/repositories/projects-plans/count-projects-plans';
import { FindAllProjectsPlansRepository } from '@/repositories/projects-plans/find-all-projects-plans';
import { Test } from '@nestjs/testing';
import { FindAllProjectsPlansQueryHandler } from '.';

describe('FindAllProjectsPlansQueryHandler', () => {
  let findAllProjectsPlansRepository: FindAllProjectsPlansRepository;
  let findAllProjectsPlansQueryHandler: FindAllProjectsPlansQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllProjectsPlansRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountProjectsPlansRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllProjectsPlansQueryHandler
      ]
    }).compile();

    findAllProjectsPlansRepository = moduleRef.get(
      FindAllProjectsPlansRepository
    );
    findAllProjectsPlansQueryHandler = moduleRef.get(
      FindAllProjectsPlansQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllProjectsPlansQueryHandler).toBeDefined();
    expect(findAllProjectsPlansRepository).toBeDefined();
  });
});

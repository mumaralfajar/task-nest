import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTaskById', () => {
    it('should return a task if found', () => {
      const task = { id: '1', title: 'Task 1', description: 'Description 1' };
      service['tasks'] = [task];

      const result = service.getTaskById('1');
      expect(result).toEqual(task);
    });

    it('should throw an error if task is not found', () => {
      service['tasks'] = [];

      expect(() => {
        service.getTaskById('1');
      }).toThrowError('Task with ID 1 not found');
    });
  });

  describe('createTask', () => {
    it('should create a new task', () => {
      const title = 'New Task';
      const description = 'New Task Description';

      const task = service.createTask(title, description);
      expect(task).toEqual({
        id: '11',
        title,
        description,
      });
      expect(service['tasks'].length).toBe(11);
      expect(service['tasks'][10].title).toBe(title);
    });
  });

  describe('updateTask', () => {
    it('should update a task if it exists', () => {
      const task = { id: '1', title: 'Task 1', description: 'Description 1' };
      service['tasks'] = [task];

      const updatedTask = service.updateTask(
        '1',
        'Updated Title',
        'Updated Description',
      );
      expect(updatedTask).toEqual({
        id: '1',
        title: 'Updated Title',
        description: 'Updated Description',
      });
    });

    it('should throw an error if task to update is not found', () => {
      service['tasks'] = [];

      expect(() => {
        service.updateTask('1', 'Updated Title', 'Updated Description');
      }).toThrowError('Task with ID 1 not found');
    });
  });

  describe('deleteTask', () => {
    it('should delete a task if it exists', () => {
      const task = { id: '1', title: 'Task 1', description: 'Description 1' };
      service['tasks'] = [task];

      service.deleteTask('1');
      expect(service['tasks'].length).toBe(0);
    });

    it('should throw an error if task to delete is not found', () => {
      service['tasks'] = [];

      expect(() => {
        service.deleteTask('1');
      }).toThrowError('Task with ID 1 not found');
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  const mockTasksService = {
    getTasksWithPagination: jest.fn(),
    getTaskById: jest.fn(),
    createTask: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTasks', () => {
    it('should return paginated tasks', async () => {
      const tasks = [{ id: '1', title: 'Task 1', description: 'Desc 1' }];
      const totalItems = 1;
      mockTasksService.getTasksWithPagination.mockReturnValue({
        tasks,
        totalItems,
      });

      const result = controller.getTasks(1, 5);
      expect(result).toEqual({
        status: true,
        message: 'Tasks retrieved successfully',
        time: expect.any(Number),
        data: {
          page: 1,
          size: 5,
          totalItems: 1,
          totalPages: 1,
          items: tasks,
        },
      });
      expect(service.getTasksWithPagination).toHaveBeenCalledWith(1, 5);
    });
  });

  describe('getTaskById', () => {
    it('should return a task when found', async () => {
      const task = { id: '1', title: 'Task 1', description: 'Desc 1' };
      mockTasksService.getTaskById.mockReturnValue(task);

      const result = controller.getTaskById('1');
      expect(result).toEqual({
        status: true,
        message: 'Task retrieved successfully',
        time: expect.any(Number),
        data: task,
      });
      expect(service.getTaskById).toHaveBeenCalledWith('1');
    });

    it('should return an error when task is not found', async () => {
      mockTasksService.getTaskById.mockImplementation(() => {
        throw new Error('Task not found');
      });

      const result = controller.getTaskById('1');
      expect(result).toEqual({
        status: false,
        message: 'Task not found',
        time: expect.any(Number),
        data: null,
      });
      expect(service.getTaskById).toHaveBeenCalledWith('1');
    });
  });

  describe('createTask', () => {
    it('should create a new task', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'New Task',
        description: 'New task description',
      };
      const task = { id: '1', ...createTaskDto };
      mockTasksService.createTask.mockReturnValue(task);

      const result = controller.createTask(createTaskDto);
      expect(result).toEqual({
        status: true,
        message: 'Task created successfully',
        time: expect.any(Number),
        data: task,
      });
      expect(service.createTask).toHaveBeenCalledWith(
        createTaskDto.title,
        createTaskDto.description,
      );
    });
  });

  describe('updateTask', () => {
    it('should update an existing task', async () => {
      const updateTaskDto: CreateTaskDto = {
        title: 'Updated Task',
        description: 'Updated task description',
      };
      const updatedTask = { id: '1', ...updateTaskDto };
      mockTasksService.updateTask.mockReturnValue(updatedTask);

      const result = controller.updateTask('1', updateTaskDto);
      expect(result).toEqual({
        status: true,
        message: 'Task updated successfully',
        time: expect.any(Number),
        data: updatedTask,
      });
      expect(service.updateTask).toHaveBeenCalledWith(
        '1',
        updateTaskDto.title,
        updateTaskDto.description,
      );
    });

    it('should return an error if task to update is not found', async () => {
      mockTasksService.updateTask.mockImplementation(() => {
        throw new Error('Task not found');
      });

      const updateTaskDto: CreateTaskDto = {
        title: 'Updated Task',
        description: 'Updated task description',
      };
      const result = controller.updateTask('1', updateTaskDto);
      expect(result).toEqual({
        status: false,
        message: 'Task not found',
        time: expect.any(Number),
        data: null,
      });
      expect(service.updateTask).toHaveBeenCalledWith(
        '1',
        updateTaskDto.title,
        updateTaskDto.description,
      );
    });
  });

  describe('deleteTask', () => {
    it('should delete a task by ID', async () => {
      const result = controller.deleteTask('1');
      expect(result).toEqual({
        status: true,
        message: 'Task deleted successfully',
        time: expect.any(Number),
        data: null,
      });
      expect(service.deleteTask).toHaveBeenCalledWith('1');
    });

    it('should return an error if task to delete is not found', async () => {
      mockTasksService.deleteTask.mockImplementation(() => {
        throw new Error('Task not found');
      });

      const result = controller.deleteTask('1');
      expect(result).toEqual({
        status: false,
        message: 'Task not found',
        time: expect.any(Number),
        data: null,
      });
      expect(service.deleteTask).toHaveBeenCalledWith('1');
    });
  });
});

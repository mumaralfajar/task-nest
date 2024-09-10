import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put, NotFoundException, BadRequestException
} from "@nestjs/common";
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import {
  createResponse,
  createPaginatedResponse,
  GeneralResponse,
} from '../common/utils/response.util';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import {
  deleteResponseSchema,
  paginatedResponseSchema,
  taskResponseSchema,
  taskSchema,
} from '../common/swagger/swagger.response';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Tasks retrieved successfully.',
    ...paginatedResponseSchema(taskSchema),
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 1,
    description: 'Page number (default is 1)',
  })
  @ApiQuery({
    name: 'size',
    required: false,
    type: Number,
    example: 5,
    description: 'Number of tasks per page (default is 5)',
  })
  async getTasks(@Query('page') page = 1, @Query('size') size = 5) {
    try {
      const { tasks, totalItems } = await this.tasksService.getTasksWithPagination(+page, +size);
      return createPaginatedResponse(true, 'Tasks retrieved successfully', +page, +size, totalItems, tasks);
    } catch (error) {
      console.log(error.message);
      return createResponse(false, 'Failed to retrieve tasks', null);
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Retrieve a task by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID of the task' })
  @ApiResponse({
    status: 200,
    description: 'Task retrieved successfully.',
    ...taskResponseSchema,
  })
  async getTaskById(@Param('id') id: string): Promise<GeneralResponse<Task>> {
    try {
      const task = await this.tasksService.getTaskById(id);
      if (!task) {
        return createResponse(false, 'Task not found', null);
      }
      return createResponse(true, 'Task retrieved successfully', task);
    } catch (error) {
      console.log('Error retrieving task:', error.message);
      return createResponse(false, error.message, null);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'Task created successfully.',
    ...taskResponseSchema,
  })
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<GeneralResponse<Task>> {
    try {
      const { title, description } = createTaskDto;
      const newTask = await this.tasksService.createTask(title, description);
      return createResponse(true, 'Task created successfully', newTask);
    } catch (error) {
      console.log(error.message);
      return createResponse(false, 'Failed to create task', null);
    }
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update an existing task' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID of the task to update',
  })
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully.',
    ...taskResponseSchema,
  })
  async updateTask(
    @Param('id') id: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<GeneralResponse<Task>> {
    try {
      const { title, description } = createTaskDto;
      const updatedTask = await this.tasksService.updateTask(id, title, description);
      return createResponse(true, 'Task updated successfully', updatedTask);
    } catch (error) {
      console.log(error.message);

      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        return createResponse(false, error.message, null);
      }

      return createResponse(false, 'Failed to update task', null);
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID of the task to delete',
  })
  @ApiResponse({
    status: 204,
    description: 'Task deleted successfully.',
    ...deleteResponseSchema,
  })
  async deleteTask(@Param('id') id: string): Promise<GeneralResponse<null>> {
    try {
      await this.tasksService.deleteTask(id);
      return createResponse(true, 'Task deleted successfully', null);
    } catch (error) {
      console.log(error.message);

      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        return createResponse(false, error.message, null);
      }

      return createResponse(false, 'Failed to delete task', null);
    }
  }
}

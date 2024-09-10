import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private currentId: bigint = 1n;

  constructor() {
    this.tasks = [
      { id: '1', title: 'Task 1', description: 'Description for task 1' },
      { id: '2', title: 'Task 2', description: 'Description for task 2' },
      { id: '3', title: 'Task 3', description: 'Description for task 3' },
      { id: '4', title: 'Task 4', description: 'Description for task 4' },
      { id: '5', title: 'Task 5', description: 'Description for task 5' },
      { id: '6', title: 'Task 6', description: 'Description for task 6' },
      { id: '7', title: 'Task 7', description: 'Description for task 7' },
      { id: '8', title: 'Task 8', description: 'Description for task 8' },
      { id: '9', title: 'Task 9', description: 'Description for task 9' },
      { id: '10', title: 'Task 10', description: 'Description for task 10' },
    ];

    this.currentId = this.getNextId();
  }

  // Get the next available ID based on the largest existing ID
  private getNextId(): bigint {
    const ids = this.tasks.map((task) => BigInt(task.id));
    const maxId = ids.length > 0 ? BigInt(Math.max(...ids.map(Number))) : 0n;
    return maxId + 1n;
  }

  // Retrieve tasks with pagination
  getTasksWithPagination(
    page: number,
    size: number,
  ): { tasks: Task[]; totalItems: number } {
    const start = (page - 1) * size;
    const end = start + size;
    const paginatedTasks = this.tasks.slice(start, end);
    return { tasks: paginatedTasks, totalItems: this.tasks.length };
  }

  // Retrieve task by ID (throw error if not found)
  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  // Create a new task
  createTask(title: string, description: string): Task {
    const task: Task = {
      id: this.currentId.toString(),
      title,
      description,
    };

    this.tasks.push(task);
    this.currentId++;
    return task;
  }

  // Update an existing task by ID (throw error if not found)
  updateTask(id: string, title: string, description: string): Task {
    const task = this.getTaskById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    task.title = title || task.title;
    task.description = description || task.description;
    return task;
  }

  // Delete a task by ID (throw error if not found)
  deleteTask(id: string): void {
    const task = this.getTaskById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}

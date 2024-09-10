import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private taskModel: Model<Task>) {}

  async getTasksWithPagination(
    page: number,
    size: number,
  ): Promise<{ tasks: Task[]; totalItems: number }> {
    const skip = (page - 1) * size;
    const tasks = await this.taskModel.find().limit(size).skip(skip).exec();
    const totalItems = await this.taskModel.countDocuments().exec();
    return { tasks, totalItems };
  }

  async getTaskById(id: string): Promise<Task> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    const task = await this.taskModel.findById(id).exec();

    if (!task) {
      throw new BadRequestException('Task not found');
    }

    return task;
  }

  async createTask(title: string, description: string): Promise<Task> {
    const newTask = new this.taskModel({ title, description });
    return newTask.save();
  }

  async updateTask(id: string, title: string, description: string): Promise<Task> {
    // Validate ObjectId format
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    const updatedTask = await this.taskModel
      .findByIdAndUpdate(new Types.ObjectId(id), { title, description }, { new: true })
      .exec();

    if (!updatedTask) {
      throw new NotFoundException('Task not found');
    }

    return updatedTask;
  }

  async deleteTask(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    const deletedTask = await this.taskModel.findByIdAndDelete(new Types.ObjectId(id)).exec();

    if (!deletedTask) {
      throw new NotFoundException('Task not found');
    }
  }
}

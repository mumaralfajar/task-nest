import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskSchema } from './task.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
    MongooseModule.forRoot('mongodb://localhost:27017/taskDB'),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}

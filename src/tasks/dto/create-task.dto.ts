import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'The title of the task',
    example: 'Create NestJS project',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'A detailed description of the task',
    example: 'This task involves setting up a new NestJS project with Swagger',
  })
  @IsNotEmpty()
  description: string;
}

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TasksModule } from '../src/tasks/tasks.module';

describe('TasksController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TasksModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a new task (POST /tasks)', () => {
    return request(app.getHttpServer())
      .post('/tasks')
      .send({ title: 'New Task', description: 'New Task Description' })
      .expect(201)
      .expect((res) => {
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe('Task created successfully');
        expect(res.body.data.title).toBe('New Task');
        expect(res.body.data.description).toBe('New Task Description');
      });
  });

  it('should retrieve all tasks (GET /tasks)', () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe('Tasks retrieved successfully');
        expect(Array.isArray(res.body.data.items)).toBe(true);
      });
  });

  it('should retrieve a task by ID (GET /tasks/:id)', () => {
    return request(app.getHttpServer())
      .get('/tasks/1')
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe('Task retrieved successfully');
        expect(res.body.data.id).toBe('1');
      });
  });

  it('should update a task by ID (PUT /tasks/:id)', () => {
    return request(app.getHttpServer())
      .put('/tasks/1')
      .send({ title: 'Updated Task', description: 'Updated Task Description' })
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe('Task updated successfully');
        expect(res.body.data.title).toBe('Updated Task');
        expect(res.body.data.description).toBe('Updated Task Description');
      });
  });

  it('should delete a task by ID (DELETE /tasks/:id)', () => {
    return request(app.getHttpServer())
      .delete('/tasks/1')
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe('Task deleted successfully');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

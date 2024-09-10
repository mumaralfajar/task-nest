import { ApiResponseOptions } from '@nestjs/swagger';

// General Response Data Type
export const generalResponseSchema = {
  status: {
    type: 'boolean',
  },
  message: {
    type: 'string',
  },
  time: {
    type: 'number',
  },
};

// Paginated Response Schema
export const paginatedResponseSchema = (
  itemSchema: any,
): ApiResponseOptions => ({
  schema: {
    properties: {
      ...generalResponseSchema,
      data: {
        type: 'object',
        properties: {
          page: { type: 'number' },
          size: { type: 'number' },
          totalItems: { type: 'number' },
          totalPages: { type: 'number' },
          items: {
            type: 'array',
            items: itemSchema,
          },
        },
      },
    },
  },
});

// Task Data Schema
export const taskSchema = {
  id: { type: 'string' },
  title: { type: 'string' },
  description: { type: 'string' },
};

// Standard Response with Task Data
export const taskResponseSchema: ApiResponseOptions = {
  schema: {
    properties: {
      ...generalResponseSchema,
      data: {
        type: 'object',
        properties: taskSchema,
      },
    },
  },
};

// Deletion Response Schema
export const deleteResponseSchema: ApiResponseOptions = {
  schema: {
    properties: {
      ...generalResponseSchema,
      data: { type: 'null' },
    },
  },
};

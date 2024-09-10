export interface GeneralResponse<T> {
  status: boolean;
  message: string;
  time: number;
  data: T;
}

export function createResponse<T>(
  status: boolean,
  message: string,
  data: T,
): GeneralResponse<T> {
  return {
    status,
    message,
    time: Date.now(),
    data,
  };
}

export interface PaginatedResponse<T> {
  status: boolean;
  message: string;
  time: number;
  data: {
    page: number;
    size: number;
    totalItems: number;
    totalPages: number;
    items: T[];
  };
}

export function createPaginatedResponse<T>(
  status: boolean,
  message: string,
  page: number,
  size: number,
  totalItems: number,
  items: T[],
): PaginatedResponse<T> {
  const totalPages = Math.ceil(totalItems / size);
  return {
    status,
    message,
    time: Date.now(),
    data: {
      page,
      size,
      totalItems,
      totalPages,
      items,
    },
  };
}

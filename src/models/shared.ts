export interface Response {
  success: boolean;
  statusCode: number;
  message: string;
}

export interface ResponseOf<T> extends Response {
  result: T;
}

export interface PagedResponseOf<T> extends Response {
  totalPages: number;
  pageSize: number;
  pageIndex: number;
  count: number;
  totalCount: number;
  moveNext: boolean;
  movePrevious: boolean;
  result: T;
}

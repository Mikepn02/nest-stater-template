export function buildResponse(message: string, status: Status, data?: any) {
  return {
    message,
    status,
    data,
  };
}

export type ResponseFormat = {
  message: string;
  status: Status;
  data?: any;
};

export enum Status {
  FAILED = 'failed',
  SUCCESS = 'Success',
}

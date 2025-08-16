class ApiResponse {
  status: number;
  message: string;
  data: any;
  success: boolean;

  constructor(
    status: number = 200,
    message: string,
    data: any = null,
    success: boolean = true,
  ) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.success = success;
  }

  static success(message: string, data?: any | null, status: number = 200) {
    return new ApiResponse(status, message, data, true);
  }

  static fail(message: string, data?: any | null, status: number = 500) {
    return new ApiResponse(status, message, data, false);
  }
}

export default ApiResponse;

export class PrimsaCodeResponse {
  errorCode: string;
  errorMessage: string;
  constructor(error: any) {
    this.errorCode = error.code;
    const errorResponse = errorResponses.find(
      (response) => response.code === this.errorCode,
    );
    if (errorResponse) {
      this.errorMessage = errorResponse.message(error);
    } else {
      this.errorMessage = "An unexpected error occurred.";
    }
  }
  getErrorResponse() {
    return {
      errorCode: this.errorCode,
      message: this.errorMessage,
    };
  }
}

const errorResponses = [
  {
    code: "P2002",
    message: (error: any) =>
      `Item with this ${error.meta.target[0]} already exists.`,
  },
  {
    code: "P2025",
    message: () => "The requested item could not be found.",
  },
  {
    code: "P2014",
    message: () => "A related record was not found.",
  },
];

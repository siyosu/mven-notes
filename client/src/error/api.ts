interface InvalidInputError {
  message: string
  errors: {
    [key: string]: {
      location: string
      msg: string
      path: string
      type: string
      value: string
    }
  }
}
export class NetworkError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NetworkError'
  }
}

export class ValidationError extends Error {
  errors: { [key: string]: string }
  constructor(error: InvalidInputError) {
    super(error.message)
    this.name = 'ValidationError'
    const mappedErrors: { [key: string]: string } = {}

    Object.keys(error.errors).forEach((key) => {
      mappedErrors[key] = error.errors[key].msg
    })

    this.errors = mappedErrors
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UnauthorizedError'
  }
}
export class NotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NotFoundError'
  }
}

export class SessionExpiredError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'SessionExpiredError'
  }
}

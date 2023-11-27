export interface InvalidInputError {
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

export class RegisterError extends Error {
  errors: InvalidInputError['errors']
  constructor(error: InvalidInputError) {
    super(error.message)
    this.name = 'RegisterError'
    this.errors = error.errors
  }
}

export class LoginError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'LoginError'
  }
}

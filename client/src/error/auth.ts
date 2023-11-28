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

export class RegisterError extends Error {
  errors: { [key: string]: string }
  constructor(error: InvalidInputError) {
    super(error.message)
    this.name = 'RegisterError'
    const mappedErrors: { [key: string]: string } = {}

    Object.keys(error.errors).forEach((key) => {
      mappedErrors[key] = error.errors[key].msg
    })

    this.errors = mappedErrors
  }
}

export class LoginError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'LoginError'
  }
}

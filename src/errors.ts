export class MandatoryParameterMissingError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export class RateLimitReachedError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export class ParameterInvalidError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export class DatabaseUnreachableError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export class NoDataInDatabaseError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export class StoppointDoesNotExistError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

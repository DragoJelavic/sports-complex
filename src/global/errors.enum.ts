export enum AuthErrorMessages {
  UserExists = 'User with that email already exists',
  JwtSecretNotSet = 'Jwt secret not set',
  VerificationEmailError = 'There was an issue sending the verification email',
  InvalidUserToken = 'Invalid user token',
  InvalidToken = 'Invalid or missing token',
  UserVerified = 'User is already verified',
  UserNotRegistered = 'User not found. Please register.',
  IncorrectPassword = 'Incorrect password. Please try again.',
  SendgridAPIError = 'Sendgrid API variables not set',
}

export enum SportErrorMessages {
  DefaultError = 'Error creating a sport',
  SportNotFound = 'There is no sport with provided ID',
  SportNameExistsError = 'Sport with that name already exists',
}

export enum AgeGroupErrorMessages {
  DefaultError = 'Error creating an age group',
  NoAgeGroupByIdError = 'There is no age group with provided ID',
  AgeGroupExistsError = 'Age group with that name already exists',
}

export enum SportClassesErrorMessages {
  SportNotFound = 'There is no sport with provided ID',
  AgeGroupNotFound = 'There is no age group with provided ID',
  ClassNotFound = 'There is no class with provided ID',
  SimilarClassExists = 'Age group with that name already exists',
  UpdateFailedError = 'Failed to update a class',
  StartTimeAfterEndTime = 'Start of a class cannot be after end of a class',
}

export enum UserErrorMessages {
  UserNotFound = 'There is no user with provided ID',
  ClassNotFound = 'There is no class with provided ID',
  AlreadyEnrolled = 'User is already enrolled in this class',
  NotEnrolled = 'User was not enrolled in this class',
  UserCannotEnroll = 'User reached maximum number of class enrollments',
  ClassCannotEnroll = 'Class reached maximum number of user enrollments',
}

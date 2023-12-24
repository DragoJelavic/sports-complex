export enum AuthErrorMessages {
  UserExists = 'User with that email already exists',
  JwtSecretNotSet = 'Jwt secret not set',
  VerificationEmailError = 'There was an issue sending the verification email',
  InvalidUserToken = 'Invalid user token',
  InvalidToken = 'Invalid or missing token',
  InvalidTokenUnauthorized = 'Unauthorized. Invalid token.',
  UserVerified = 'User is already verified',
  UserNotRegistered = 'User not found. Please register.',
  IncorrectPassword = 'Incorrect password. Please try again.',
  SendgridAPIError = 'Sendgrid API variables not set',
  AccessDeniedAdmin = 'Access denied. Admins only.',
  AccessDeniedNotVerified = 'Access denied. Verify your account.',
}

export enum SportErrorMessages {
  SportCreationError = 'Error creating a sport',
  SportNameExistsError = 'Sport with that name already exists',
  NotFound = 'Sports not found',
}

export enum AgeGroupErrorMessages {
  AgeGroupCreationError = 'Error creating an age group',
  NoAgeGroupByIdError = 'There is no age group with provided ID',
  AgeGroupExistsError = 'Age group with that name already exists',
  NotFound = 'Age groups not found',
}

export enum SportClassesErrorMessages {
  SimilarClassExists = 'Age group with that name already exists',
  UpdateFailedError = 'Failed to update a class',
  StartTimeAfterEndTime = 'Start of a class cannot be after end of a class',
  ClassesNotFound = 'No class found',
}

export enum UserErrorMessages {
  AlreadyEnrolled = 'User is already enrolled in this class',
  NotEnrolled = 'User was not enrolled in this class',
  UserCannotEnroll = 'User reached maximum number of class enrollments',
  ClassCannotEnroll = 'Class reached maximum number of user enrollments',
  NotFound = 'Users not found',
}

export enum CommonErrorMessages {
  UserNotFound = 'There is no user with provided ID',
  ClassNotFound = 'There is no class with provided ID',
  SportNotFound = 'There is no sport with provided ID',
  AgeGroupNotFound = 'There is no age group with provided ID',
  CommentNotFound = 'There is no comment with provided ID',
  NoCommentsFound = 'There are no comments for this class',
}

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
  NoSportByIdError = 'There is no sport with provided ID',
  SportNameExistsError = 'Sport with that name already exists',
}

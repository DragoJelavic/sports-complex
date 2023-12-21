declare namespace Express {
  interface Request {
    user?: {
      role: string
      isVerified: boolean
    }
  }
}

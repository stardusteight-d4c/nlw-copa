export interface CreateUserRequest {
  name: string
  email: string
  avatarUrl: string
}

export interface CreatePoolRequest {
  title: string
  ownerId: string
}

export interface UserPoolsRequest {
  userId: string
}

export interface CreateGuess {
  firstTeamCountryCode: string
  secondTeamCountryCode: string
  firstTeamPoints: string
  secondTeamPoints: string
  date: string
  poolId: string
  userId: string
}

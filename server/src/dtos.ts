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

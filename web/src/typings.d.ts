interface InitialState {
  user: User | null
}

interface User {
  id: string
  email: string
  name: string
  avatarUrl: string
}

interface Pool {
  id: string
  title: string
  code: string
  createdAt: Date
  ownerId: string
}

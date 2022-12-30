interface InitialState {
  user: User | null
}

interface User {
  id: string
  email: string
  name: string
  avatarUrl: string
}

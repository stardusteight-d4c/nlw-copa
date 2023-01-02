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

interface ParticipantGuesses {
  id: string
  poolId: string
  userId: string
  points: Number
  guesses: [Guess]
}

interface Guess {
  createdAt: string
  date: string
  firstTeamCountryCode: string
  firstTeamPoints: number
  id: string
  participantId: string
  secondTeamCountryCode: string
  secondTeamPoints: number
  winner: boolean
}

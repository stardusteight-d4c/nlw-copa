import { z } from 'zod'

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

export interface GuessesByPool {
  poolId: string
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

export interface SetWinningGuess {
  guessId: string
  participantId: string
}

export function CreateGuessParser() {
  return z.object({
    firstTeamCountryCode: z.string({
      required_error: 'firstTeamCountryCode is required',
    }),
    secondTeamCountryCode: z.string({
      required_error: 'secondTeamCountryCode is required',
    }),
    firstTeamPoints: z.string({
      required_error: 'firstTeamPoints is required',
    }),
    secondTeamPoints: z.string({
      required_error: 'secondTeamPoints is required',
    }),
    date: z.string({
      required_error: 'date is required',
    }),
    poolId: z.string({
      required_error: 'poolId is required',
    }),
    userId: z.string({
      required_error: 'userId is required',
    }),
  })
}

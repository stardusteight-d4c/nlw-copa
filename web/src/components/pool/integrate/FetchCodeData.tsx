import React, { useEffect } from 'react'
import { api } from '../../../lib/axios'
import {
  allParticipants,
  getParticipants,
  guessesByPoolId,
  guessesByUserId,
} from '../../../services/api-routes'
import { useAppSelector } from '../../../store/hooks'
import { selectUser } from '../../../store/userSlice'

interface Props {
  pool: [Pool]
  poolData: Pool
  setParticipants: React.Dispatch<any>
  setRanking: React.Dispatch<any>
  setGuesses: React.Dispatch<React.SetStateAction<never[]>>
  setUserGuesses: React.Dispatch<React.SetStateAction<never[]>>
}

export const FetchCodeData = ({
  pool,
  poolData,
  setParticipants,
  setRanking,
  setGuesses,
  setUserGuesses,
}: Props) => {
  const currentUser = useAppSelector(selectUser)

  useEffect(() => {
    ;(async () => {
      await api
        .get(getParticipants, {
          params: {
            poolId: poolData.id,
          },
        })
        .then(({ data }: any) => setParticipants(data))
        .catch((error: { toJSON: () => any }) => console.log(error.toJSON()))
    })()
  }, [pool])

  useEffect(() => {
    ;(async () => {
      await api
        .get(allParticipants, {
          params: {
            poolId: poolData.id,
          },
        })
        .then(({ data }: any) => setRanking(data))
        .catch((error: { toJSON: () => any }) => console.log(error.toJSON()))
    })()
  }, [pool])

  useEffect(() => {
    ;(async () => {
      await api
        .get(guessesByPoolId, {
          params: {
            poolId: poolData.id,
          },
        })
        .then(({ data }: any) => setGuesses(data.guesses))
        .catch((error: { toJSON: () => any }) => console.log(error.toJSON()))
    })()
  }, [poolData])

  useEffect(() => {
    ;(async () => {
      await api
        .get(guessesByUserId, {
          params: {
            userId: currentUser?.id,
            poolId: poolData.id,
          },
        })
        .then(({ data }: any) => setUserGuesses(data.guesses))
        .catch((error: { toJSON: () => any }) => console.log(error.toJSON()))
    })()
  }, [poolData, currentUser])

  return <></>
}

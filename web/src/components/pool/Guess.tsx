import React, { useEffect, useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { VscClose } from 'react-icons/vsc'
import { api } from '../../lib/axios'
import { getUserById, setWinningGuess } from '../../services/api-routes'
import { countryList } from '../../utils/country-list'
import { monthList } from '../../utils/month-list'
import { BsFillTrophyFill, BsTrophy } from 'react-icons/bs'
import { useAppSelector } from '../../store/hooks'
import { selectUser } from '../../store/userSlice'
import { GameScore } from './integrate/GameScore'

interface Props {
  guess?: ParticipantGuesses
  yourGuesses?: boolean
  poolOwner: string
}

export const Guess = ({ guess, yourGuesses, poolOwner }: Props) => {
  const [participant, setParticipant] = useState<User>()
  const currentUser = useAppSelector(selectUser)

  useEffect(() => {
    ;(async () => {
      await api
        .get(getUserById, {
          params: {
            userId: guess?.userId,
          },
        })
        .then(({ data }) => setParticipant(data.user))
    })()
  }, [])

  const handleWinner = async (guessId: string) => {
    api.post(setWinningGuess, {
      guessId,
      participantId: guess?.id,
    })
    alert('O vencedor foi definido!')
  }

  if (!currentUser || !poolOwner) {
    return <></>
  }

  return (
    <>
      {guess?.guesses.map((userGuess: Guess, index) => {
        const date = userGuess.date.split(' ')[0]
        const hours = userGuess.date.split(' ')[1]
        const day = date.split('/')[0]
        const month: string = date.split('/')[1]
        const year = date.split('/')[2]

        const monthInWriting =
          monthList[Number(month) < 10 ? month.split('')[1] : month]

        return (
          <div key={index} className={style.wrapper}>
            <div className={style.presentationContainer}>
              <div>
                <h2 className={style.countries}>
                  {countryList[userGuess.firstTeamCountryCode]} vs.{' '}
                  {countryList[userGuess.secondTeamCountryCode]}
                </h2>
                <span className={style.datetimeSpan}>
                  {day} de {monthInWriting} de {year} às {hours}h
                </span>
              </div>
            </div>
            <div className={style.gameScoreContainer}>
              <GameScore
                teamPoints={userGuess.firstTeamPoints}
                teamCountryCode={userGuess.firstTeamCountryCode}
              />
              <VscClose className={style.versusIcon} />
              <GameScore
                teamPoints={userGuess.secondTeamPoints}
                teamCountryCode={userGuess.secondTeamCountryCode}
              />
            </div>
            {!yourGuesses && (
              <div className={style.trophyContainer}>
                {userGuess.winner ? (
                  <BsFillTrophyFill
                    title="Ganhador"
                    className={style.winnerTrophy}
                  />
                ) : (
                  <>
                    {poolOwner === currentUser?.id && (
                      <BsTrophy
                        onClick={() => handleWinner(userGuess.id)}
                        title="Settar como ganhador"
                        className={style.defaultTrophy}
                      />
                    )}
                  </>
                )}
              </div>
            )}
            {!yourGuesses && (
              <div className={style.createByContainer}>
                <span>Criado por </span>
                <span className={style.nameSpan}>{participant?.name}</span>
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}

const style = {
  wrapper: `bg-gray-800 relative border-b-[3px] p-6 border-b-yellow-500 md:w-[600px] mt-4 mx-auto rounded text-white shadow-xl`,
  presentationContainer: `text-center flex-col`,
  countries: `font-bold text-2xl`,
  datetimeSpan: `text-gray-200`,
  gameScoreContainer: `flex justify-center items-center mt-4`,
  versusIcon: `text-gray-200 text-3xl mx-5`,
  trophyContainer: `absolute right-1 md:right-4 bottom-1 md:bottom-2 cursor-pointer z-20 w-fit p-2`,
  winnerTrophy: `text-xl text-yellow-500`,
  defaultTrophy: `text-xl text-white`,
  createByContainer: `w-full absolute left-0 bottom-1 text-sm text-center`,
  nameSpan: `w-fit text-yellow-500 uppercase font-bold mx-auto`,
}

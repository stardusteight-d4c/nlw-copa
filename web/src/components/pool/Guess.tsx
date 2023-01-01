import React, { useEffect } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { VscClose } from 'react-icons/vsc'
import { monthList } from '../../utils/month-list'

interface Props {
  guess?: any
  yourGuesses?: boolean
}

export const Guess = ({ guess, yourGuesses }: Props) => {
  console.log('guess', guess)

  return (
    <>
      {guess.guesses.map((userGuess: any) => {
        const date = userGuess.date.split(' ')[0]
        const hours = userGuess.date.split(' ')[1]
        const day = date.split('/')[0]
        const month: string = date.split('/')[1]
        const year = date.split('/')[2]

        const monthInWriting =
          monthList[Number(month) < 10 ? month.split('')[1] : month]

        return (
          <div className="bg-gray-800 relative border-b-[3px] p-6 border-b-yellow-500 w-[600px] mt-4 mx-auto rounded text-white shadow-xl">
            <div className="text-center flex-col">
              <div>
                <h2 className="font-bold text-2xl">Brasil vs. Argentina</h2>
                <span className="text-gray-200">
                  {day} de {monthInWriting} de {year} às {hours}h
                </span>
              </div>
            </div>
            <div className="flex justify-center items-center mt-4">
              <div className="flex gap-x-2 justify-center items-center">
                <span className="flex items-center justify-center h-[35px] w-[50px] rounded bg-gray-900 border border-gray-800 text-white">
                  {userGuess.firstTeamPoints}
                </span>
                <ReactCountryFlag
                  countryCode={userGuess.firstTeamCountryCode}
                  svg
                  style={{
                    width: '2.5em',
                    height: '2.5em',
                  }}
                  title={userGuess.firstTeamCountryCode}
                />
              </div>
              <VscClose className="text-gray-200 text-3xl mx-5" />
              <div className="flex gap-x-2 justify-center items-center">
                <ReactCountryFlag
                  countryCode={userGuess.secondTeamCountryCode}
                  svg
                  style={{
                    width: '2.5em',
                    height: '2.5em',
                  }}
                  title={userGuess.secondTeamCountryCode}
                />
                <span className="flex items-center justify-center h-[35px] w-[50px] rounded bg-gray-900 border border-gray-800 text-white">
                  {userGuess.secondTeamPoints}
                </span>
              </div>
            </div>
            {!yourGuesses && (
              <div className="w-full absolute left-0 bottom-1 text-sm text-center">
                <span>Criado por </span>
                <span className="w-fit text-yellow-500 uppercase font-bold mx-auto">
                  Gabriel Sena
                </span>
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}

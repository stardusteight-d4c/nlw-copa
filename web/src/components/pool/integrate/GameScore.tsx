import React from 'react'
import ReactCountryFlag from 'react-country-flag'

interface Props {
  teamPoints: number
  teamCountryCode: string
}

export const GameScore = ({ teamPoints, teamCountryCode }: Props) => {
  return (
    <div className={style.wrapper}>
      <span className={style.teamPoints}>{teamPoints}</span>
      <ReactCountryFlag
        countryCode={teamCountryCode}
        svg
        style={{
          width: '2.5em',
          height: '2.5em',
        }}
        title={teamCountryCode}
      />
    </div>
  )
}

const style = {
  wrapper: `flex gap-x-2 justify-center items-center`,
  teamPoints: `flex items-center justify-center h-[35px] w-[50px] rounded bg-gray-900 border border-gray-800 text-white`,
}

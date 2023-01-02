import React from 'react'
import ReactCountryFlag from 'react-country-flag'
import { countryList } from '../../../utils/country-list'
import { rendersGolsOptions } from './Options'

interface Props {
  countryCode: string
  teamId: string
  teamScoreId: string
  handleChangeFormData: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export const SelectTeam = ({
  countryCode,
  teamId,
  teamScoreId,
  handleChangeFormData,
}: Props) => {
  return (
    <div className={style.selectTeamContainer}>
      <ReactCountryFlag
        countryCode={countryCode || 'AF'}
        svg
        style={{
          width: '2.5em',
          height: '2.5em',
        }}
        title={countryCode}
      />
      <select
        onChange={(e) => handleChangeFormData(e)}
        id={teamId}
        className={style.selectCountry}
      >
        <option disabled>Selecione o primeiro time</option>
        {Object.entries(countryList).map((country: any, index) => (
          <option key={index} value={country[0]}>
            <span>
              {country[1]} ({country[0]})
            </span>
          </option>
        ))}
      </select>
      <select
        onChange={(e) => handleChangeFormData(e)}
        id={teamScoreId}
        className={style.selectGoals}
      >
        <option disabled>Gols</option>
        {rendersGolsOptions()}
      </select>
    </div>
  )
}

const style = {
  selectTeamContainer: `flex gap-x-5 items-center`,
  selectCountry: `bg-gray-600 w-full outline-none p-2 rounded`,
  selectGoals: `bg-gray-600 w-[70px] outline-none p-2 rounded`,
}

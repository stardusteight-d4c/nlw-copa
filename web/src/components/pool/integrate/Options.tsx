import React from 'react'
import { monthList } from '../../../utils/month-list'

interface Props {
  handleChangeFormData: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export const rendersGolsOptions = () => {
  const gols = []
  for (var i = 0; i <= 20; i++) {
    gols.push(i)
  }
  return (
    <>
      {gols.map((gol) => (
        <option key={gol} value={gol}>
          {gol}
        </option>
      ))}
    </>
  )
}

export const rendersHoursOptions = () => {
  const hours = []
  for (var i = 1; i <= 24; i++) {
    hours.push(i)
  }
  return (
    <>
      {hours.map((hour) => (
        <option key={hour} value={hour}>
          {hour < 10 ? '0' + hour : hour}
        </option>
      ))}
    </>
  )
}

export const rendersMinutesOptions = () => {
  const minutes = []
  for (var i = 0; i <= 59; i += 5) {
    minutes.push(i)
  }
  return (
    <>
      {minutes.map((minute) => (
        <option key={minute} value={minute}>
          {minute < 10 ? '0' + minute : minute}
        </option>
      ))}
    </>
  )
}

export const rendersDaysOptions = ({ handleChangeFormData }: Props) => {
  const days = []
  for (var i = 1; i <= 31; i++) {
    days.push(i)
  }
  return (
    <select
      onChange={(e) => handleChangeFormData(e)}
      id="day"
      className="bg-gray-600 text-center w-[60px] h-[40px] outline-none p-2 rounded"
    >
      {days.map((day) => (
        <option key={day} value={day}>
          {day}
        </option>
      ))}
    </select>
  )
}

export const rendersMonthsOptions = ({ handleChangeFormData }: Props) => {
  return (
    <select
      onChange={(e) => handleChangeFormData(e)}
      id="month"
      className="bg-gray-600 text-center w-[115px] h-[40px] outline-none p-2 rounded"
    >
      {Object.entries(monthList).map((month: any, index) => (
        <option
          key={index}
          value={Number(month[0]) < 10 ? '0' + month[0] : month[0]}
        >
          {month[1]}
        </option>
      ))}
    </select>
  )
}

export const rendersYearsOptions = ({ handleChangeFormData }: Props) => {
  const years = [2022, 2026, 2030, 2034]
  return (
    <select
      onChange={(e) => handleChangeFormData(e)}
      id="year"
      className="bg-gray-600 text-center w-[75px] h-[40px] outline-none p-2 rounded"
    >
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  )
}

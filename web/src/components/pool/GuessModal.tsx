import React, { useEffect, useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { VscClose } from 'react-icons/vsc'
import { AiFillCloseSquare } from 'react-icons/ai'
import { countryList } from '../../utils/country-list'
import { monthList } from '../../utils/month-list'
import { createGuess } from '../../services/api-routes'
import { useAppSelector } from '../../store/hooks'
import { selectUser } from '../../store/userSlice'
import { api } from '../../lib/axios'

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  poolId: string
}

export const GuessModal = ({ setOpenModal, poolId }: Props) => {
  const [click, setClick] = useState<boolean>(false)
  const currentUser = useAppSelector(selectUser)
  const [formData, setFormData] = useState({
    firstTeam: '',
    firstTeamScore: '',
    secondTeam: '',
    secondTeamScore: '',
    day: '',
    month: '',
    year: '',
    hour: '',
    minutes: '',
  })

  const handleSubmit = async () => {
    const data = { ...formData }
    await api
      .post(createGuess, {
        firstTeamCountryCode: data.firstTeam,
        firstTeamPoints: data.firstTeamScore,
        secondTeamCountryCode: data.secondTeam,
        secondTeamPoints: data.secondTeamScore,
        date: `${data.day}/${data.month}/${data.year} ${data.hour}:${data.minutes}`,
        poolId,
        userId: currentUser?.id,
      })
      .then(() => {
        alert('Palpite criado!')
        setOpenModal(false)
      })
  }

  useEffect(() => {
    if (click) {
      setOpenModal(false)
    }
  }, [click])

  const rendersGolsOptions = () => {
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

  const rendersHoursOptions = () => {
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

  const rendersMinutesOptions = () => {
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

  const rendersDaysOptions = () => {
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

  const rendersMonthsOptions = () => {
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

  const rendersYearsOptions = () => {
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

  const handleChangeFormData = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    })
  }

  return (
    <>
      <div
        onClick={() => setClick(true)}
        className="absolute overflow-hidden w-screen h-screen bg-black/20 inset-0 z-40"
      />
      <div className="bg-gray-800 p-8 max-w-xl text-white rounded border border-gray-600  absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-xl text-center my-2 font-bold">Defina o jogo</h1>
        <div className="flex flex-col justify-center items-center gap-y-2 relative">
          <AiFillCloseSquare
            onClick={() => setOpenModal(false)}
            className="text-2xl cursor-pointer absolute -top-[60px] right-0"
          />
          <div className="flex gap-x-5 items-center">
            <ReactCountryFlag
              countryCode={formData.firstTeam || 'AF'}
              svg
              style={{
                width: '2.5em',
                height: '2.5em',
              }}
              title={formData.firstTeam}
            />
            <select
              onChange={(e) => handleChangeFormData(e)}
              id="firstTeam"
              className="bg-gray-600 w-full outline-none p-2 rounded"
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
              id="firstTeamScore"
              className="bg-gray-600 w-[70px] outline-none p-2 rounded"
            >
              <option disabled>Gols</option>
              {rendersGolsOptions()}
            </select>
          </div>
          <VscClose className="text-gray-200 text-3xl mx-5" />
          <div className="flex gap-x-5 items-center">
            <ReactCountryFlag
              countryCode={formData.secondTeam || 'AF'}
              svg
              style={{
                width: '2.5em',
                height: '2.5em',
              }}
              title={formData.secondTeam}
            />
            <select
              onChange={(e) => handleChangeFormData(e)}
              id="secondTeam"
              className="bg-gray-600 w-full outline-none p-2 rounded"
            >
              <option disabled>Selecione o segundo time</option>
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
              id="secondTeamScore"
              className="bg-gray-600 w-[70px] outline-none p-2 rounded"
            >
              <option disabled>Gols</option>
              {rendersGolsOptions()}
            </select>
          </div>
          <h2 className="text-xl text-center mt-4 font-bold">
            Data e horário do jogo
          </h2>
          <div className="flex items-center">
            <div className="flex items-center gap-x-1 mr-4">
              {rendersDaysOptions()}
              {rendersMonthsOptions()}
              {rendersYearsOptions()}
            </div>
            <div className="flex items-center">
              <select
                id="hour"
                onChange={(e) => handleChangeFormData(e)}
                className="bg-gray-600 text-center w-[55px] h-[40px] outline-none p-2 rounded"
              >
                <option disabled>Hora</option>
                {rendersHoursOptions()}
              </select>
              <span className="text-3xl font-bold mx-[2px]">:</span>
              <select
                id="minutes"
                onChange={(e) => handleChangeFormData(e)}
                className="bg-gray-600 text-center w-[55px] h-[40px] outline-none p-2 rounded"
              >
                <option disabled>Minutos</option>
                {rendersMinutesOptions()}
              </select>
            </div>
          </div>
          <button
            className="bg-yellow-500 mt-4 flex w-fit gap-x-2 justify-center items-center hover:brightness-110 text-gray-900 font-bold text-sm px-4 py-2 rounded"
            type="button"
          >
            <span onClick={handleSubmit}>Enviar palpite</span>
          </button>
        </div>
      </div>
    </>
  )
}

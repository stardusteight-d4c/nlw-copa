import React, { useEffect, useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { VscClose } from 'react-icons/vsc'
import { countryList } from '../../utils/country-list'

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const GuessModal = ({ setOpenModal }: Props) => {
  const [click, setClick] = useState<boolean>(false)
  const [firstTeam, setFirstTeam] = useState('')
  const [firstTeamScore, setFirstTeamScore] = useState('')
  const [secondTeam, setSecondTeam] = useState('')
  const [secondTeamScore, setSecondTeamScore] = useState('')

  const now = new Date()

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
            {hour}
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
            {minute}
          </option>
        ))}
      </>
    )
  }

  return (
    <>
      <div
        onClick={() => setClick(true)}
        className="absolute overflow-hidden w-screen h-screen bg-black/20 inset-0 z-40"
      />
      <div className="bg-gray-800 p-4 max-w-xl text-white rounded border border-gray-600  absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-xl text-center mb-2 font-bold">Selecione o jogo</h1>
        <div className="flex flex-col justify-center items-center gap-y-2">
          <div className="flex gap-x-5 items-center">
            <ReactCountryFlag
              countryCode={firstTeam || 'AF'}
              svg
              style={{
                width: '2.5em',
                height: '2.5em',
              }}
              title={firstTeam}
            />
            <select
              onChange={(e) => setFirstTeam(e.target.value)}
              id="firstTeam"
              className="bg-gray-600 w-full outline-none p-2 rounded"
            >
              <option disabled>Selecione o primeiro time</option>
              {Object.entries(countryList).map((country, index) => (
                <option key={index} value={country[0]}>
                  {country[1]} ({country[0]})
                </option>
              ))}
            </select>
            <select
              onChange={(e) => setFirstTeamScore(e.target.value)}
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
              countryCode={secondTeam || 'AF'}
              svg
              style={{
                width: '2.5em',
                height: '2.5em',
              }}
              title={secondTeam}
            />
            <select
              onChange={(e) => setSecondTeam(e.target.value)}
              id="secondTeam"
              className="bg-gray-600 w-full outline-none p-2 rounded"
            >
              <option disabled>Selecione o segundo time</option>
              {Object.entries(countryList).map((country, index) => (
                <option key={index} value={country[0]}>
                  {country[1]} ({country[0]})
                </option>
              ))}
            </select>

            <select
              onChange={(e) => setSecondTeamScore(e.target.value)}
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
          <div className="flex items-center gap-x-4">
            {/* ocultar o input do tipo date e exibir uma div com os valore selecionados, ao clicar na div exibir date */}
            {/* <input
              className="bg-gray-600 w-[270px] h-[40px] text-center outline-none p-2 rounded"
              id="date"
              type="date"
            /> */}

            <div className="flex items-center gap-x-2">
              <select className="bg-gray-600 w-[70px] h-[40px] outline-none p-2 rounded">
                <option disabled>Hora</option>
                {rendersHoursOptions()}
              </select>
              <span>:</span>
              <select className="bg-gray-600 w-[70px] h-[40px] outline-none p-2 rounded">
                <option disabled>Minutos</option>
                {rendersMinutesOptions()}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

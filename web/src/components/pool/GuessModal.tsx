import React, { useEffect, useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { VscClose } from 'react-icons/vsc'
import { AiFillCloseSquare } from 'react-icons/ai'
import { countryList } from '../../utils/country-list'
import { createGuess } from '../../services/api-routes'
import { useAppSelector } from '../../store/hooks'
import { selectUser } from '../../store/userSlice'
import { api } from '../../lib/axios'
import {
  rendersDaysOptions,
  rendersGolsOptions,
  rendersHoursOptions,
  rendersMinutesOptions,
  rendersMonthsOptions,
  rendersYearsOptions,
} from './integrate/Options'

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
      <div onClick={() => setClick(true)} className={style.overlay} />
      <div className={style.wrapper}>
        <div className={style.contentContainer}>
          <h1 className={style.title}>Defina o jogo</h1>
          <AiFillCloseSquare
            onClick={() => setOpenModal(false)}
            className={style.closeIcon}
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

          <h1 className={style.title}>Data e horário do jogo</h1>
          <div className="flex items-center">
            <div className="flex items-center gap-x-1 mr-4">
              {rendersDaysOptions({ handleChangeFormData })}
              {rendersMonthsOptions({ handleChangeFormData })}
              {rendersYearsOptions({ handleChangeFormData })}
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

const style = {
  overlay: `absolute overflow-hidden w-screen h-screen bg-black/20 inset-0 z-40`,
  wrapper: `bg-gray-800 p-8 max-w-xl text-white rounded border border-gray-600  absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`,
  contentContainer: `flex flex-col justify-center items-center gap-y-2 relative`,
  title: `text-xl text-center mt-4 font-bold`,
  closeIcon: `text-2xl cursor-pointer absolute -top-[10px] right-0`,
}

import React, { useEffect, useState } from 'react'
import { VscClose } from 'react-icons/vsc'
import { AiFillCloseSquare } from 'react-icons/ai'
import { createGuess } from '../../services/api-routes'
import { useAppSelector } from '../../store/hooks'
import { selectUser } from '../../store/userSlice'
import { api } from '../../lib/axios'
import {
  rendersDaysOptions,
  rendersHoursOptions,
  rendersMinutesOptions,
  rendersMonthsOptions,
  rendersYearsOptions,
} from './integrate/Options'
import { SelectTeam } from './integrate/SelectTeam'

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

  const selectFirstTeamProps = {
    countryCode: formData.firstTeam,
    teamId: 'firstTeam',
    teamScoreId: 'firstTeamScore',
    handleChangeFormData,
  }

  const selectSecondTeamProps = {
    countryCode: formData.secondTeam,
    teamId: 'secondTeam',
    teamScoreId: 'secondTeamScore',
    handleChangeFormData,
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

          <SelectTeam {...selectFirstTeamProps} />
          <VscClose className={style.versusIcon} />
          <SelectTeam {...selectSecondTeamProps} />

          <h1 className={style.title}>Data e horário do jogo</h1>
          <div className={style.flexCenter}>
            <div className={style.selectDatetimeContainer}>
              {rendersDaysOptions({ handleChangeFormData })}
              {rendersMonthsOptions({ handleChangeFormData })}
              {rendersYearsOptions({ handleChangeFormData })}
            </div>
            <div className={style.flexCenter}>
              {rendersHoursOptions({ handleChangeFormData })}
              <span className={style.twoPointsDivider}>:</span>
              {rendersMinutesOptions({ handleChangeFormData })}
            </div>
          </div>
          <button className={style.submitButton} type="button">
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
  versusIcon: `text-gray-200 text-3xl mx-5`,
  flexCenter: `flex items-center`,
  selectDatetimeContainer: `flex items-center gap-x-1 mr-4`,
  twoPointsDivider: `text-3xl font-bold mx-[2px]`,
  submitButton: `bg-yellow-500 mt-4 flex w-fit gap-x-2 justify-center items-center hover:brightness-110 text-gray-900 font-bold text-sm px-4 py-2 rounded`,
}

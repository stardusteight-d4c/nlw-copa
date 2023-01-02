import React from 'react'
import { useAppSelector } from '../../store/hooks'
import { selectUser } from '../../store/userSlice'

interface Props {
  participant: any
  index: any
}

export const RankingItem = ({ participant, index }: Props) => {
  const currentUser = useAppSelector(selectUser)

  return (
    <div className={style.wrapper}>
      <div className={style.flexContainer}>
        <div className={style.userInfos}>
          <img src={participant.user.avatarUrl} className={style.userImg} />
          <div>
            <h2 className={style.userName}>
              {participant.user.name}
              <span className={style.youSpan}>
                {currentUser?.email === participant.user.email && (
                  <span> (você)</span>
                )}
              </span>
            </h2>
            <span className={style.points}>{participant.points} ponto(s)</span>
          </div>
        </div>
        <div className={style.rankPosition}>{index + 1}º</div>
      </div>
    </div>
  )
}

const style = {
  wrapper: `bg-gray-800 border-b-[3px] p-6 border-b-yellow-500 w-[600px] mt-4 mx-auto rounded text-white shadow-xl`,
  flexContainer: `flex items-center justify-between`,
  userInfos: `flex gap-x-2 items-center`,
  userImg: `w-14 h-14 rounded-full`,
  userName: `text-xl font-bold`,
  youSpan: `!text-base font-medium text-gray-300`,
  points: `text-gray-300`,
  rankPosition: `text-center px-4 font-bold bg-yellow-500 rounded-full text-gray-900`,
}

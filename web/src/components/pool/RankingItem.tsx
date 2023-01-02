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
    <div className="bg-gray-800 border-b-[3px] p-6 border-b-yellow-500 w-[600px] mt-4 mx-auto rounded text-white shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex gap-x-2 items-center">
          <img
            src={participant.user.avatarUrl}
            className="w-14 h-14 rounded-full"
          />
          <div>
            <h2 className="text-xl font-bold">
              {participant.user.name}
              <span className="!text-base font-medium text-gray-300">
                {currentUser?.email === participant.user.email && (
                  <span> (você)</span>
                )}
              </span>
            </h2>
            <span className="text-gray-300">{participant.points} ponto(s)</span>
          </div>
        </div>
        <div className="text-center px-4 font-bold bg-yellow-500 rounded-full text-gray-900">
          {index + 1}º
        </div>
      </div>
    </div>
  )
}

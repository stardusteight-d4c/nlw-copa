import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { getParticipants } from '../services/api-routes'

interface Props {
  title: string
  code: string
  poolId: string
}

export function Pools({ title, code, poolId }: Props) {
  const [participants, setParticipants] = useState<any>([])

  useEffect(() => {
    ;(async () => {
      await api
        .get(getParticipants, {
          params: {
            poolId,
          },
        })
        .then(({ data }) => setParticipants(data))
        .catch((error) => console.log(error.toJSON()))
    })()
  }, [code])

  if (!participants.participants) {
    return <></>
  }

  return (
    <Link
      href={`/pool/${code}`}
      className="bg-gray-600 p-2 rounded border-b-[2px] border-yellow-500 cursor-pointer flex justify-between items-center"
    >
      <div className="flex-1 flex-grow">
        <h3 className="font-bold text-lg">{title}</h3>
        <span className="text-gray-200">Código: {code}</span>
      </div>
      <div className="relative items-center justify-center flex-grow -top-[18px]">
        {participants.participants.map((participant: any, index: any) => {
          const position = index === 0 ? 27 : (index + 1) * 27
          return (
            <img
              key={index}
              referrerPolicy="no-referrer"
              src={participant.user.avatarUrl}
              className="rounded-full w-10 h-10 absolute border-[2px] border-gray-600"
              style={{ right: position, zIndex: 4 - index }}
            />
          )
        })}
        <div className="rounded-full w-10 h-10 absolute z-10 right-1 flex items-center justify-center bg-[#29292E] border-[2px] border-gray-600 tracking-widest">
          {participants.count > 4
            ? `+${participants.count - 4}`
            : participants.count}
        </div>
      </div>
    </Link>
  )
}

import Link from 'next/link'
import React from 'react'

interface Props {
  title: string
  code: string
}

export function Pools({ title, code }: Props) {
  const last4participants = [
    { userImg: 'https://avatars.githubusercontent.com/u/87643260?v=4' },
    { userImg: 'https://avatars.githubusercontent.com/u/87643260?v=4' },
    { userImg: 'https://avatars.githubusercontent.com/u/87643260?v=4' },
    { userImg: 'https://avatars.githubusercontent.com/u/87643260?v=4' },
  ]

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
        {last4participants.map((user, index) => {
          const position = index === 0 ? 27 : (index + 1) * 27
          return (
            <img
              key={index}
              src={user.userImg}
              className="rounded-full w-10 h-10 absolute border-[2px] border-gray-600"
              style={{ right: position, zIndex: 4 - index }}
            />
          )
        })}
        <div className="rounded-full w-10 h-10 absolute z-10 right-1 flex items-center justify-center bg-[#29292E] border-[2px] border-gray-600 tracking-widest">
          +8
        </div>
      </div>
    </Link>
  )
}

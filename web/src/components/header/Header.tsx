import Link from 'next/link'
import React from 'react'
import { IoMdArrowBack } from 'react-icons/io'
import { AiOutlineTwitter } from 'react-icons/ai'

interface Props {}

export function Header(props: Props) {
  const last4participants = [
    { userImg: 'https://avatars.githubusercontent.com/u/87643260?v=4' },
    { userImg: 'https://avatars.githubusercontent.com/u/87643260?v=4' },
    { userImg: 'https://avatars.githubusercontent.com/u/87643260?v=4' },
    { userImg: 'https://avatars.githubusercontent.com/u/87643260?v=4' },
  ]

  return (
    <header className="h-fit text-white py-4 px-8 bg-gray-800">
      <div className="max-w-7xl w-full mx-auto flex justify-between items-center">
        <div className="flex justify-center items-center">
          <Link href="/">
            <IoMdArrowBack className="text-2xl m-2 cursor-pointer" />
          </Link>
          <div className="flex -mt-12 ml-2 justify-center items-center">
            <div className="h-fit w-[180px] flex relative">
              {last4participants.map((user, index) => {
                const position = index === 0 ? 32 : (index + 1) * 32
                return (
                  <img
                    src={user.userImg}
                    className="rounded-full w-12 h-12 absolute border-[2px] border-gray-600"
                    style={{ right: position, zIndex: 4 - index }}
                  />
                )
              })}
              <div className="rounded-full w-12 h-12 z-10 absolute text-white right-1 flex items-center justify-center bg-[#29292E] border-[2px] border-gray-600 tracking-widest">
                +8
              </div>
            </div>
          </div>
        </div>
        <div className="w-fit ml-[20px] text-center">
          <h3 className="font-bold text-lg">Bolão Xablau</h3>
          <span className="text-gray-200">Código: SAS5D45</span>
        </div>
        <Link
          target="_blank"
          href="https://twitter.com/intent/tweet?text=http%3A//localhost%3A3000/pool/SAS5D45"
          className="px-5 py-2 flex items-center justify-center bg-blue-500 rounded"
        >
          <AiOutlineTwitter className="text-2xl mr-2 cursor-pointer" />
          <span>Compartilhar no Twitter</span>
        </Link>
      </div>
    </header>
  )
}

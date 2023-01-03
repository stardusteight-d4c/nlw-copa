import Link from 'next/link'
import React from 'react'
import { IoMdArrowBack } from 'react-icons/io'
import { AiOutlineTwitter } from 'react-icons/ai'

interface Props {
  pool: Pool
  participants: any
}

export function Header({ pool, participants }: Props) {
  if (!participants.participants) {
    return <></>
  }

  const rendersParticipants = () => (
    <div className={style.participantsWrapper}>
      <div className={style.participantsContainer}>
        {participants.participants.map((participant: any, index: any) => {
          const position = index === 0 ? 32 : (index + 1) * 32
          return (
            <img
              key={index}
              src={participant.user.avatarUrl}
              className={style.avatarImg}
              style={{ right: position, zIndex: 4 - index }}
            />
          )
        })}
        <div className={style.participantsCount}>
          {participants.count > 4
            ? `+${participants.count - 4}`
            : participants.count}
        </div>
      </div>
    </div>
  )

  return (
    <header className={style.wrapper}>
      <div className={style.container}>
        <div className={style.leftItems}>
          <Link href="/">
            <IoMdArrowBack className={style.backIcon} />
          </Link>
          {rendersParticipants()}
        </div>
        <div className={style.centerItems}>
          <h3 className={style.poolTitle}>{pool.title}</h3>
          <span className={style.poolCode}>Código: {pool.code}</span>
        </div>
        <Link
          target="_blank"
          href={`https://twitter.com/intent/tweet?text=http%3A//localhost%3A3000/pool/${pool.code}`}
          className={style.rightItems}
        >
          <AiOutlineTwitter className={style.twitterIcon} />
          <span>Compartilhar no Twitter</span>
        </Link>
      </div>
    </header>
  )
}

const style = {
  wrapper: `h-fit text-white p-2 md:py-4 md:px-8 bg-gray-800`,
  container: `max-w-7xl w-full mx-auto flex justify-between items-center`,
  leftItems: `flex justify-center items-center`,
  centerItems: `w-fit md:ml-[20px] mx-auto md:mx-0 md:text-center`,
  rightItems: `px-5 py-2 hidden md:flex items-center justify-center bg-blue-500 rounded`,
  backIcon: `text-2xl m-2 cursor-pointer`,
  participantsWrapper: `hidden md:flex -mt-12 ml-2 justify-center items-center`,
  participantsContainer: `h-fit w-[180px] flex relative`,
  avatarImg: `rounded-full w-12 h-12 absolute border-[2px] border-gray-600`,
  participantsCount: `rounded-full w-12 h-12 z-10 absolute text-white right-1 flex items-center justify-center bg-[#29292E] border-[2px] border-gray-600 tracking-widest`,
  poolTitle: `font-bold text-lg`,
  poolCode: `text-gray-200`,
  twitterIcon: `text-2xl mr-2 cursor-pointer`,
}

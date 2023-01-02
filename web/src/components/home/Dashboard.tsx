import Image from 'next/image'
import React from 'react'
import preview from '../../assets/preview-mobile.png'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../services/firebase'
import { useAppSelector } from '../../store/hooks'
import { selectUser } from '../../store/userSlice'
import { ManagePanel } from './integrate/ManagePanel'

interface Props {}

export const Dashboard = (props: Props) => {
  const currentUser = useAppSelector(selectUser)

  const provider = new GoogleAuthProvider()

  const rendersAuthButtons = () => (
    <>
      {currentUser ? (
        <button
          onClick={() => auth.signOut()}
          className={`bg-red-600 ${style.authButton}`}
        >
          Sair
        </button>
      ) : (
        <button
          onClick={() => signInWithPopup(auth, provider)}
          className={`bg-blue-600 ${style.authButton}`}
        >
          Entrar com Google
        </button>
      )}
    </>
  )

  return (
    <section className={style.colSpan}>
      {rendersAuthButtons()}
      {currentUser ? (
        <ManagePanel />
      ) : (
        <Image src={preview} alt="preview/img" />
      )}
    </section>
  )
}

const style = {
  colSpan: `col-span-1 relative`,
  authButton: `hover:brightness-110 absolute -top-[205px] right-0 text-white font-bold text-sm uppercase px-6 py-4 rounded`,
}

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { BsSearch, BsBackspaceFill } from 'react-icons/bs'
import { Pools } from './Pools'
import preview from '../assets/preview-mobile.png'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../services/firebase'
import { useAppSelector } from '../store/hooks'
import { selectUser } from '../store/userSlice'
import { getUserPools, searchPoolByCode } from '../services/api-routes'
import { api } from '../lib/axios'

interface Props {}

export const Dashboard = (props: Props) => {
  const [search, setSearch] = useState(false)
  const [pools, setPools] = useState<[Pool] | []>([])
  const [searchTerm, setSearchTerm] = useState('')
  const currentUser = useAppSelector(selectUser)

  const provider = new GoogleAuthProvider()

  useEffect(() => {
    if (currentUser && !search) {
      ;(async () => {
        await api
          .get(`${getUserPools}/${currentUser?.id}`)
          .then(({ data }) => setPools(data.pools))
          .catch((error) => console.log(error.toJSON()))
      })()
    }
  }, [currentUser, search])

  useEffect(() => {
    if (search) {
      ;(async () => {
        await api
          .get(searchPoolByCode, {
            params: {
              code: searchTerm,
            },
          })
          .then(({ data }) => setPools(data.pool))
          .catch((error) => console.log(error.toJSON()))
      })()
    }
  }, [searchTerm, search])

  return (
    <section className="col-span-1 h-full">
      <div className="w-full flex items-end justify-end">
        {currentUser ? (
          <button
            onClick={() => auth.signOut()}
            className="bg-red-600 hover:brightness-110 text-white font-bold text-sm uppercase px-6 py-4 rounded"
          >
            Sair
          </button>
        ) : (
          <button
            onClick={() => signInWithPopup(auth, provider)}
            className="bg-blue-600 hover:brightness-110 text-white font-bold text-sm uppercase px-6 py-4 rounded"
          >
            Entrar com Google
          </button>
        )}
      </div>
      {currentUser ? (
        <div className="flex items-center justify-center h-full">
          <div className="bg-gray-800 rounded-md min-w-full text-white py-4 shadow-xl">
            <h1 className="text-center font-bold text-2xl mb-2">
              {search ? 'Procurar por código' : 'Meus boloẽs'}
            </h1>
            <div className="w-full px-4">
              <div>
                {search ? (
                  <div className="flex gap-x-2">
                    <input
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Insira o código do bolão"
                      className="outline-none grow text-gray-500 bg-gray-800 border border-gray-600 flex gap-x-2 justify-center items-center w-full brightness-110 text-sm px-6 py-4 rounded"
                    />
                    <button
                      className="bg-yellow-500 flex w-fit gap-x-2 justify-center items-center uppercase hover:brightness-110 text-gray-900 font-bold text-sm px-6 py-4 rounded"
                      type="button"
                      onClick={() => setSearch(false)}
                    >
                      <BsBackspaceFill className="text-lg" />
                      <span className="mt-[2px]">Voltar</span>
                    </button>
                  </div>
                ) : (
                  <button
                    className="bg-yellow-500 flex gap-x-2 justify-center items-center w-full uppercase hover:brightness-110 text-gray-900 font-bold text-sm px-6 py-4 rounded"
                    type="button"
                    onClick={() => setSearch(true)}
                  >
                    <BsSearch className="text-lg" />
                    <span className="mt-[2px]">Buscar bolão por código</span>
                  </button>
                )}
              </div>
              <div className="w-full h-[2px] bg-gray-600 px-4 mt-6 mb-4" />
              {pools !== undefined && pools !== null && pools.length > 0 ? (
                <>
                  <div className="space-y-2 max-h-[530px] overflow-y-scroll overflow-x-hidden py-2">
                    {pools.map((pool) => (
                      <Pools title={pool.title} code={pool.code} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="p-4 text-center">
                  {search ? (
                    <p>Digite um código válido e comece a apostar</p>
                  ) : (
                    <p>
                      Você ainda não está participando de nenhum bolão, que tal{' '}
                      <span className="text-yellow-500">
                        buscar um por código
                      </span>{' '}
                      ou <span className="text-yellow-500">criar um novo</span>?
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Image src={preview} alt="preview/img" />
      )}
    </section>
  )
}

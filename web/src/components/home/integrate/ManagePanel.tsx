import React, { useEffect, useState } from 'react'
import { BsSearch, BsBackspaceFill } from 'react-icons/bs'
import { getUserPools, poolByCode } from '../../../services/api-routes'
import { api } from '../../../lib/axios'
import { useAppSelector } from '../../../store/hooks'
import { selectUser } from '../../../store/userSlice'
import { Pools } from '../Pools'

interface Props {}

export const ManagePanel = (props: Props) => {
  const [search, setSearch] = useState(false)
  const [pools, setPools] = useState<[Pool] | []>([])
  const [searchTerm, setSearchTerm] = useState('')
  const currentUser = useAppSelector(selectUser)

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
          .get(poolByCode, {
            params: {
              code: searchTerm,
            },
          })
          .then(({ data }) => setPools(data.pool))
          .catch((error) => console.log(error.toJSON()))
      })()
    }
  }, [searchTerm, search])

  const rendersHandleSearch = () => (
    <>
      {search ? (
        <div className={style.searchContainer}>
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Insira o código do bolão"
            className={style.searchInput}
          />
          <button
            className={style.backButton}
            type="button"
            onClick={() => setSearch(false)}
          >
            <BsBackspaceFill className="text-lg" />
            <span className="mt-[2px]">Voltar</span>
          </button>
        </div>
      ) : (
        <button
          className={style.searchButton}
          type="button"
          onClick={() => setSearch(true)}
        >
          <BsSearch className="text-lg" />
          <span className="mt-[2px]">Buscar bolão por código</span>
        </button>
      )}
    </>
  )

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <h1 className={style.title}>
          {search ? 'Procurar por código' : 'Meus boloẽs'}
        </h1>
        <div className={style.contentContainer}>
          {rendersHandleSearch()}
          <div className={style.divider} />
          {pools !== undefined && pools !== null && pools.length > 0 ? (
            <div className={style.poolsContainer}>
              {pools.map((pool, index) => (
                <Pools
                  key={index}
                  poolId={pool.id}
                  title={pool.title}
                  code={pool.code}
                />
              ))}
            </div>
          ) : (
            <div className="p-4 text-center">
              {search ? (
                <p>Digite um código válido e comece a apostar</p>
              ) : (
                <p>
                  Você ainda não está participando de nenhum bolão, que tal{' '}
                  <span className={style.yellowText}>buscar um por código</span>{' '}
                  ou <span className={style.yellowText}>criar um novo</span>?
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const style = {
  wrapper: `flex items-center justify-center h-full`,
  container: `bg-gray-800 rounded-md min-w-full text-white py-4 shadow-xl`,
  title: `text-center font-bold text-2xl mb-2`,
  contentContainer: `w-full px-4`,
  searchContainer: `flex gap-x-2`,
  searchInput: `outline-none grow text-gray-500 bg-gray-800 border border-gray-600 flex gap-x-2 justify-center items-center w-full brightness-110 text-sm px-6 py-4 rounded`,
  backButton: `bg-yellow-500 flex w-fit gap-x-2 justify-center items-center uppercase hover:brightness-110 text-gray-900 font-bold text-sm px-6 py-4 rounded`,
  searchButton: `bg-yellow-500 flex gap-x-2 justify-center items-center w-full uppercase hover:brightness-110 text-gray-900 font-bold text-sm px-6 py-4 rounded`,
  divider: `w-full h-[2px] bg-gray-600 px-4 mt-6 mb-4`,
  poolsContainer: `space-y-2 max-h-[530px] overflow-y-scroll overflow-x-hidden py-2`,
  yellowText: `text-yellow-500`,
}

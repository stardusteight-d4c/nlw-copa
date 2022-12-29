import Head from 'next/head'
import Image from 'next/image'
import logo from '../assets/logo.svg'
import avatars from '../assets/avatars.png'
import check from '../assets/icon-check.svg'
import { api } from '../lib/axios'
import { FormEvent, useState } from 'react'
import { Dashboard } from '../components/Dashboard'

interface HomeProps {
  poolCount: number
  guessCount: number
  userCount: number
}

export default function Home(props: HomeProps) {
  const [pool, setPool] = useState('')

  async function createPool(event: FormEvent) {
    event?.preventDefault()

    try {
      const response = await api.post('/pools', {
        title: pool,
      })
      const { code } = response.data

      await navigator.clipboard.writeText(code)

      alert('Bolão criado, código copiado com sucesso')
      setPool('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='bg-app bg-cover bg-no-repeat'>
      <Head>
        <title>NLW Copa | Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-[1124px] pt-10 min-h-scree overflow-hidden mx-auto grid gap-28 grid-cols-2 items-center">
        <section className="col-span-1">
          <Image src={logo} alt="logo/nlw-copa" />
          <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
            Crie seu próprio bolão da copa e compartilhe entre amigos!
          </h1>
          <div className="mt-10 flex items-center gap-x-2">
            <Image
              src={avatars}
              width={150}
              height={50}
              alt="avatars-users/img"
            />

            <strong className="text-gray-100 text-xl">
              <span className="text-ignite-500 mr-2">+{props.userCount}</span>
              pessoas já estão usando
            </strong>
          </div>

          <form onSubmit={createPool} className="mt-10 flex gap-2">
            <input
              className="flex-1 text-gray-500 placeholder:text-sm outline-none px-6 py-4 rounded bg-gray-800 border border-gray-600"
              type="text"
              required
              onChange={(e) => setPool(e.target.value)}
              placeholder="Qual nome do seu bolão?"
              value={pool}
            />
            <button
              className="bg-yellow-500 hover:brightness-110 text-gray-900 font-bold text-sm uppercase px-6 py-4 rounded"
              type="submit"
            >
              Criar meu bolão
            </button>
          </form>

          <p className="mt-4 text-sm leading-relaxed text-gray-300">
            Após criar seu bolão, você receberá um código único que poderá usar
            para convidar outras pessoas 🚀
          </p>

          <div className="flex items-center justify-between mt-10 py-10 border-t border-gray-600 text-gray-100">
            <div className="flex items-center">
              <Image src={check} alt="check/icon" />
              <div className="flex flex-col items-start p-4">
                <span className="text-2xl font-bold">+{props.poolCount}</span>
                <span>Bolões criados</span>
              </div>
            </div>
            <div className="h-[63px] w-px bg-gray-600" />
            <div className="flex items-center">
              <Image src={check} alt="check/icon" />
              <div className="flex flex-col items-start p-4">
                <span className="text-2xl font-bold">+{props.guessCount}</span>
                <span>Palpites enviados</span>
              </div>
            </div>
          </div>
        </section>

        <Dashboard />
      </main>
    </div>
  )
}

export const getServerSideProps = async () => {
  const [poolCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api.get('pools/count'),
      api.get('guesses/count'),
      api.get('users/count'),
    ])

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },
  }
}

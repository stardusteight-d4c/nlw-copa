import Head from 'next/head'
import { Dashboard } from '../components/home/Dashboard'
import { Hero } from '../components/home/Hero'
import { api } from '../lib/axios'

interface Props {
  poolCount: number
  guessCount: number
  userCount: number
}

export default function Home(props: Props) {
  return (
    <div className={style.wrapper}>
      <Head>
        <title>NLW Copa | Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={style.mainContainer}>
        <Hero {...props} />
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

const style = {
  wrapper: `bg-app bg-cover bg-no-repeat h-screen`,
  mainContainer: `max-w-[1124px] pt-10 min-h-screen overflow-hidden mx-auto grid gap-28 grid-cols-2 items-center`,
}

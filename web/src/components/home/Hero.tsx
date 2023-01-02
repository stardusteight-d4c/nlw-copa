import Image from 'next/image'
import logo from '../../assets/logo.svg'
import avatars from '../../assets/avatars.png'
import check from '../../assets/icon-check.svg'
import { api } from '../../lib/axios'
import { FormEvent, useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import { selectUser } from '../../store/userSlice'
import { createPool } from '../../services/api-routes'

interface Props {
  poolCount?: number
  guessCount?: number
  userCount?: number
}

export const Hero = (props: Props) => {
  const [pool, setPool] = useState('')
  const currentUser = useAppSelector(selectUser)

  const handleCreatePool = async (event: FormEvent) => {
    event?.preventDefault()
    try {
      const response = await api.post(createPool, {
        title: pool,
        ownerId: currentUser?.id,
      })
      const { code } = response.data
      await navigator.clipboard.writeText(code)
      alert('Bolão criado, código copiado com sucesso')
      setPool('')
    } catch (error) {
      console.log(error)
    }
  }

  const rendersForm = () => (
    <form onSubmit={handleCreatePool} className={style.form}>
      <input
        className={style.input}
        type="text"
        required
        onChange={(e) => setPool(e.target.value)}
        placeholder="Qual nome do seu bolão?"
        value={pool}
      />
      <button className={style.submitButton} type="submit">
        Criar meu bolão
      </button>
    </form>
  )

  const rendersCallToAction = () => (
    <h2 className={style.callToActionText}>Entre e comece a apostar!</h2>
  )

  return (
    <section className={style.colSpan}>
      <Image src={logo} alt="logo/nlw-copa" />
      <h1 className={style.title}>
        Crie seu próprio bolão da copa e compartilhe entre amigos!
      </h1>
      <div className={style.userCountFlexContainer}>
        <Image src={avatars} width={150} height={50} alt="avatars-users/img" />
        <span className={style.userCountSpan}>
          <strong className={style.userCount}>+{props.userCount}</strong>
          pessoas já estão usando
        </span>
      </div>

      {currentUser ? rendersForm() : rendersCallToAction()}
      <p className={style.paragraph}>
        Após criar seu bolão, você receberá um código único que poderá usar para
        convidar outras pessoas 🚀
      </p>

      <footer className={style.footerContainer}>
        <div className={style.flexCenter}>
          <Image src={check} alt="check/icon" />
          <div className={style.flexColContainer}>
            <span className={style.spanCount}>+{props.poolCount}</span>
            <span>Bolões criados</span>
          </div>
        </div>
        <div className={style.divider} />
        <div className={style.flexCenter}>
          <Image src={check} alt="check/icon" />
          <div className={style.flexColContainer}>
            <span className={style.spanCount}>+{props.guessCount}</span>
            <span>Palpites enviados</span>
          </div>
        </div>
      </footer>
    </section>
  )
}

const style = {
  colSpan: `col-span-1`,
  title: `mt-14 text-white text-5xl font-bold leading-tight`,
  userCountFlexContainer: `mt-10 flex items-center gap-x-2`,
  userCountSpan: `text-white font-medium text-xl`,
  userCount: `text-ignite-500 mr-2`,
  form: `mt-10 flex gap-2`,
  input: `flex-1 text-gray-500 placeholder:text-sm outline-none px-6 py-4 rounded bg-gray-800 border border-gray-600`,
  submitButton: `bg-yellow-500 hover:brightness-110 text-gray-900 font-bold text-sm uppercase px-6 py-4 rounded`,
  callToActionText: `text-yellow-500 text-center font-bold text-4xl pt-4`,
  paragraph: `mt-4 text-sm leading-relaxed text-gray-300`,
  footerContainer: `flex items-center justify-between mt-10 py-10 border-t border-gray-600 text-gray-100`,
  flexCenter: `flex items-center`,
  flexColContainer: `flex flex-col items-start p-4`,
  spanCount: `text-2xl font-bold`,
  divider: `h-[63px] w-px bg-gray-600`,
}

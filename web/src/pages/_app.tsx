import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../store'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { login, logout } from '../store/userSlice'
import { auth } from '../services/firebase'
import { useAppDispatch } from '../store/hooks'
import { createUser } from '../services/api-routes'
import { api } from '../lib/axios'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <GetUserState />
      <Component {...pageProps} />
    </Provider>
  )
}

const GetUserState = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      user
        ? await api
            .post(createUser, {
              email: user.email,
              name: user.displayName,
              avatarUrl: user.photoURL,
            })
            .then(({ data }) => {
              dispatch(
                login({
                  id: data.user.id,
                  email: data.user.email,
                  name: data.user.name,
                  avatarUrl: data.user.avatarUrl,
                })
              )
            })
            .catch((error) => console.log(error.toJSON()))
        : dispatch(logout())
    })
  }, [])

  return <></>
}

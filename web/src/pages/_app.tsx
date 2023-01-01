import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../store'
import "react-datepicker/dist/react-datepicker.css";
import "react-date-picker/dist/DatePicker.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />{' '}
    </Provider>
  )
}

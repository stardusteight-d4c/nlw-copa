import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDMt7RlgzeNHqLss-H0kOY-1syiAhNd1xU',
  authDomain: 'nlw-copa-2362c.firebaseapp.com',
  projectId: 'nlw-copa-2362c',
  storageBucket: 'nlw-copa-2362c.appspot.com',
  messagingSenderId: '768234686224',
  appId: '1:768234686224:web:fdcd839490ee0428988795',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }

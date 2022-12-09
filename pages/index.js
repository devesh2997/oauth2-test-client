import Head from 'next/head'
import { login } from '../lib/auth'
export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create batao App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
      <button onClick={login}>Login</button>
      </main>

    </div>
  )
}

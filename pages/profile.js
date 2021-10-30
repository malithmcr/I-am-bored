import Head from 'next/head'
import { useUser } from '../hooks/useUser';
import { useEffect, useState } from 'react';

export default function Home() {
  const [activity, setActivity] = useState('');
  useUser({ redirectTo: '/', redirectIfFound: false})
  useEffect( async () => {
    const activity = await fetch('https://www.boredapi.com/api/activity/')
    .then((res)=> res.json())
    .then(data => setActivity(data.activity))
    
  }, [])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Login To The Boring App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Are you Bored? Then Do:
          
        </h1>
        <br />
        <br />
        <br />
        <p className="mt-3 text-2xl">
          {activity && activity}
        </p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <a
            href="/api/logout"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Logout &rarr;</h3>
            <p className="mt-4 text-xl">
              Get out of here
            </p>
          </a>

        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  )
}

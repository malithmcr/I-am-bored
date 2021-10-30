import { useState } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import {Magic} from 'magic-sdk';
import { useUser } from '../hooks/useUser';

export default function Home() {
  useUser({ redirectTo: '/profile', redirectIfFound: true})
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log(email);
    try{
      const magicSecret = process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY;
      const magic = new Magic(magicSecret);
      const didToken = await magic.auth.loginWithMagicLink({
        email: email
      });

      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + didToken
        },
        body: JSON.stringify({email: email})
      });

      if(res.status === 200){
        Router.push('/profile')
      }else{
        throw new Error(await res.text())
      }

      console.log(didToken);
    } catch (error) {
      console.log('Something went wrong', error)
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Login To The Boring App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a className="text-blue-600" href="https://nextjs.org">
            Boring!
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          Login to find something to do
        </p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <form onSubmit={handleSubmit}>
            <input onChange={(e) => setEmail(e.target.value)} className="p-2 border-2 w-60" type="email" placeholder="hello@hello.com" />
            <button className="p-2 border-2" type="submit" >Login or Signup</button>
          </form>
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
          Next.js | Magic | Internet
        </a>
      </footer>
    </div>
  )
}

import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { redirect } from "next/navigation"
import { useEffect } from 'react';
import { useCookies } from 'react-cookie'

const inter = Inter({ subsets: ['latin'] })

// export async function getServerSideProps(context: any){
  
// }

export function getServerSideProps(context: any){
  const [cookie, setCookie] = useCookies(['access_token']);
  if(!cookie.access_token) redirect("/login");
}

export default function Home() {
    
    useEffect(() => {
      
    });

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

      </main>
    </>
  )
}

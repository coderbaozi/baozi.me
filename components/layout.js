import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import NavBar from './NavBar'
import utilStyles from '../styles/utils.module.css'
import styles from '../styles/layout.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
const name = 'baozi'
export const siteTitle = `Baozi`
export default function Layout({children,home}){
  const [theme,setTheme] = useState('light')
  return (
    <div className='layout'>
      <NavBar themeState={{theme,setTheme}}></NavBar>
      <div className={styles.container}>
        <Head>
          <link rel='icon' href='/favicon.ico'/>
          <meta name="og:title" content={siteTitle} />
        </Head>
        <header className={styles.header}>
          {home ? (
            <>
              <Image
                priority
                src="/images/me.jpg"
                className={utilStyles.borderCircle}
                height={144}
                width={144}
                alt=""
              />
            </>
          ) : ''}
        </header>
        <main>
          {children}
        </main>
        {!home && useRouter().route!=`/blog`&&(
          <div className={styles.backToHome}>
            <Link href="/blog">cd ..</Link>
          </div>
        )}
      </div>
    </div>
  )
}
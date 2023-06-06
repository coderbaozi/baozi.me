import Head from 'next/head'
import Image from 'next/image'
import NavBar from './NavBar'
import utilStyles from '../styles/utils.module.css'
import styles from '../styles/layout.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
export const siteTitle = `Baozi`
export default function Layout({children,home}){
  const [theme,setTheme] = useState('light')
  const backPage = () => {
    history.back(-1)
  }
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
                height={120}
                width={120}
                alt=""
              />
            </>
          ) : ''}
        </header>
        <main>
          {children}
        </main>
        {!home && !['/blog','/project','/talks','/recoreds'].includes(useRouter().route)&&(
          <div className={styles.backToHome}>
            <span onClick={()=>{backPage()}}>cd ..</span>
          </div>
        )}
      </div>
    </div>
  )
}
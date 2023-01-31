import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import NavBar from './NavBar'
import utilStyles from '../styles/utils.module.css'
import styles from '../styles/layout.module.css'

const name = 'baozi'
export const siteTitle = `Baozi`
export default function Layout({children,home}){
  return (
    <div theme='light' className='layout'>
      <NavBar></NavBar>
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
        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">cd ..</Link>
          </div>
        )}
      </div>
    </div>
  )
}
import Link from 'next/link'
import Script from 'next/script'
import styles from '../styles/navbar.module.css'
import Icon from './Icon'
export default function NavBar(){
  return (
    <div className={styles.container}>
      <Link className={styles.logo} href='/'>
        baozi
      </Link>
      <nav className={styles.nav}>

        <Link href='/blog'>
          Blog
        </Link>

        <Link href='/project'>
          Projects
        </Link>

        <Link href='/talk'>
          Talks
        </Link>

        <Link href='https://github.com/coderbaozi'>
          <Icon name='github'></Icon>
        </Link>
        
        <Link href='love'>
          <Icon name='heart-fill'></Icon>
        </Link>
      </nav>
    </div>
  )
}
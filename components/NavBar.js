import Link from 'next/link'
import { useEffect } from 'react'
import styles from '../styles/navbar.module.css'
import Icon from './Icon'
export default function NavBar({themeState}){
  // toggle html theme attribute
  useEffect(()=>{
    document.documentElement.setAttribute('theme',localStorage.getItem('theme'))
  },[themeState.theme])

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
        
        <span onClick={() => handleThemeToggle(themeState)}>
          <Icon name='sun'></Icon>
        </span>
        
        <span href='love'>
          <Icon name='heart-fill'></Icon>
        </span>

      </nav>
    </div>
  )
}

function handleThemeToggle ({theme,setTheme}) {
  theme === 'light' ? setTheme('dark') : setTheme('light')
  localStorage.setItem('theme',theme)
}
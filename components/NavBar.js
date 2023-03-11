import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from '../styles/navbar.module.css'
import { Icon } from '@iconify/react';

export default function NavBar({themeState}){
  const [love,setLove] = useState(false)
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

        <div>
          <Link href='https://github.com/coderbaozi'>
            <Icon icon="iconoir:github-circle" />
          </Link>
        </div>

        <div>
          <a onClick={() => handleThemeToggle(themeState)}>
            <Icon icon='ph:sun-duotone' />
          </a>
        </div>

        <div>
          <a>
            <Icon className={love?styles.heart:''} onClick={() => handleClickLove({love,setLove})} icon={getleLove({love,setLove})} />
          </a>
        </div>

      </nav>
    </div>
  )
}

function handleThemeToggle ({theme,setTheme}) {
  theme === 'light' ? setTheme('dark') : setTheme('light')
  localStorage.setItem('theme',theme)
}

function getleLove({love}) { 
  if(!love) return 'mdi:cards-heart-outline'
  return 'mdi:cards-heart'
}

function handleClickLove({love,setLove}){
  if(!love) 
    setLove(true)
  else 
    setLove(false)
}
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

  function handleThemeToggle ({theme,setTheme},e) {
    const x = e.clientX
    const y = e.clientY
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )
    const transition = document.startViewTransition(() => {
      theme === 'light' ? setTheme('dark') : setTheme('light')  
      localStorage.setItem('theme',theme)
    })
    transition.ready.then(() => {
          const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
         ];
          document.documentElement.animate(
            {
              clipPath: theme === 'dark' ? clipPath.reverse() : clipPath
            },
            {
              duration: 400,
              easing: "ease-in",
              pseudoElement: theme==='dark' ? "::view-transition-old(root)" : "::view-transition-new(root)",
            }
          );
        });

  }
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
          <a onClick={(e) => handleThemeToggle(themeState,e)}>
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
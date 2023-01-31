import Link from 'next/link'
import style from '../styles/subnav.module.css'
import {useRouter} from 'next/router'
export default function SubNav() {
  return (
    <nav className={style.subnav}>
      <Link className={getCurrentRoute()==='/blog'?style.active:''} href='/blog'>
        Blog
      </Link>
      <Link className={getCurrentRoute()==='/talks'?style.active:''} href='/talks'>
        Talks
      </Link>
      <Link className={getCurrentRoute()==='/recoreds'?style.active:''} href='/recoreds'>
        Recoreds
      </Link>
    </nav>
  )
}

function getCurrentRoute(){
  return useRouter().route
}

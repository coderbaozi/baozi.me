import Link from 'next/link'
import style from '../styles/project.module.css'
import Icon from './Icon'
export default function Project({name,description,icon,repo,tech}) {
  return (
  <Link href={repo}>
    <div className={style.tech}>
      <span>{tech}</span>
    </div>
    <div className={style.project}>
      <span className={style.icon}>
        <Icon name={icon}></Icon>
      </span>
      <div>
        <h3 className={style.name}>{name}</h3>
        <p className={style.description}>{description}</p>
      </div>
    </div>
  </Link>
  )
}
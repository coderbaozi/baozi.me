import Giscus from '@giscus/react'
import { giscusConfig } from '../config/giscus'
import { useEffect, useState } from 'react'
export default function Comments() {
  const [theme, setTheme] = useState('dark')
  useEffect(() => {
    setTheme(localStorage.getItem('theme'))
  }, [])
  return (<div style={{ width: '99%' }}>
    <Giscus
      repo={giscusConfig.repo}
      repoId={giscusConfig.repoId}
      category={giscusConfig.category}
      categoryId={giscusConfig.categoryId}
      mapping="title"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={theme === 'dark' ? 'transparent_dark' : 'light'}
      loading="lazy"
    />
  </div>)

}
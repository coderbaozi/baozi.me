import Layout from "../../components/layout"
import Project from "../../components/Project"
import style from '../../styles/listproject.module.css'
export default function ProjectList() {
  return (
    <Layout>
      <div className={style.header}>
        <h1 className={style.headline}>Projects</h1>
        <i className={style.about}>A collection of individual works</i>
      </div>
      
      <div className={style.mark}>Game</div>
      <div className={style.projectsarea}>
        <Project repo='https://github.com/coderbaozi/react-tic-tac-toe' name='Tic-Tac-Toe' tech='React' icon='jingziqi' description='A sample game for Learn React'></Project>
      </div>

      <div className={style.mark}>Function</div>
      <div className={style.projectsarea}>
        <Project repo='https://github.com/coderbaozi/baozi-Navigation' name='Navigation' tech='Vue' icon='search' description='A convenient tab start page'></Project>
        <Project repo='https://github.com/coderbaozi/sampleSystem' name='sampleSystem' tech='Vue' icon='admin' description='TypeScript-based background management system'></Project>
      </div>

      <div className={style.mark}>Learn</div>
      <div className={style.projectsarea}>
        <Project repo='https://github.com/coderbaozi/vue-question' name='vue-question' tech='' icon='question' description='Project issue gathered some Front End konwledge'></Project>
      </div>
    </Layout>
  )
}
import Layout from "../../components/layout";
import Project from "../../components/Project";
import style from "../../styles/listproject.module.css";
export default function ProjectList() {
  return (
    <Layout>
      <div className={style.header}>
        <h1 className={style.headline}>Projects</h1>
        <i className={style.about}>A collection of individual works</i>
      </div>

      <div className={style.mark}>tools chian</div>
      <div className={style.projectsarea}>
      <Project
          repo="https://github.com/coderbaozi/mini-icons"
          name="mini-icons"
          icon="jingziqi"
          description="svg to Jsx/Tsx plugin for vite"
        ></Project>
        <Project
          repo="https://github.com/coderbaozi/bollo-lite"
          name="bollo-lite"
          icon="jingziqi"
          description="Web application rapid development template"
        ></Project>
        <Project
          repo="https://github.com/coderbaozi/bollo-cli"
          name="bollo-cli"
          icon="jingziqi"
          description="A CLI to quickly develop your application"
        ></Project>
      </div>

      <div className={style.mark}>Classic</div>
      <div className={style.projectsarea}>
      <Project
          repo="https://github.com/coderbaozi/cs-link"
          name="cs-link"
          icon="search"
          description="A community for major in cs"
        ></Project>
        <Project
          repo="https://github.com/coderbaozi/nav"
          name="nav"
          icon="search"
          description="A convenient tab start page"
        ></Project>
        <Project
          repo="https://github.com/coderbaozi/sampleSystem"
          name="sampleSystem"
          icon="admin"
          description="TypeScript-based background management system"
        ></Project>
      </div>

      <div className={style.mark}>Toys</div>
      <div className={style.projectsarea}>
      <Project
          repo="https://github.com/coderbaozi/awasome-avatar"
          name="awasome-avatar"
          icon="jingziqi"
          description="Help you generate an unique avatar"
        ></Project>
        <Project
          repo="https://github.com/coderbaozi/dev100"
          name="dev100"
          icon="jingziqi"
          description="100 challenges"
        ></Project>
        <Project
          repo="https://github.com/coderbaozi/react-tic-tac-toe"
          name="Tic-Tac-Toe"
          icon="jingziqi"
          description="A sample game for Learn React"
        ></Project>

      </div>
    </Layout>
  );
}

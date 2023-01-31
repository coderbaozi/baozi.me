import Layout from "../../components/layout"
import Date from "../../components/date"
import Link from 'next/link'
import stylesPost from '../../styles/listPost.module.css'
import { getSortedPostsData } from "../../utils/posts"
import SubNav from "../../components/SubNav"
export default function ListPosts({postsData}) {
  return (
    <Layout>
      <SubNav></SubNav>
      <ul>
        {postsData.map((data,index) => {
          return (
            <div key={index}>
            {!isSameYear(data.date,postsData[index-1]?.date)?
              (
                <div className={stylesPost.year}>
                  <span>{getpostYear(data.date)}</span>
                </div>
              ):''}
            <li className={stylesPost.blog} key={data.id}>
              <Link href={`blog/${data.id}`}>
              <p className={stylesPost.title}>{data.title}</p>
              <p className={stylesPost.date}>
                <Date dateString={data.date}></Date>
              </p>
              </Link>
            </li>
            </div>
          )
          })
        }
      </ul>
    </Layout>
  )
}

export async function getStaticProps() {
  const postsData = await getSortedPostsData()
  return {
    props: {
      postsData
    }
  }
}

function getpostYear(date) {
  return date.slice(0,4)
}

function isSameYear(a, b) {
  return a && b && getpostYear(a) === getpostYear(b)
}
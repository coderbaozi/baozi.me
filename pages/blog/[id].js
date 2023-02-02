import Layout from "../../components/layout"
import Date from "../../components/date";
import Head from 'next/head';
import { getAllPostIds ,getPostData } from "../../utils/posts"
import utilStyles from '../../styles/utils.module.css'
export default function Post({postData}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <article className='markdown'>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
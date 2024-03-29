import Layout from "../../components/layout"
import Date from "../../components/date";
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css'
import PostUtil from "../../utils/post"
import Comment from "../../components/comment"

const postUtil = new PostUtil('talk')
export default function Post({ postData }) {
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
      <Comment />
    </Layout>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = postUtil.getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const postData = await postUtil.getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
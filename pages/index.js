import Head from 'next/head';
import Layout, {siteTitle} from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import {parseProfileMd} from '../utils/parse'

export default function Home({profileData}) {
  return (
    <>
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
          <h1 className={utilStyles.headingXl}>{profileData.title}</h1>
          <article className='markdown'>
            <div dangerouslySetInnerHTML={{ __html: profileData.contentHtml }} />
          </article>
        </section>
      </Layout>
    </>

  );
}

export async function getStaticProps() {
  // Fetch necessary data for the blog post using params.id
  const profileData = await parseProfileMd()
  return {
    props: {
      profileData,
    },
  };
}

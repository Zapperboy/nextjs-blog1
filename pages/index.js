import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Minesweeper from '../components/Minesweeper'; // Import Minesweeper component here

export default function Home({ allPostsData }) {
  return (
    <div>
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
          <p>Hii my name is Ruben</p>
          <p>
            See Me On <a href="https://www.instagram.com/_ruben_143/">instagram</a>.
          </p>
        </section>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Blog</h2>
          <ul className={utilStyles.list}>
            {allPostsData.map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>{title}</Link>
                <br />
                <small className={utilStyles.lightText}>
                  {/* <Date dateString={date} /> */}
                </small>
              </li>
            ))}
          </ul>
        </section>
        <Link href="/newpage">Play a quick game</Link>
        <Link href="/newpage2"> and here is a new game</Link>
        <Minesweeper />
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

// export default function Home({ allPostsData }) {
//   return (
//     <Layout home>
//       <Head>
//         <title>{siteTitle}</title>
//       </Head>
//       <section className={utilStyles.headingMd}>
//         <p>Hii my name is Ruben</p>
//         <p>
//           See Me On
//           <a href="https://www.instagram.com/_ruben_143/"> instagram</a>.
//         </p>
//       </section>
//       <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
//         <h2 className={utilStyles.headingLg}>Blog</h2>
//         <ul className={utilStyles.list}>
//           {allPostsData.map(({ id, date, title }) => (
//             <li className={utilStyles.listItem} key={id}>
//             <Link href={`/posts/${id}`}>{title}</Link>
//             <br />
//             <small className={utilStyles.lightText}>
//               <Date dateString={date} />
//             </small>
//           </li>
//           ))}
//         </ul>
//       </section>
//       <Link href={`/newpage`}>Play a quick game</Link>
//     <Link href={`/newpage2`}> and here is a nuwe game</Link>
//     </Layout>
//   );
// }
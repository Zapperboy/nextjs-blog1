import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

function getSortedPostsData() {
  return [
    { id: 1, date: '2023-07-31', title: 'Blog Post 1' },
    { id: 2, date: '2023-07-30', title: 'Blog Post 2' },
    // Add more blog posts here...
  ];
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hii my name is Ruben</p>
        <p>
          See Me On
          <a href="https://www.instagram.com/_ruben_143/"> instagram</a>.
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
                {/* Assuming you have a component called `Date` to format the date */}
                {/* If not, replace this with your preferred method of displaying the date */}
                {date}
              </small>
            </li>
          ))}
        </ul>
      </section>
      <Link href={`/newpage`}>Play a quick game</Link>

      <Link href={`/newpage2`}> and here is a diffrent game</Link>
    </Layout>
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
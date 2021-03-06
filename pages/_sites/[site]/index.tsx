import type {
  GetStaticPropsContext,
  GetStaticPathsContext,
  NextPage,
} from "next";
import Head from "next/head";
import styles from "../../../styles/Home.module.css";

export interface HomeInterface {
  site: string;
}

const Home: NextPage<HomeInterface> = ({ site }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{site}</h1>
      </main>
    </div>
  );
};

export async function getStaticPaths(context: GetStaticPathsContext) {
  return {
    paths: [
      {
        params: { site: "test" },
      },
      {
        locale: "de",
        params: { site: "test" },
      },
    ],
    fallback: "blocking",
  };
}

export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext<{ site: string }>) {
  // In case of / - root, render homepage
  return {
    props: {
      site: params?.site || "unknown site",
      pageType: "home",
    },
    revalidate: 60,
  };
}

export default Home;

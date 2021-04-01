import Head from "next/head";
import styles from "../styles/Home.module.css";

import { Node } from "../components/Node";
import { TreeList } from "../components/TreeList";

export default function Home({ nodes }: Node[]) {
  return (
    <div className={styles.container}>
      <Head>
        <title>TreeList demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <TreeList nodes={nodes} />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const nodes: Node[] = [
    {
      name: "parent 1",
    },
    {
      name: "parent 2",
      children: [
        {
          name: "chlid 1",
        },
        {
          name: "child 2",
          children: [
            {
              name: "grandchild 1",
            },
            {
              name: "grandchild 2",
            },
          ],
        },
      ],
    },
    {
      name: "parent 3",
    },
  ];

  return { props: { nodes } };
};

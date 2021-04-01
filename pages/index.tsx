import Head from "next/head";
import styles from "../styles/Home.module.css";

import { Node } from "../components/Node";
import { TreeList } from "../components/TreeList";

export default function Home({ nodes }: Node[]) {
  return (
    <div className="flex flex-col h-screen justify-center items-center px-2 py-0">
      <Head>
        <title>TreeList demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col flex-1 pt-20 py-2 min-w-full">
        <div className="mx-20">
          <TreeList nodes={nodes} />
        </div>
      </main>

      <footer className="w-full h-24 border-t border-gray-200 flex justify-center items-center">
        <a
          className="flex justify-center items-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className="ml-4 h-4" />
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

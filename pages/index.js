import Head from "next/head";
import { getPosts } from "lib/data";
import prisma from "lib/prisma";
import Posts from "components/Posts";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export async function getServerSideProps() {
  let posts = await getPosts(prisma);
  posts = JSON.parse(JSON.stringify(posts));

  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }) {
  const { data: session, status } = useSession();
  console.log("session -->", session);
  console.log("status -->", status);
  const router = useRouter();

  const loading = status === "loading";

  if (loading) {
    return <p>loading...</p>;
  }

  if (session && !session.user.name) {
    // console.log("session", session);
    router.push("/setup");
  }
  return (
    <div>
      <Head>
        <title>Reddit Clone</title>
        <meta name="description" content="A great social network!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-black text-white h-12 flex pt-3 px-5 pb-2">
        <p>Reddit clone</p>
        <p className="grow"></p>
        <a
          className="flex-l border px-4 font-bold rounded-full mb-1"
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
        >
          {session ? "logout" : "login"}
        </a>
      </header>

      <Posts posts={posts} />
    </div>
  );
}

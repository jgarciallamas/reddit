export async function getPosts(prisma) {
  const posts = await prisma.post.findMany({
    where: {},
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      author: true,
    },
  });
  return posts;
}

export const getSubreddit = async (name, prisma) => {
  const subreddit = await prisma.subreddit.findUnique({
    where: {
      name,
    },
  });
  console.log("subreddit -->", subreddit);
  return subreddit;
};

export const getPostsFromSubreddit = async (subreddit, prisma) => {
  const posts = await prisma.post.findMany({
    where: {
      subreddit: {
        name: subreddit,
      },
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      author: true,
    },
  });
  return posts;
};

export const getPost = async (id, prisma) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
      comments: {
        orderBy: [
          {
            id: "desc",
          },
        ],
        include: {
          author: true,
        },
      },
    },
  });
  console.log("post -->", post);
  return post;
};

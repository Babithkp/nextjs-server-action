import { PrismaClient } from "@prisma/client";import { Post } from "../page";
import { commentAction } from "../action";
const prisma = new PrismaClient();


export async function generateStaticParams() {
  const response = await prisma.post.findMany({
    include: {
      Comments: true,
    },
  });
  return response.map((post: Post) => ({
    id: post.id,
  }));
}

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const post = (await prisma.post.findUnique({
    where: {
      id: (await params).id,
    },
    include: {
      Comments: true,
    },
  })) as Post;
  return (
    <main className="flex flex-col items-center justify-center p-10 gap-5">
      <h1 className="text-2xl font-bold ">{post.title}</h1>
      <p className="text-lg">{post.content}</p>
      <p>{post.Comments.length} Comments</p>
      {post.Comments.map((comment) => (
        <a
          className="text-sm shadow rounded-lg p-5 w-3/4"
          key={comment.id}
          href={`/${post.id}/${comment.id}`}
        >
          {comment.content}
        </a>
      ))}
      <form action={commentAction} className="flex flex-col gap-2 w-3/4">
        <input
          name="postId"
          value={post.id}
          type="hidden"
          className="border-2 border-black rounded-lg"
        />
        <textarea
          name="content"
          className="border-2 border-black rounded-lg"
        ></textarea>
        <button className="bg-black text-white rounded-lg p-2">
          Create Comment
        </button>
      </form>
    </main>
  );
}

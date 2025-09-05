import Card from "@/components/Card";
import { postAction } from "./action";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export interface Post {
  id: string;
  title: string;
  content: string;
  Comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
}

export default async function Home() {
  const posts = (await prisma.post.findMany({
    include: {
      Comments: true,
    },
  })) as Post[];
  return (
    <main className="flex flex-col items-center justify-center gap-5">
      {posts.map((post) => (
        <Card key={post.id} post={post} />
      ))}
      <form action={postAction} className="flex flex-col gap-2 w-3/4">
        <input
          name="title"
          type="text"
          className="border-2 border-black rounded-lg"
        />
        <textarea
          name="content"
          className="border-2 border-black rounded-lg"
        ></textarea>
        <button className="bg-black text-white rounded-lg p-2">Submit</button>
      </form>
    </main>
  );
}

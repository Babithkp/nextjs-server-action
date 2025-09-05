
import { Comment } from "@/app/page";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function generateStaticParams() {
  const response = await prisma.comment.findMany({
    include: {
      post: true,
    },
  });
  return response.map((comment: Comment) => ({
    id: comment.id,
    commentId: comment.id,
  }));
}

export default async function page({
    params,
  }: {
    params: Promise<{ id: string, commentId: string }>;
  }) {
    const comment = (await prisma.comment.findUnique({
      where: {
        id: (await params).commentId,
      },
    })) as Comment;
  return (
    <div>{comment.content}</div>
  )
}

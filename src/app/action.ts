"use server";
import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function postAction(formdata: FormData) {
  const title = formdata.get("title") as string;
  const content = formdata.get("content") as string;

  await prisma.post.create({
    data: {
      title: title,
      content: content,
    },
  });
  revalidatePath("/");
}

export async function commentAction(formdata: FormData) {
    const content = formdata.get("content") as string;
    const postId = formdata.get("postId") as string;
    await prisma.comment.create({
        data: {
            content: content,
            postId: postId,
        },
    });
    revalidatePath(`/${postId}`);
}
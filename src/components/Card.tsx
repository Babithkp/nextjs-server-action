"use client";import { Post } from "@/app/page";
import { useRouter } from "next/navigation";
export default function Card({ post }: { post: Post }) {
  const rounter = useRouter();
  return (
    <div
      onClick={() => rounter.push(`/${post.id}`)}
      className="p-5  rounded-lg shadow w-3/4 gap-2 cursor-pointer"
    >
      <h1 className="text-2xl font-bold ">{post.title}</h1>
      <p className="text-sm">{post.content}</p>
      <p>{post.Comments.length} Comments</p>
    </div>
  );
}

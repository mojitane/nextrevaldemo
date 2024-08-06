import { RevalButton } from "@/app/button";
import Link from "next/link";

export const dynamicParams = true; // should a page still render when it is not part of the generated pages?

export async function generateStaticParams() {
  const data = await fetch("https://dummyjson.com/todos/").then((res) =>
    res.json()
  );

  return data.todos.map((todo: any) => ({
    id: String(todo.id),
  }));
}

export default async function BlogArticle({
  params,
}: {
  params: { id: string };
}) {
  const data = await fetch(`https://dummyjson.com/todos/${params.id}`, {
    next: { tags: ["todos", `todo-${params.id}`] },
  })
    .then((res) => res.json())
    .then((i) => {
      return { ...i, timestamp: new Date().toISOString() };
    });

  return (
    <main className="p-6">
      <div>
        <div className="bg-slate-800 text-white rounded text-xs mb-2 inline-block p-2">
          page generated at: {data.timestamp}
        </div>
      </div>
      <div className="mb-4">
        <RevalButton tag={`todo-${data.id}`} />
      </div>
      <div className="p-4 bg-slate-50 rounded-xl mb-12">
        <h1 className="text-xl">
          {data.id} – {data.todo}
        </h1>
        <p>{data.completed ? "is completed" : "not completed yet"}</p>
      </div>
      <Link href="/" className="hover:underline text-blue-600">
        Go back to list
      </Link>
    </main>
  );
}

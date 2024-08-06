import Link from "next/link";

export default async function Home() {
  const timestamp = new Date();
  const data = await fetch("https://dummyjson.com/todos", {
    next: { tags: ["todos"] },
  }).then((res) => res.json());

  return (
    <main className="p-6">
      <div className="bg-slate-800 text-white rounded text-xs mb-8 inline-block p-2">
        page generated at: {timestamp.toISOString()}
      </div>
      <ul className="space-y-2">
        {data.todos.map((todo: any) => (
          <li key={todo.id}>
            <Link
              href={`todo/${todo.id}`}
              className={`${
                todo.completed ? "line-through" : ""
              } hover:underline text-blue-600`}
            >
              {todo.todo}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

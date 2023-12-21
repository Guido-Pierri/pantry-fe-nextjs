import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
<div className="flex flex-col items-center justify-center">

        <h1 className="text-4xl font-bold  text-center mt-8">
          Welcome to Pantry Partner!
        </h1>
        <p className="text-xl text-center mt-4 ">
            manage groceries and minimize food waste
        </p>

    <Link href="/dashboard">Dashboard</Link>
        </div>
    </main>
  )
}

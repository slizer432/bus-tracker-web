import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-indigo-50 text-gray-700 min-h-screen p-5">
      <div className="flex">
        <img src="/Logo.svg" alt="Logo" />
        <div>
          <h2 className="text-lg font-bold m-0 text-blue-800">Kinetic Fleet</h2>
          <p className="flex-col flex mb-0 text-xs">TERMINAL ALPHA</p>
        </div>
      </div>

      <nav className="flex flex-col gap-3">
        <Link href="/dashboard" className="bg-white p-2 rounded">
          Dashboard
        </Link>
        <Link
          href="#"
          className="hover:bg-white p-2 rounded hover:text-blue-800 font-medium"
        >
          Active Routes
        </Link>
        <Link
          href="#"
          className="hover:bg-white p-2 rounded hover:text-blue-800 font-medium"
        >
          Terminal Hub
        </Link>
        <Link
          href="#"
          className="hover:bg-white p-2 rounded hover:text-blue-800 font-medium"
        >
          Maintenance
        </Link>
      </nav>

      <button className="mt-10 bg-blue-600 w-full py-2 rounded">
        Export Fleet Data
      </button>
    </aside>
  );
}

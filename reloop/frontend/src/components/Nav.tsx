import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <header className="border-b border-slate-200 dark:border-slate-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600 text-sm text-white">
            R
          </span>
          Reloop
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="/#pricing" className="hover:text-slate-900 dark:hover:text-white">
            Pricing
          </a>
          <Link
            to="/app"
            className="rounded-md bg-indigo-600 px-4 py-2 text-white shadow-sm hover:bg-indigo-500"
          >
            Try it free
          </Link>
        </nav>
      </div>
    </header>
  );
}

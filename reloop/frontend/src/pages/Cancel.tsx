import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <div className="mx-auto max-w-lg px-6 py-24 text-center">
      <h1 className="text-2xl font-bold">Checkout canceled</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        No worries — you can keep using the free plan or upgrade any time.
      </p>
      <Link
        to="/app"
        className="mt-6 inline-block rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
      >
        Back to the tool
      </Link>
    </div>
  );
}

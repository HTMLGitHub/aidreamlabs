export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
      <p>© {new Date().getFullYear()} Reloop. Built for creators and marketers who don't have time to repost by hand.</p>
    </footer>
  );
}

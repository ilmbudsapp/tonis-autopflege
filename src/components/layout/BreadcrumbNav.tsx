import { Link, useLocation } from "react-router-dom";
import { getBreadcrumbItems } from "@/lib/breadcrumbs";
import { ROUTES } from "@/lib/site";

export default function BreadcrumbNav() {
  const { pathname } = useLocation();
  const items = getBreadcrumbItems(pathname);

  if (pathname === ROUTES.home || pathname === "" || items.length < 2) {
    return null;
  }

  return (
    <nav
      aria-label="Brotkrumen-Navigation"
      className="mx-auto max-w-7xl px-5 pb-4 pt-2 sm:px-6 md:px-8"
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-500 md:text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {index > 0 && (
                <span className="text-zinc-600" aria-hidden>
                  /
                </span>
              )}
              {isLast ? (
                <span className="font-medium text-[#d4b84a]" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="underline-offset-2 transition hover:text-zinc-300 hover:underline"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

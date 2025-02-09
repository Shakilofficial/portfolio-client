"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const NavItems = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col text-center md:flex-row md:space-x-4 space-y-2 md:space-y-0">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={` transition-colors hover:text-primary ${
            pathname === item.href ? "text-purple-500" : "text-muted-foreground"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default NavItems;

"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  ChevronLeft,
  ChevronRight,
  FileText,
  LayoutDashboard,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "../shared/Logo";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/dashboard/projects", icon: Briefcase },
  { name: "Blogs", href: "/dashboard/blogs", icon: FileText },
  { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "relative flex flex-col bg-purple-950/10 h-full transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && <Logo />}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-2 px-2 pt-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                pathname === item.href
                  ? "bg-purple-500 text-white"
                  : "hover:bg-muted-foreground/10"
              )}
            >
              <item.icon className="h-4 w-4" />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;

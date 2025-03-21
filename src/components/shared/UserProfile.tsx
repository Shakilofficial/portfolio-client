"use client";

import { useUser } from "@/context/UserContext";
import { logoutUser } from "@/services/authService";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setIsLoading, user } = useUser();
  const router = useRouter();

  const handleLogOut = async () => {
    await logoutUser();
    setIsLoading(true);
    router.push("/login");
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger>
        <Avatar className="h-8 w-8 border-2 border-primary/20 transition-all duration-200 hover:border-primary/50">
          <AvatarImage src={user?.profileImage} alt={user?.name} />
          <AvatarFallback className="bg-primary/10 text-primary font-medium">
            {user?.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 p-2 border border-border/50 shadow-lg bg-card/95 backdrop-blur-sm"
      >
        <DropdownMenuLabel className="px-2 py-1.5">
          <div className="flex flex-col gap-1">
            <div className="font-medium">{user?.name}</div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{user?.role}</Badge>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-1.5" />

        <DropdownMenuItem
          asChild
          className="flex items-center gap-2 px-2 py-1.5 cursor-pointer"
        >
          <Link href="/profile">
            <User className="h-4 w-4 mr-2 text-primary" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1.5" />
        <DropdownMenuItem
          className="flex items-center gap-2 px-2 py-1.5 cursor-pointer text-destructive hover:text-destructive focus:text-destructive"
          onClick={handleLogOut}
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;

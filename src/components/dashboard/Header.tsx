"use client";

import { Button } from "@/components/ui/button";
import ModeToggle from "../shared/ModeToggle";
import Profile from "./Profile";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      <div className="flex items-center gap-4"></div>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <Button variant="link" size="icon">
          <Profile />
        </Button>
      </div>
    </header>
  );
};

export default Header;

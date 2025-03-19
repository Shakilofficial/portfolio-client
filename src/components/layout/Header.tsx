"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import ThemeToggle from "../shared/ThemeToggle";
import UserProfile from "../shared/UserProfile";
import { Badge } from "../ui/badge";

const Header = () => {
  return (
    <motion.header
      className="flex items-center justify-between px-6 py-4 border-b backdrop-blur-md bg-background/70 sticky top-0 z-30 py-"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-4"></div>
      <div className="flex items-center gap-5">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
              3
            </Badge>
          </Button>
        </motion.div>

        <ThemeToggle />

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button asChild variant="ghost" size="icon" className="rounded-full">
            <UserProfile />
          </Button>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;

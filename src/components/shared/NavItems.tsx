/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useState } from "react"

const navItems = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/projects", label: "Projects", icon: "💼" },
  { href: "/blogs", label: "Blogs", icon: "✏️" },
  { href: "/contact", label: "Contact", icon: "📧" },
]

type NavItemsProps = {
  mobile?: boolean
  setIsOpen?: (value: boolean) => void
}

const NavItems = ({ mobile = false, setIsOpen }: NavItemsProps) => {
  const pathname = usePathname()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const handleLinkClick = () => {
    if (mobile && setIsOpen) {
      setIsOpen(false)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  if (mobile) {
    return (
      <motion.div
        className="py-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {navItems.map((item, index) => {
          const isActive = pathname === item.href
          
          return (
            <motion.div
              key={item.href}
              variants={itemVariants}
              className="mb-6 last:mb-0"
            >
              <Link
                href={item.href}
                onClick={handleLinkClick}
                className={`relative flex items-center p-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800/60"
                }`}
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 mr-3">
                  <span className="text-lg">{item.icon}</span>
                </span>
                
                <div className="flex flex-col">
                  <span className="text-base font-medium">{item.label}</span>
                  {isActive && (
                    <span className="text-xs text-muted-foreground">
                      Currently viewing
                    </span>
                  )}
                </div>
                
                {isActive && (
                  <motion.div
                    layoutId="activeIndicatorMobile"
                    className="absolute right-3 w-2 h-full flex items-center"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </motion.div>
                )}
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    )
  }

  return (
    <div className="flex items-center space-x-1 md:space-x-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        const isHovered = hoveredItem === item.href
        
        return (
          <div key={item.href} className="relative">
            <Link
              href={item.href}
              className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-md flex items-center ${
                isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
              onMouseEnter={() => setHoveredItem(item.href)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {item.label}
              
              {/* Hover effect */}
              {isHovered && !isActive && (
                <motion.span
                  layoutId="hoverIndicator"
                  className="absolute inset-0 rounded-md bg-slate-100 dark:bg-slate-800/60 -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/60"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default NavItems

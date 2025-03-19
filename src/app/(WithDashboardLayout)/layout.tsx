"use client"

import Header from "@/components/layout/Header"
import Sidebar from "@/components/layout/Sidebar"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface Props {
  children: ReactNode
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-background to-background/95 dark:from-background dark:to-background/95">
      {/* Background decorative elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <Sidebar />

      <motion.div
        className="flex flex-col flex-1 overflow-hidden relative z-10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </main>
      </motion.div>
    </div>
  )
}

export default DashboardLayout


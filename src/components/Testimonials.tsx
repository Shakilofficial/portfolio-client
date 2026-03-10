/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion, useInView, useScroll, useSpring, useTransform } from "framer-motion"
import { ChevronLeft, ChevronRight, Pause, Play, Quote, Star, User } from "lucide-react"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"

// Type definitions
interface Testimonial {
  id: string
  name: string
  position: string
  company: string
  avatar: string | null
  rating: number
  testimonial: string
  project: string
  color: string
  accentColor: string
}

interface FloatingElementProps {
  delay?: number
  duration?: number
  className?: string
}

interface StarRatingProps {
  rating: number
}

interface TestimonialSlideProps {
  testimonial: Testimonial
  isActive: boolean
}

interface TestimonialThumbnailProps {
  testimonial: Testimonial
  isActive: boolean
  onClick: () => void
  index: number
}

// Mock testimonials data
const testimonialsData: Testimonial[] = [
  {
    id: "1",
    name: "Naahid Tonmoy",
    position: "Co-Founder",
    company: "LuminaPTE",
    avatar: null,
    rating: 5,
    testimonial:
      "Shakil played a key role in building the backend infrastructure for LuminaPTE. Our platform required a complex system for courses, mock exams, analytics, and user management, and he handled it with great attention to scalability and structure. What I appreciated most was how he understood the product vision and translated it into a clean, maintainable system.",
    project: "LuminaPTE SaaS Learning Platform",
    color: "from-indigo-500 to-purple-600",
    accentColor: "#6366f1",
  },
  {
    id: "2",
    name: "Mohammad Abdullah Al Mujahid",
    position: "Founder and Owner",
    company: "Happy Supply Chain",
    avatar: null,
    rating: 5,
    testimonial:
      "Our FMCG distribution process used to rely heavily on manual coordination between sales reps, warehouse teams, and delivery staff. Shakil helped us transform that workflow into a digital platform. The Happy system now manages orders, stock movement, routes, and delivery tracking in one place, which has made our daily operations far more organized.",
    project: "Happy Supply Chain Management Platform",
    color: "from-emerald-500 to-teal-600",
    accentColor: "#10b981",
  },
  {
    id: "3",
    name: "Arman Hossain",
    position: "Founder",
    company: "BlueSpace IT",
    avatar: null,
    rating: 5,
    testimonial:
      "Shakil worked with our team on several backend-heavy projects and consistently delivered reliable solutions. He has a strong understanding of Node.js architecture, API design, and scalable systems. Beyond coding, he communicates well with the team and approaches problems in a practical and solution-focused way.",
    project: "Enterprise Backend Systems Development",
    color: "from-blue-500 to-cyan-600",
    accentColor: "#0ea5e9",
  },
  {
    id: "4",
    name: "Tanvir Rahman",
    position: "CEO",
    company: "FRS Store Ltd.",
    avatar: null,
    rating: 5,
    testimonial:
      "Shakil helped us build the backend for FRS Store with a strong focus on structure and long-term scalability. From product management to order processing and authentication, everything was implemented in a clean and maintainable way. It gave our team a solid foundation to continue expanding the platform.",
    project: "FRS Store E-commerce Platform",
    color: "from-purple-500 to-fuchsia-600",
    accentColor: "#d946ef",
  },
  {
    id: "5",
    name: "Omar Faruk Bhuiyan",
    position: "CEO",
    company: "Clooud Gen",
    avatar: null,
    rating: 5,
    testimonial:
      "Shakil joined our development workflow smoothly and quickly adapted to our project requirements. He worked on several backend features including authentication systems and API structures. His code was well organized and easy for the rest of the team to work with.",
    project: "Fullstack Platform Development",
    color: "from-orange-500 to-red-600",
    accentColor: "#f97316",
  },
  {
    id: "6",
    name: "Aliya Noor",
    position: "Owner",
    company: "Noor Mela",
    avatar: null,
    rating: 5,
    testimonial:
      "Shakil developed the backend system for Noor Mela’s e-commerce platform. The project involved product management, order workflows, authentication, and integrations for image storage and email notifications. The system has been stable and flexible enough for us to continue growing the business online.",
    project: "Noor Mela E-commerce Platform",
    color: "from-pink-500 to-rose-600",
    accentColor: "#f43f5e",
  },
];

// Floating background elements
const FloatingElement: React.FC<FloatingElementProps> = ({ delay = 0, duration = 20, className = "" }) => (
  <motion.div
    className={cn("absolute rounded-full opacity-10", className)}
    animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    }}
  />
)

// Star rating component
const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <Star
            className={cn(
              "w-5 h-5 transition-colors duration-300",
              index < rating ? "text-yellow-400 fill-yellow-400" : "text-slate-300 dark:text-slate-600",
            )}
          />
        </motion.div>
      ))}
    </div>
  )
}

// Main testimonial card for the slider
const TestimonialSlide: React.FC<TestimonialSlideProps> = ({ testimonial, isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isActive ? 1 : 0.3,
        scale: isActive ? 1 : 0.9,
        filter: isActive ? "blur(0px)" : "blur(2px)",
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full max-w-4xl mx-auto"
    >
      <Card className="relative bg-white/40 dark:bg-slate-950/40 backdrop-blur-xs border border-white/20 dark:border-white/5 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
        {/* Animated gradient border */}
        <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r", testimonial.color)} />


        {/* Decorative quote */}
        <div className="absolute top-4 right-4 lg:top-8 lg:right-8 opacity-10 dark:opacity-20">
          <Quote className="w-16 h-16 lg:w-24 lg:h-24 text-slate-900 dark:text-slate-100" />
        </div>

        {/* Floating orbs */}
        <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 opacity-60 animate-pulse" />
        <div
          className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-40 animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative p-6 sm:p-12 lg:p-16">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
            {/* Left: Avatar and Info */}
            <div className="lg:col-span-1 text-center lg:text-left">
              <motion.div whileHover={{ scale: 1.05, rotate: 2 }} className="relative inline-block mb-6">
                <div className="relative w-24 h-24 lg:w-32 lg:h-32 mx-auto lg:mx-0">
                  <div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-r opacity-20 blur-xs"
                    style={{ background: `linear-gradient(45deg, ${testimonial.accentColor}, transparent)` }}
                  />
                  <div
                    className="relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden border-2 lg:border-4 shadow-sm"
                    style={{ borderColor: testimonial.accentColor }}
                  >
                    {testimonial.avatar ? (
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <User className="w-10 h-10 lg:w-16 lg:h-16 text-slate-400" />
                      </div>
                    )}
                  </div>

                  {/* Floating badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="absolute -bottom-1 -right-1 lg:-bottom-2 lg:-right-2 w-8 h-8 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 flex items-center justify-center shadow-sm"
                  >
                    <Quote className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2 font-serif">
                  {testimonial.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-1 font-medium">{testimonial.position}</p>
                <p className="text-sm lg:text-base font-black uppercase tracking-widest mb-4" style={{ color: testimonial.accentColor }}>
                  {testimonial.company}
                </p>
                <StarRating rating={testimonial.rating} />
              </motion.div>
            </div>

            {/* Right: Testimonial Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
              >
                <blockquote className="text-base lg:text-xl font-medium leading-relaxed tracking-tight text-slate-800 dark:text-slate-200">
                  {testimonial.testimonial}
                </blockquote>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-4 pt-6 border-t border-slate-200/50 dark:border-slate-700/50"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500" />
                    <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Project:</span>
                  </div>
                  <div
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-bold text-white shadow-sm bg-gradient-to-r",
                      testimonial.color,
                    )}
                  >
                    {testimonial.project}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

// Thumbnail navigation
const TestimonialThumbnail: React.FC<TestimonialThumbnailProps> = ({ testimonial, isActive, onClick, index }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative p-4 rounded-2xl transition-all duration-300 group",
        isActive
          ? "bg-white/90 dark:bg-slate-800/90 shadow-sm"
          : "bg-white/50 dark:bg-slate-800/50 hover:bg-white/70 dark:hover:bg-slate-800/70",
      )}
    >
      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className={cn("absolute inset-0 rounded-2xl bg-gradient-to-r", testimonial.color)}
          style={{ padding: "2px" }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        >
          <div className="w-full h-full bg-white/90 dark:bg-slate-800/90 rounded-2xl" />
        </motion.div>
      )}

      <div className="relative flex items-center gap-3">
        <div className="relative">
          <div
            className={cn(
              "w-12 h-12 rounded-xl overflow-hidden border-2 transition-all duration-300",
              isActive ? "border-opacity-100" : "border-slate-200 dark:border-slate-700",
            )}
            style={{ borderColor: isActive ? testimonial.accentColor : undefined }}
          >
            {testimonial.avatar ? (
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <User className="w-6 h-6 text-slate-400" />
              </div>
            )}
          </div>
        </div>

        <div className="text-left min-w-0 flex-1">
          <h4
            className={cn(
              "font-bold text-sm transition-colors duration-300 truncate",
              isActive ? "text-slate-900 dark:text-slate-100" : "text-slate-700 dark:text-slate-300",
            )}
          >
            {testimonial.name}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{testimonial.company}</p>
        </div>
      </div>
    </motion.button>
  )
}

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [direction, setDirection] = useState<number>(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["0 1", "1 0"],
  })

  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])
  const titleY = useTransform(scrollYProgress, [0, 0.3], [50, 0])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const contentY = useTransform(smoothProgress, [0.1, 0.4], [100, 0])
  const contentOpacity = useTransform(smoothProgress, [0.1, 0.4], [0, 1])

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1)
      setCurrentIndex(index)
    },
    [currentIndex],
  )

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length)
  }, [])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length)
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden -mb-1">
      {/* Unified Background System */}
      <motion.div className="absolute inset-0 -z-10 -top-32 -bottom-32" style={{ y: backgroundY }}>
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-purple-50/30 to-slate-50/50 dark:from-slate-900 dark:via-purple-950/10 dark:to-slate-950/50" />

        {/* Consistent grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Floating elements */}
        <FloatingElement
          delay={0}
          duration={25}
          className="top-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-fuchsia-500/5 blur-3xl"
        />
        <FloatingElement
          delay={8}
          duration={30}
          className="bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 blur-3xl"
        />
        <FloatingElement
          delay={15}
          duration={35}
          className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-emerald-500/5 to-teal-500/5 blur-3xl"
        />

        {/* Dynamic background based on current testimonial */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl opacity-10"
          style={{
            background: `radial-gradient(circle at center, ${testimonialsData[currentIndex]?.accentColor} 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Subtle tech pattern */}
        <div
          className="absolute inset-0 opacity-[0.01] dark:opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 H40 V40 H70 V70 H90' stroke='%23a855f7' strokeOpacity='0.3' fill='none' strokeWidth='1'/%3E%3Ccircle cx='10' cy='10' r='2' fill='%23a855f7' fillOpacity='0.3'/%3E%3Ccircle cx='40' cy='40' r='2' fill='%23a855f7' fillOpacity='0.3'/%3E%3Ccircle cx='70' cy='70' r='2' fill='%23a855f7' fillOpacity='0.3'/%3E%3Ccircle cx='90' cy='90' r='2' fill='%23a855f7' fillOpacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: "100px 100px",
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div className="text-center mb-20" style={{ y: titleY, opacity: titleOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-8"
          >
            <div className="inline-flex items-center justify-center mb-6 px-4 py-1.5 rounded-full border border-purple-200/50 dark:border-purple-800/30 bg-purple-50/50 dark:bg-purple-900/10 backdrop-blur-sm">
              <span className="text-xs font-bold font-heading uppercase tracking-[0.3em] text-purple-600 dark:text-purple-400">
                Client Feedback
              </span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 tracking-tight font-serif"
          >
            <span className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
              What Clients Say
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto text-xl leading-relaxed"
          >
            Hear from the amazing clients I&apos;ve had the pleasure to work with. Their success stories drive my passion for
            creating exceptional digital experiences.
          </motion.p>
        </motion.div>

        {/* Main Slider */}
        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="space-y-12">
          {/* Testimonial Slider */}
          <div className="relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -300 : 300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <TestimonialSlide testimonial={testimonialsData[currentIndex]} isActive={true} />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 lg:-left-16">
              <Button
                onClick={prevSlide}
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs shadow-sm border-purple-200/50 dark:border-purple-800/30 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:shadow-xl transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 right-4 lg:-right-16">
              <Button
                onClick={nextSlide}
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs shadow-sm border-purple-200/50 dark:border-purple-800/30 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:shadow-xl transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex flex-col items-center gap-6">
            {/* Play/Pause Control */}
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              variant="outline"
              className="flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs shadow-sm border-purple-200/50 dark:border-purple-800/30 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:shadow-xl transition-all duration-300 px-6 py-3 rounded-2xl"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span className="text-sm font-medium">{isPlaying ? "Pause" : "Play"}</span>
            </Button>

            {/* Thumbnails */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 w-full max-w-6xl">
              {testimonialsData.map((testimonial, index) => (
                <TestimonialThumbnail
                  key={testimonial.id}
                  testimonial={testimonial}
                  isActive={index === currentIndex}
                  onClick={() => goToSlide(index)}
                  index={index}
                />
              ))}
            </div>

            {/* Progress Indicators */}
            <div className="flex items-center gap-2">
              {testimonialsData.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "relative h-2 rounded-full transition-all duration-300",
                    index === currentIndex
                      ? "w-8 bg-purple-600"
                      : "w-2 bg-slate-300 dark:bg-slate-600 hover:bg-purple-400",
                  )}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {index === currentIndex && isPlaying && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 5, ease: "linear" }}
                      style={{ transformOrigin: "left" }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20"
          >
            <Card className="p-8 sm:p-12 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs shadow-sm border-0 overflow-hidden">
              {/* Gradient top border */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500" />

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-fuchsia-500/10 to-transparent rounded-tr-full" />

              <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <motion.div whileHover={{ scale: 1.05 }} className="space-y-2">
                  <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                    15+
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 font-medium">Happy Clients</div>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} className="space-y-2">
                  <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    25+
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 font-medium">Projects Completed</div>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} className="space-y-2">
                  <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    98%
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 font-medium">Client Satisfaction</div>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials

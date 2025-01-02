'use client'
import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"
import { CourseCard } from "@/components/course-card"
import { SkeletonCard } from "@/components/skeleton-card"
import image from '../assets/image.png'
import { PaginationSection } from "@/components/pagination-section"
import { Button } from "@/components/ui/button"
export default function Course() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // Adjust this value to control how long the skeleton is shown

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="p-2">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Made for You</h1>
        <p className="text-muted-foreground">
          Your personal playlists. Updated daily.
        </p>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        {isLoading
          ? Array.from({ length: 12 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          : Array.from({ length: 12 }).map((_, i) => (
              <CourseCard
                key={i}
                title="React Course"
                author="Username"
                image={image}
              />
        ))}
      </div>
        <PaginationSection />
    </div>
  )
}


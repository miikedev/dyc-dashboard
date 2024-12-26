import { CourseCard } from "@/components/course-card"

export default function Dashboard() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Made for You</h1>
        <p className="text-muted-foreground">
          Your personal playlists. Updated daily.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <CourseCard
            key={i}
            title="React Course"
            author="Username"
          />
        ))}
      </div>
    </div>
  )
}


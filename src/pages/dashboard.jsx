import { CourseCard } from "@/components/course-card"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import image from '../assets/image.png'
export default function Dashboard() {
  return (
    <div className="p-2">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Made for You</h1>
        <p className="text-muted-foreground">
          Your personal playlists. Updated daily.
        </p>
      </div>
      {/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <CourseCard
            key={i}
            title="React Course"
            author="Username"
          />
        ))}
      </div> */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <CourseCard
            key={i}
            title="React Course"
            author="Username"
            image={image}
          />
        ))}
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      <div className="flex flex-end mt-5">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}


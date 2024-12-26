import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { MoreVertical } from 'lucide-react'

import image from '../assets/card-image.jpg'

// interface CourseCardProps {
//   title: string
//   author: string
//   image: string
// }

export function CourseCard({ title, author }) {
  return (
    <Card className="bg-card/50 border-border/40">
      <CardHeader className="p-0">
        <div className="relative aspect-video">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full rounded-t-lg"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm">{title}</h3>
          <Button variant="ghost" size="icon" className="-mr-2">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">Created by {author}</p>
      </CardContent>
    </Card>
  )
}


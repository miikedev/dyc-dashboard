'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreVertical, Video, FileText } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useState } from "react"
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
//   DragEndEvent,
// } from "@dnd-kit/core"
// import {
//   arrayMove,
//   SortableContext,
//   sortableKeyboardCoordinates,
//   useSortable,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable"
// import { CSS } from "@dnd-kit/utilities"

// interface ActivityItem {
//   id: string
//   title: string
//   type: 'Video' | 'Text'
//   activity: string
//   editedBy: string
//   dateModified: string
// }

import { initialActivities } from "@/data/activities"

function SortableActivity({ activity }) {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({ id: activity.id })

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     zIndex: isDragging ? 1 : 0,
//     opacity: isDragging ? 0.8 : 1,
//   }

  return (
    <div
    //   ref={setNodeRef}
    //   style={style}
      className={`flex items-center justify-between p-4 rounded-lg hover:bg-[#dddddd30] transition-colors 

        // isDragging ? 'ring-2 ring-primary' : ''
    //   }
        `
    }
    >
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 flex items-center justify-center">
          {activity.type === 'Video' ? (
            <Video className="w-6 h-6 text-blue-500" />
          ) : (
            <FileText className="w-6 h-6 text-green-500" />
          )}
        </div>
        <div>
          <h3 className="font-medium ">
            {activity.title} <span className="text-gray-400">({activity.type})</span>
          </h3>
          <p className="text-sm text-gray-400">{activity.activity}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-sm text-gray-400">Edited by {activity.editedBy}</p>
          <p className="text-sm text-gray-400">Date modified: {activity.dateModified}</p>
        </div>
        <Button variant="ghost" size="icon" className="text-gray-400">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

export default function Activity() {
  const [activities, setActivities] = useState(initialActivities)
  
//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   )

//   function handleDragEnd() {
//     const { active, over } = event

//     if (over && active.id !== over.id) {
//       setActivities((items) => {
//         const oldIndex = items.findIndex((item) => item.id === active.id)
//         const newIndex = items.findIndex((item) => item.id === over.id)
//         return arrayMove(items, oldIndex, newIndex)
//       })
//     }
//   }

  return (
    <div className="min-h-screen p-6">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Activity</CardTitle>
          <CardDescription className="text-gray-400">
            Your personal playlists. Updated daily.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={activities} strategy={verticalListSortingStrategy}> */}
              <div className="space-y-2">
                {activities.map((activity) => (
                  <SortableActivity key={activity.id} activity={activity} />
                ))}
              </div>
            {/* </SortableContext>
          </DndContext> */}
        </CardContent>
      </Card>
    </div>
  )
}


import { ItemTypes } from "@/lib/itemtypes"
import { Folder } from "lucide-react"
import { MoreVertical } from "lucide-react"
import { memo } from "react"
import { useDrag, useDrop } from "react-dnd"
import { useNavigate, useParams } from "react-router"

import { Button } from "./ui/button"

export const DraggableCard = memo(function DraggableCard ({ module, id, moveCard, findCard }) {
    const { courseId } = useParams()
    const navigate = useNavigate()
    const handleModule = (id) => {
        navigate(`/dashboard/course/${courseId}/module/${id}/activity`)
    }
    console.log('findCard', findCard(id))
    const originalIndex = findCard(id).index
    console.log('original', originalIndex)
    const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item
        const didDrop = monitor.didDrop()
        if (!didDrop) {
          moveCard(droppedId, originalIndex)
        }
      },
    }),
    [id, originalIndex, moveCard],
    )
    const [, drop] = useDrop(
        () => ({
        accept: ItemTypes.CARD,
        hover({ id: draggedId }) {
            if (draggedId !== id) {
            const { index: overIndex } = findCard(id)
            moveCard(draggedId, overIndex)
            }
        },
        }),
        [findCard, moveCard],
    )
    const opacity = isDragging ? 0 : 1
    return (
        <div
            ref={(node) => drag(drop(node))}
            id={`${module.id}`}
            data={module}
            className="scale-95 cursor-grabbing hover:bg-[#dddddd30] flex items-center justify-between p-4 rounded-lg transition-colors"
            onDoubleClick={() => handleModule(module.id)}
        >
            <div className="flex items-center space-x-4">
                <div className="w-8 h-8 flex items-center justify-center">
                    <Folder className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-medium">{module.title}</h3>
                    <p className="text-sm text-gray-400">{module.activity}</p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="text-right">
                    <p className="text-sm text-gray-400">Edited by {module.editedBy}</p>
                    <p className="text-sm text-gray-400">Date modified: {module.dateModified}</p>
                </div>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:bg-transparent">
                    <MoreVertical className="h-5 w-5" />
                </Button>
            </div>
        </div>
    )
})

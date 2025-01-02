import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreVertical, Folder } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { PaginationSection } from "@/components/pagination-section"
import update from "immutability-helper"
// interface ModuleItem {
//   id: string
//   title: string
//   activity: string
//   editedBy: string
//   dateModified: string
import { useDrop } from "react-dnd"
import { modules } from "@/data/modules"
import { useNavigate, useParams } from "react-router"
import { useCallback, useState, memo } from "react"
const Module = memo( function Module() {
    const [cards, setCards] = useState(modules)
    const { courseId } = useParams()
    const navigate = useNavigate()
    const handleModule = (id) => {
        navigate(`/dashboard/course/${courseId}/module/${id}/activity`)
    }
    const findCard = useCallback(
        (id) => {
          const card = cards.filter((c) => `${c.id}` === id)[0]
          return {
            card,
            index: cards.indexOf(card),
          }
        },
        [cards],
      )
      const moveCard = useCallback(
        (id, atIndex) => {
          const { card, index } = findCard(id)
          setCards(
            update(cards, {
              $splice: [
                [index, 1],
                [atIndex, 0, card],
              ],
            }),
          )
        },
        [findCard, cards, setCards],
      )
      const [, drop] = useDrop(() => ({ accept: 'card' }))
  
  return (
    <div className="min-h-screen p-6">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Module</CardTitle>
          <CardDescription className="text-gray-400">
            Your personal playlists. Updated daily.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {modules.map((module) => (
              <div
                key={module.id}
                className="scale-95  hover:bg-[#dddddd30] flex items-center justify-between p-4 rounded-lg transition-colors"
                onDoubleClick={() => handleModule(module.id)}
                moveCard={moveCard}
                findCard={findCard}
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
            ))}
          </div>
        </CardContent>
      </Card>
      <PaginationSection className="scale-95 mx-[2rem]" />
    </div>
  )
}
)
export default Module
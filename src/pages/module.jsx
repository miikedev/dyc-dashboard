import { DraggableCard } from "@/components/draggable-card"
import { PaginationSection } from "@/components/pagination-section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { modules } from "@/data/modules"
// interface ModuleItem { ItemTypes } from "@/data/modules"
import { ItemTypes } from "@/lib/itemtypes"
import update from "immutability-helper"
import { useCallback, useState } from "react"
import { useDrop } from 'react-dnd'

const Module = () => {
  const [cards, setCards] = useState(modules)
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
  const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }))
  console.log('cards', cards)
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
          <div ref={drop} className="space-y-2">
            {cards.map((module) => (
              <DraggableCard
                key={module.id}
                id={`${module.id}`}
                module={module}
                moveCard={moveCard}
                findCard={findCard}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      <PaginationSection className="scale-95 mx-[2rem]" />
    </div>
  )
}
export default Module
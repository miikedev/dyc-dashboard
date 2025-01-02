import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreVertical, Folder } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { PaginationSection } from "@/components/pagination-section"
// interface ModuleItem {
//   id: string
//   title: string
//   activity: string
//   editedBy: string
//   dateModified: string
// }

import { modules } from "@/data/modules"

export default function Module() {
  return (
    <div className="min-h-screen bg-black p-6">
      <Card className="bg-black border-none text-white">
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
                className="flex items-center justify-between p-4 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <Folder className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{module.title}</h3>
                    <p className="text-sm text-gray-400">{module.activity}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Edited by {module.editedBy}</p>
                    <p className="text-sm text-gray-400">Date modified: {module.dateModified}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <PaginationSection />
    </div>
  )
}


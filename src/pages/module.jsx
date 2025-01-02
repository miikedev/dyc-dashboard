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

import { modules } from "@/data/modules"
import { useNavigate, useParams } from "react-router"

export default function Module() {
    const { courseId } = useParams()
    const navigate = useNavigate()
    const handleModule = (id) => {
        navigate(`/dashboard/course/${courseId}/module/${id}/activity`)
    }
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
                onClick={() => handleModule(module.id)}
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


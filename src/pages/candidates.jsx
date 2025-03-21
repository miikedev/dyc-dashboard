
"use client"

import { useState, useEffect } from "react"
import { Edit, Trash2, Plus } from "lucide-react"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/dashboard/data-table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { getCandidates, createACandidate, deleteCandidate, updateCandidate } from "@/apis/candidates"
// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  telegramUsername: z.string().min(2, {
    message: "Telegram username must be at least 2 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})
function Candidates() {
  const [candidates, setCandidates] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState(null)

  // Initialize the form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      telegramUsername: "",
      message: "",
    },
  })

  // Define the columns for the data table
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "telegramUsername",
      header: "Telegram Username",
    },
    {
      accessorKey: "message",
      header: "Message",
      cell: ({ row }) => {
        const message = row.getValue("message")
        return <div className="max-w-[300px] truncate">{message}</div>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const candidate = row.original
        return (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => handleEdit(candidate)}>
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleDelete(candidate)}>
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        )
      },
    },
  ]

  // Fetch candidates data
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        // In a real app, you would fetch from your API
        // For demo purposes, we'll use mock data
        // const mockCandidates = [
        //   {
        //     _id: "1",
        //     name: "John Doe",
        //     telegramUsername: "johndoe",
        //     message: "I'm interested in joining the team.",
        //   },
        //   {
        //     _id: "2",
        //     name: "Jane Smith",
        //     telegramUsername: "janesmith",
        //     message: "Looking forward to contributing to the project.",
        //   },
        //   {
        //     _id: "3",
        //     name: "Bob Johnson",
        //     telegramUsername: "bobjohnson",
        //     message: "I have experience in this field and would love to help.",
        //   },
        //   {
        //     _id: "4",
        //     name: "John Doe",
        //     telegramUsername: "johndoe",
        //     message: "I'm interested in joining the team.",
        //   },
        //   {
        //     _id: "5",
        //     name: "Jane Smith",
        //     telegramUsername: "janesmith",
        //     message: "Looking forward to contributing to the project.",
        //   },
        //   {
        //     _id: "6",
        //     name: "Bob Johnson",
        //     telegramUsername: "bobjohnson",
        //     message: "I have experience in this field and would love to help.",
        //   },
        //   {
        //     _id: "7",
        //     name: "Bob Johnson",
        //     telegramUsername: "bobjohnson",
        //     message: "I have experience in this field and would love to help.",
        //   },
        //   {
        //     _id: "8",
        //     name: "John Doe",
        //     telegramUsername: "johndoe",
        //     message: "I'm interested in joining the team.",
        //   },
        //   {
        //     _id: "9",
        //     name: "Jane Smith",
        //     telegramUsername: "janesmith",
        //     message: "Looking forward to contributing to the project.",
        //   },
        //   {
        //     _id: "10",
        //     name: "Bob Johnson",
        //     telegramUsername: "bobjohnson",
        //     message: "I have experience in this field and would love to help.",
        //   },
        // ]

        const data = await getCandidates();
        console.log(data);
        setCandidates(data)
      } catch (error) {
        toast("Failed to fetch candidates.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCandidates()
  }, [toast])

  // Handle edit
  const handleEdit = (candidate) => {
    setSelectedCandidate(candidate)
    form.reset({
      name: candidate.name,
      telegramUsername: candidate.telegramUsername,
      message: candidate.message,
    })
    setIsEditDialogOpen(true)
  }

  // Handle delete
  const handleDelete = (candidate) => {
    console.log('delete candidate', candidate)
    setSelectedCandidate(candidate)
    setIsDeleteDialogOpen(true)
  }

  // Handle form submission for adding a new candidate
  const onAddSubmit = async (values) => {
    try {
      // In a real app, you would call your API to add the candidate
      // For demo purposes, we'll simulate adding to the local state
      const newCandidate = {
        ...values,
      }
      const createdCandidate = await createACandidate({values: newCandidate})
      console.log('created candidate', createdCandidate)
      setCandidates([...candidates, createdCandidate])
      setIsAddDialogOpen(false)
      form.reset()

      toast("Candidate added successfully.")

    } catch (error) {
      toast("Failed to add candidate.")
    }
  }

  // Handle form submission for editing a candidate
  const onEditSubmit = async (values) => {
    try {

        if (!selectedCandidate) return

        // In a real app, you would call your API to update the candidate
        const result = await updateCandidate({id: selectedCandidate._id, values})

        const updatedCandidates = candidates.map((candidate) =>
          candidate._id === selectedCandidate._id ? { ...candidate, ...result } : candidate,
        )
        setCandidates(updatedCandidates)
        setIsEditDialogOpen(false)

        toast("Candidate updated successfully.")

    } catch (error) {
      toast("Failed to update candidate.")
    }
  }

  // Handle delete confirmation
  const confirmDelete = async () => {
    try {
      if (!selectedCandidate) return

        // In a real app, you would call your API to delete the candidate

        // For demo purposes, we'll update the local state
        console.log('Deleting candidate id: ' + selectedCandidate._id)

        const res = await deleteCandidate({id: selectedCandidate._id})

        console.log('delete response:', res)

        const updatedCandidates = candidates.filter((candidate) => candidate._id !== selectedCandidate._id)
        
        setCandidates(updatedCandidates)

        setIsDeleteDialogOpen(false)

        toast("Candidate deleted successfully.")
    } catch (error) {
      toast("Failed to delete candidate.")
    }
  }

  return (
    <div className="space-y-6 mt-[.5rem]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Candidates</h1>
          <p className="text-muted-foreground">Manage candidate information and applications</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Candidate
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Candidate</DialogTitle>
              <DialogDescription>Fill in the details to add a new candidate.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onAddSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="telegramUsername"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telegram Username</FormLabel>
                      <FormControl>
                        <Input placeholder="johndoe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="I'm interested in joining the team..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Add Candidate</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      ) : (
        <DataTable columns={columns} data={candidates} searchColumn="name" />
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Candidate</DialogTitle>
            <DialogDescription>Update the candidate's information.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onEditSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telegramUsername"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telegram Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Candidate</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this candidate? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Candidates
"use client"

import { FormDescription } from "@/components/ui/form"

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
import { Switch } from "@/components/ui/switch"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { getSubscribers, createASubscriber, deleteSubscriber, updateSubscriber } from "../apis/subscribers"
// Define the Subscriber type
// interface Subscriber {
//   _id: string
//   email: string
//   status: boolean
//   createdAt: string
// }

// Define the form schema
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  status: z.boolean(),
})

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedSubscriber, setSelectedSubscriber] = useState(null)

  // Initialize the form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      status: true,
    },
  })

  // Define the columns for the data table
  const columns = [
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") 
        return <div className={status ? "text-green-600" : "text-red-600"}>{status ? "Active" : "Inactive"}</div>
      },
    },
    {
      accessorKey: "createdAt",
      header: "Subscribed On",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"))
        return <div>{date.toLocaleDateString()}</div>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const subscriber = row.original
        return (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => handleEdit(subscriber)}>
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleDelete(subscriber)}>
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        )
      },
    },
  ]

  // Fetch subscribers data
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        // In a real app, you would fetch from your API
        // For demo purposes, we'll use mock data
        // const mockSubscribers = [
        //   {
        //     _id: "1",
        //     email: "john@example.com",
        //     status: true,
        //     createdAt: new Date().toISOString(),
        //   },
        //   {
        //     _id: "2",
        //     email: "jane@example.com",
        //     status: true,
        //     createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        //   },
        //   {
        //     _id: "3",
        //     email: "bob@example.com",
        //     status: false,
        //     createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        //   },
        // ]

        const data = await getSubscribers();

        setSubscribers(data)
      } catch (error) {
        toast("Failed to fetch subscribers")
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubscribers()
  }, [toast])

  // Handle edit
  const handleEdit = (subscriber) => {
    setSelectedSubscriber(subscriber)
    form.reset({
      email: subscriber.email,
      status: subscriber.status,
    })
    setIsEditDialogOpen(true)
  }

  // Handle delete
  const handleDelete = (subscriber) => {
    console.log(subscriber)
    setSelectedSubscriber(subscriber)
    setIsDeleteDialogOpen(true)
  }

  // Handle form submission for adding a new subscriber
  const onAddSubmit = async (values) => {
    try {
      // In a real app, you would call your API to add the subscriber
      // For demo purposes, we'll simulate adding to the local state
      const newSubscriber = {
        ...values,
        createdAt: new Date().toISOString(),
      }

      const createdSubscriber = await createASubscriber({values: newSubscriber})

      setSubscribers([...subscribers, createdSubscriber])
      setIsAddDialogOpen(false)
      form.reset()

      toast("Subscriber added successfully.")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add subscriber.",
        variant: "destructive",
      })
    }
  }

  // Handle form submission for editing a subscriber
  const onEditSubmit = async (values) => {
    try {
      if (!selectedSubscriber) return

      // In a real app, you would call your API to update the subscriber
      const result = await updateSubscriber({id: selectedSubscriber._id, values})

      // For demo purposes, we'll update the local state
      const updatedSubscribers = subscribers.map((subscriber) =>
        subscriber._id === selectedSubscriber._id ? { ...subscriber, ...result } : subscriber,
      )

      setSubscribers(updatedSubscribers)
      setIsEditDialogOpen(false)

      toast("Subscriber updated successfully.")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update subscriber.",
        variant: "destructive",
      })
    }
  }

  // Handle delete confirmation
  const confirmDelete = async () => {
    try {
      if (!selectedSubscriber) return

      // In a real app, you would call your API to delete the subscriber
      const res = await deleteSubscriber({id: selectedSubscriber._id})
      // For demo purposes, we'll update the local state
      const updatedSubscribers = subscribers.filter((subscriber) => subscriber._id !== selectedSubscriber._id)

      setSubscribers(updatedSubscribers)
      setIsDeleteDialogOpen(false)

      toast("Subscriber deleted successfully.")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete subscriber.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subscribers</h1>
          <p className="text-muted-foreground">Manage email subscribers</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          {/* <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Subscriber
            </Button>
          </DialogTrigger> */}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Subscriber</DialogTitle>
              <DialogDescription>Fill in the details to add a new subscriber.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onAddSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Active</FormLabel>
                        <FormDescription>Set the subscriber as active or inactive.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Add Subscriber</Button>
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
        <DataTable columns={columns} data={subscribers} searchColumn="email" filterColumn="status" />
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Subscriber</DialogTitle>
            <DialogDescription>Update the subscriber's information.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onEditSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Active</FormLabel>
                      <FormDescription>Set the subscriber as active or inactive.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
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
            <DialogTitle>Delete Subscriber</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this subscriber? This action cannot be undone.
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


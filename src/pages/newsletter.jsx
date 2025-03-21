"use client"

import { useState, useEffect } from "react"
import { Edit, Trash2, Plus } from "lucide-react"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/dashboard/data-table"
import { FileUpload } from "@/components/ui/file-upload"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { upload, deleteUrls } from "@/apis/upload"
import { createABlog, getBlogs } from "@/apis/blogs"
import { getNewsletters } from "@/apis/newsletter"

// Define the form schema
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
  status: z.boolean(),
  author: z.string().optional(),
  images: z.array(z.string()).default([]),
})

export default function Blogs() {

    const [blogs, setBlogs] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [selectedBlog, setSelectedBlog] = useState(null)
    const [imageUrls, setImageUrls] = useState([])
    const [isUploading, setIsUploading] = useState(false)

    // Initialize the form
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
        title: "",
        content: "",
        status: true,
        author: "",
        images: [],
        },
    })

    // Define the columns for the data table
    const columns = [
        {
        accessorKey: "subject",
        header: "Subject",
        },
        {
        accessorKey: "content",
        header: "Content",
        cell: ({ row }) => {
            const content = row.getValue("content")
            return <div className="max-w-[300px] truncate">{content}</div>
        },
        },
        {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt"))
            return <div>{date.toLocaleDateString()}</div>
        },
        },
        {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status")
            return <div className={status ? "text-green-600" : "text-red-600"}>{status ? "Published" : "Draft"}</div>
        },
        },
        {
        id: "actions",
        cell: ({ row }) => {
            const blog = row.original
            return (
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(blog)}>
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(blog)}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
                </Button>
            </div>
            )
        },
        },
    ]

    // Fetch blogs data
    useEffect(() => {
        const fetchBlogs = async () => {
        try {
            // In a real app, you would fetch from your API
            // For demo purposes, we'll use mock data
            const mockBlogs = await getNewsletters();
            console.log('mockBlogs', mockBlogs)
            setBlogs(mockBlogs)
        } catch (error) {
            toast({
            title: "Error",
            description: "Failed to fetch blogs.",
            variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
        }

        fetchBlogs()
    }, [toast])

    // Handle edit
    const handleEdit = (blog) => {
        setSelect(blog)
        setImageUrls(blog.images)
        form.reset({
        title: blog.title,
        content: blog.content,
        status: blog.status,
        author: blog.author,
        images: blog.images,
        })
        setIsEditDialogOpen(true)
    }

    // Handle delete
    const handleDelete = (blog) => {
        setSelectedBlog(blog)
        setIsDeleteDialogOpen(true)
    }

    // Handle file upload
    const handleFileUpload = async (files) => {
    setIsUploading(true); // Start the uploading state
    try {
        const formData = new FormData(); // Create a new FormData instance
        console.log('files', files); // Debugging: log the files

        // Append each file to the FormData instance with "images" as the key
        files.forEach((file) => {
            formData.append("images", file); // Ensure your backend expects "images" key
        });

        const data = await upload(formData); // Call your upload function with FormData

        return data.urls; // Return the URLs or any helpful data
    } catch (error) {
        console.error("Error uploading files:", error); // Log any error
        toast({
            title: "Upload failed",
            description: "There was an error uploading your files.",
            variant: "destructive",
        });
        throw error; // Propagate the error up the call stack
    } finally {
        setIsUploading(false); // End the uploading state
    }
    };

    // Handle upload complete
    const handleUploadComplete = (urls) => {
        setImageUrls(urls)
        form.setValue("images", urls)
    }

    // Handle image removal
    const handleRemoveImage = async (urlToRemove) => {
        try {
        await deleteUrls([urlToRemove]);
        const updatedUrls = imageUrls.filter(url => url !== urlToRemove);
        setImageUrls(updatedUrls);
        form.setValue("images", updatedUrls);
        } catch (error) {
        console.error("Failed to remove image:", error);
        // Add error handling/notification here
        }
    };

    // Handle form submission for adding a new blog
    const onAddSubmit = async (values) => {
        try {
        // In a real app, you would call your API to add the blog
        // For demo purposes, we'll simulate adding to the local state
        const newBlog = {
            ...values,
            createdAt: new Date().toISOString(),
            images: imageUrls,
        }

        console.log('newBlog', newBlog);
        const createdBlog = await createABlog({values: newBlog})
        console.log(createdBlog)

        setBlogs([...blogs, newBlog])
        setIsAddDialogOpen(false)
        form.reset()
        setImageUrls([])

        toast("Blog added successfully.")
        } catch (error) {
        toast("Failed to add blog.")
        }
    }

    // Handle form submission for editing a blog
    const onEditSubmit = async (values) => {
        try {
        if (!selectedBlog) return

        // In a real app, you would call your API to update the blog
        // For demo purposes, we'll update the local state
        const updatedBlogs = blogs.map((blog) =>
            blog._id === selectedBlog._id
            ? {
                ...blog,
                ...values,
                images: imageUrls,
                }
            : blog,
        )

        setBlogs(updatedBlogs)
        setIsEditDialogOpen(false)
        setImageUrls([])

        toast("Blog updated successfully.")
        } catch (error) {
        toast({
            title: "Error",
            description: "Failed to update blog.",
            variant: "destructive",
        })
        }
    }

    // Handle delete confirmation
    const confirmDelete = async () => {
        try {
        if (!selectedBlog) return

        // For demo purposes, we'll update the local state
        const updatedBlogs = blogs.filter((blog) => blog._id !== selectedBlog._id)

        setBlogs(updatedBlogs)
        setIsDeleteDialogOpen(false)

        toast("Blog deleted successfully.")
        } catch (error) {
        toast({
            title: "Error",
            description: "Failed to delete blog.",
            variant: "destructive",
        })
        }
    }

    // Reset form when opening add dialog
    const handleOpenAddDialog = () => {
        form.reset({
        subject: "",
        content: "",
        status: true,
        author: "",
        images: [],
        })
        setImageUrls([])
        setIsAddDialogOpen(true)
    }

  return (
    <div className="space-y-6 ">
      <div className="flex items-center justify-between ">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Newsletters</h1>
          <p className="text-muted-foreground">Manage newsletter posts and content</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} className="">
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2" onClick={handleOpenAddDialog}>
              <Plus className="h-4 w-4" />
              Add Blog
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col ">
            <DialogHeader>
              <DialogTitle>Add New Blog</DialogTitle>
              <DialogDescription>Fill in the details to add a new blog post.</DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto pr-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onAddSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Blog Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Blog content..." className="min-h-[200px]" {...field} />
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
                        <FormLabel className="text-base">Published</FormLabel>
                        <FormDescription>Set the blog post as published or draft.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Images</FormLabel>
                      <FormDescription>Drag and drop images or click to upload.</FormDescription>
                      <FormControl>
                        <FileUpload
                          onUpload={handleFileUpload}
                          onComplete={handleUploadComplete}
                          accept="image/*"
                          multiple={true}
                          maxSize={5}
                        />
                      </FormControl>
                      {imageUrls.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {imageUrls.map((url, index) => (
                            <div key={index} className="relative group rounded-md overflow-hidden border">
                              <img
                                src={url || "/placeholder.svg"}
                                alt={`Image ${index + 1}`}
                                className="w-full h-32 object-cover"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => handleRemoveImage(url)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" disabled={isUploading}>
                    {isUploading ? "Uploading..." : "Add Blog"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      ) : (
        <>
            <DataTable columns={columns} data={blogs} searchColumn="title" filterColumn="status" />
            
        </>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Blog</DialogTitle>
            <DialogDescription>Update the blog post information.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onEditSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={
                    (
                        { field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                            <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )
                }
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea className="min-h-[200px]" {...field} />
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
                      <FormLabel className="text-base">Published</FormLabel>
                      <FormDescription>Set the blog post as published or draft.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Images</FormLabel>
                    <FormDescription>Drag and drop images or click to upload.</FormDescription>
                    <FormControl>
                      <FileUpload
                        onUpload={handleFileUpload}
                        onComplete={handleUploadComplete}
                        accept="image/*"
                        multiple={true}
                        maxSize={5}
                      />
                    </FormControl>
                    {imageUrls.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {imageUrls.map((url, index) => (
                          <div key={index} className="relative group rounded-md overflow-hidden border">
                            <img
                              src={url || "/placeholder.svg"}
                              alt={`Image ${index + 1}`}
                              className="w-full h-32 object-cover"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => handleRemoveImage(url)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={isUploading}>
                  {isUploading ? "Uploading..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blog</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this blog post? This action cannot be undone.
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


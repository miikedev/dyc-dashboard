"use client"

import { useState, useRef } from "react"
import { UploadCloud, X, FileIcon, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

// interface FileUploadProps {
//   onUpload: (files: File[]) => Promise<string[]>
//   onComplete?: (urls: string[]) => void
//   accept?: string
//   multiple?: boolean
//   maxSize?: number // in MB
//   className?: string
// }

// type FileStatus = "idle" | "uploading" | "success" | "error"

// interface FileWithStatus {
//   file: File
//   status: FileStatus
//   progress: number
//   url?: string
//   error?: string
// }

export function FileUpload({
  onUpload,
  onComplete,
  accept = "image/*",
  multiple = true,
  maxSize = 5, // 5MB default
  className,
}) {
  const [files, setFiles] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const validateFiles = (fileList) => {
    const valid = []
    const errors = []

    fileList.forEach((file) => {
      // Check file type
      if (!file.type.match(accept.replace("*", ".*"))) {
        errors.push({ file, error: `File type not supported. Please upload ${accept} files.` })
        return
      }
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        errors.push({ file, error: `File too large. Maximum size is ${maxSize}MB.` })
        return
      }
      valid.push(file)
    })

    return { valid, errors }
  }

  const processFiles = async (fileList) => {
    const { valid, errors } = validateFiles(fileList)

    console.log('fileList:', fileList)
    console.log('valid:', valid)
    // Add error files to state
    const errorFiles = errors.map(({ file, error }) => ({
      file,
      status: "error",
      progress: 0,
      error,
    }))
    // Add valid files to state
    const newFiles = valid.map((file) => ({
      file,
      status: "uploading",
      progress: 0,
    }))

    setFiles((prev) => [...prev, ...newFiles, ...errorFiles])

    if (valid.length === 0) return

    try {
      // Upload valid files
      const urls = await onUpload(valid)
        console.log('urls', urls)
      // Update file statuses
      setFiles((prev) =>
        prev.map((fileItem) => {
          const index = valid.findIndex((f) => f.name === fileItem.file.name && f.size === fileItem.file.size)
          if (index !== -1 && fileItem.status === "uploading") {
            return {
              ...fileItem,
              status: "success",
              progress: 100,
              url: urls[index],
            }
          }
          return fileItem
        }),
      )

      // Call onComplete with all URLs (including previously uploaded ones)
      if (onComplete) {
        const allUrls = [...files.filter((f) => f.status === "success").map((f) => f.url), ...urls]
        onComplete(allUrls)
      }
    } catch (error) {
      // Mark all uploading files as error
      setFiles((prev) =>
        prev.map((fileItem) => {
          if (fileItem.status === "uploading") {
            return {
              ...fileItem,
              status: "error",
              progress: 0,
              error: "Upload failed. Please try again.",
            }
          }
          return fileItem
        }),
      )
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files)
      processFiles(multiple ? droppedFiles : [droppedFiles[0]])
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files)
      processFiles(multiple ? selectedFiles : [selectedFiles[0]])

      // Reset the input value so the same file can be uploaded again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleRemoveFile = (fileToRemove) => {
    setFiles(files.filter((f) => f !== fileToRemove))
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
          className="hidden"
        />
        <UploadCloud className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">Click to upload</span> or drag and drop
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {multiple ? "Upload multiple files" : "Upload a file"} up to {maxSize}MB
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((fileItem, index) => (
            <div
              key={`${fileItem.file.name}-${index}`}
              className="flex items-center gap-2 p-2 rounded-md border bg-background"
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-md bg-muted">
                {fileItem.status === "success" ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : fileItem.status === "error" ? (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                ) : (
                  <FileIcon className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div className="truncate text-sm font-medium">{fileItem.file.name}</div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveFile(fileItem)
                    }}
                    className="ml-2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove file</span>
                  </button>
                </div>
                <div className="text-xs text-muted-foreground">
                  {fileItem.status === "error" ? (
                    <span className="text-red-500">{fileItem.error}</span>
                  ) : fileItem.status === "success" ? (
                    <span className="text-green-500">Upload complete</span>
                  ) : (
                    <span>Uploading... {fileItem.progress}%</span>
                  )}
                </div>
                {fileItem.status === "uploading" && (
                  <div className="w-full h-1 bg-muted rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${fileItem.progress}%` }} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


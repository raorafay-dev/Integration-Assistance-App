'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface FileUploadProps {
  uploadedFile: File | null
  onFileUpload: (file: File) => void
}

export default function FileUpload({ uploadedFile, onFileUpload }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === 'dragenter' || e.type === 'dragover')
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      const isValidType = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(file.type)
      if (isValidType || file.name.match(/\.(xlsx?|xls)$/i)) {
        onFileUpload(file)
      }
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileUpload(file)
    }
  }

  return (
    <Card className="p-6">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Upload Integration File</h2>

      {uploadedFile ? (
        <div className="flex items-center justify-between rounded-lg bg-green-50 p-4">
          <div>
            <p className="font-medium text-green-900">{uploadedFile.name}</p>
            <p className="text-sm text-green-700">
              {(uploadedFile.size / 1024).toFixed(2)} KB
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFileUpload(null as any)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <label
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`block cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-slate-300 bg-slate-50 hover:border-slate-400'
          }`}
        >
          <input
            type="file"
            className="hidden"
            accept=".xlsx,.xls"
            onChange={handleFileInput}
          />
          <svg
            className="mx-auto h-12 w-12 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
            />
          </svg>
          <p className="mt-2 text-sm font-medium text-slate-900">
            Drag and drop your Excel file here
          </p>
          <p className="text-xs text-slate-500">or click to browse (max 10MB)</p>
        </label>
      )}
    </Card>
  )
}

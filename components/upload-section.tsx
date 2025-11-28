'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import FileUpload from './file-upload'
import ConfigurationForm from './configuration-form'
import ProgressIndicator from './progress-indicator'

interface UploadSectionProps {
  uploadedFile: File | null
  onFileUpload: (file: File) => void
  formConfig: any
  onFormChange: (field: string, value: string) => void
  onGenerate: () => Promise<void>
  isLoading: boolean
  currentProgress: string | null
}

export default function UploadSection({
  uploadedFile,
  onFileUpload,
  formConfig,
  onFormChange,
  onGenerate,
  isLoading,
  currentProgress,
}: UploadSectionProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {currentProgress && <ProgressIndicator current={currentProgress} />}

      {!currentProgress && (
        <>
          <div className="space-y-6">
            <FileUpload uploadedFile={uploadedFile} onFileUpload={onFileUpload} />

            <ConfigurationForm formConfig={formConfig} onFormChange={onFormChange} />

            <Button
              onClick={onGenerate}
              disabled={
                isLoading ||
                !uploadedFile ||
                !formConfig.sapSystem ||
                !formConfig.integrationDirection
              }
              size="lg"
              className="w-full"
            >
              {isLoading ? 'Processing...' : 'Generate Mapping'}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

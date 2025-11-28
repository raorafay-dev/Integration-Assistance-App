'use client'

import { useState } from 'react'
import Header from '@/components/header'
import UploadSection from '@/components/upload-section'
import ResultsSection from '@/components/results-section'
import { useToast } from '@/hooks/use-toast'

export interface MappingResult {
  status: string
  timestamp: string
  context: {
    sapSystem: string
    integrationDirection: string
    module: {
      value: string
      predicted: boolean
      confidence: number
      reasoning: string
    }
    objectType: {
      value: string
      predicted: boolean
      confidence: number
      reasoning: string
    }
    externalSystem: string | null
    additionalNotes: string | null
  }
  fieldMappings: {
    total: number
    summary: {
      highConfidence: number
      mediumConfidence: number
      lowConfidence: number
      mandatory: number
      optional: number
    }
    tablesInvolved: string[]
    fields: Array<{
      sourceField: string
      sourceDescription: string
      sapField: string
      sapTable: string
      dataType: string
      mandatory: string
      confidence: string
      notes: string
    }>
  }
  recommendation: {
    primary: {
      method: string
      api: string
      confidence: number
      reasoning: string
      implementationSteps: string[]
      testTransaction: string
      keyFields: string[]
    }
    alternative: {
      method: string
      api: string
      when: string
    }
  }
  developerSummary: {
    module: string
    objectType: string
    direction: string
    recommendedAPI: string
    totalFieldsMapped: number
    highConfidenceMappings: number
    warnings: Array<{
      type: string
      message: string
    }>
  }
}

interface FormConfig {
  sapSystem: string
  integrationDirection: string
  module: string
  objectType: string
  externalSystem: string
  additionalNotes: string
}

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [formConfig, setFormConfig] = useState<FormConfig>({
    sapSystem: '',
    integrationDirection: '',
    module: '',
    objectType: '',
    externalSystem: '',
    additionalNotes: '',
  })
  const [results, setResults] = useState<MappingResult | null>(null)
  const [currentProgress, setCurrentProgress] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleFileUpload = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload a file smaller than 10MB',
        variant: 'destructive',
      })
      return
    }
    setUploadedFile(file)
  }

  const handleFormChange = (field: keyof FormConfig, value: string) => {
    setFormConfig((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleGenerateMapping = async () => {
    if (!uploadedFile || !formConfig.sapSystem || !formConfig.integrationDirection) {
      toast({
        title: 'Missing fields',
        description: 'Please upload a file and fill in required fields',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)
    try {
      setCurrentProgress('uploading')

      const fileReader = new FileReader()
      fileReader.onload = async () => {
        const base64File = fileReader.result as string

        try {
          setCurrentProgress('analyzing')

          const payload = {
            file: {
              name: uploadedFile.name,
              size: uploadedFile.size,
              type: uploadedFile.type,
              content: base64File,
            },
            configuration: {
              sapSystem: formConfig.sapSystem,
              integrationDirection: formConfig.integrationDirection,
              module: formConfig.module,
              objectType: formConfig.objectType,
              externalSystem: formConfig.externalSystem,
              additionalNotes: formConfig.additionalNotes,
            },
            timestamp: new Date().toISOString(),
          }

          setCurrentProgress('mapping')

          // Send to webhook
          const webhookResponse = await fetch(
            'https://rafay22.app.n8n.cloud/webhook-test/sap-mapping',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            }
          )

          if (!webhookResponse.ok) {
            throw new Error('Webhook request failed')
          }

          const webhookResult = await webhookResponse.json()

          if (webhookResult && typeof webhookResult === 'object') {
            const aiResult = Array.isArray(webhookResult) ? webhookResult[0] : webhookResult
            setResults(aiResult as MappingResult)
            setCurrentProgress('complete')

            toast({
              title: 'Mapping generated',
              description: 'AI has successfully mapped your fields',
            })

            // Scroll to results
            setTimeout(() => {
              document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
            }, 100)
          }
        } catch (error) {
          console.error('[v0] Error processing mapping:', error)
          setCurrentProgress(null)
          toast({
            title: 'Error',
            description: 'Failed to generate mapping. Please try again.',
            variant: 'destructive',
          })
        } finally {
          setIsLoading(false)
        }
      }

      fileReader.readAsDataURL(uploadedFile)
    } catch (error) {
      console.error('[v0] Error:', error)
      setIsLoading(false)
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const handleNewMapping = () => {
    setResults(null)
    setUploadedFile(null)
    setFormConfig({
      sapSystem: '',
      integrationDirection: '',
      module: '',
      objectType: '',
      externalSystem: '',
      additionalNotes: '',
    })
    setCurrentProgress(null)
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />

      {!results ? (
        <UploadSection
          uploadedFile={uploadedFile}
          onFileUpload={handleFileUpload}
          formConfig={formConfig}
          onFormChange={handleFormChange}
          onGenerate={handleGenerateMapping}
          isLoading={isLoading}
          currentProgress={currentProgress}
        />
      ) : (
        <ResultsSection results={results} onNewMapping={handleNewMapping} />
      )}
    </main>
  )
}

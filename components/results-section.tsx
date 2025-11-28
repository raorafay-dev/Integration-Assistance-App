'use client'

import { Button } from '@/components/ui/button'
import MappingTable from './mapping-table'
import RecommendationCard from './recommendation-card'
import DeveloperSummary from './developer-summary'
import ContextSummary from './context-summary'
import FieldMappingsSummary from './field-mappings-summary'
import AlternativeApproach from './alternative-approach'
import { MappingResult } from '@/app/page'
import { ArrowLeft } from 'lucide-react'

interface ResultsSectionProps {
  results: MappingResult
  onNewMapping: () => void
}

export default function ResultsSection({ results, onNewMapping }: ResultsSectionProps) {
  return (
    <div id="results-section" className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mapping Results</h1>
          <p className="mt-1 text-sm text-muted-foreground">Review and export your SAP field mappings</p>
        </div>
        <Button onClick={onNewMapping} variant="outline" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          New Mapping
        </Button>
      </div>

      <div className="space-y-8">
        {/* Integration Configuration Cards */}
        <ContextSummary context={results.context} />

        {/* Field Mappings Summary Cards */}
        <FieldMappingsSummary fieldMappings={results.fieldMappings} />

        {/* Field mappings table */}
        <MappingTable fields={results.fieldMappings.fields} summary={results.fieldMappings.summary} />

        <DeveloperSummary summary={results.developerSummary} />

        {/* Recommended Integration Approach */}
        <RecommendationCard recommendation={results.recommendation} />

        {/* Alternative Approaches */}
        <AlternativeApproach alternative={results.recommendation?.alternative} />
      </div>
    </div>
  )
}

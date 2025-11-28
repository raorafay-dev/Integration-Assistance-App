'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Download, ArrowUpDown, Check, AlertCircle } from 'lucide-react'

interface Field {
  sourceField: string
  sourceDescription: string
  sapField: string
  sapTable: string
  dataType: string
  mandatory: string
  confidence: string
  notes: string
}

interface MappingTableProps {
  fields: Field[]
  summary: any
}

export default function MappingTable({ fields, summary }: MappingTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null)

  const filteredFields = fields.filter((field) =>
    Object.values(field).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const sortedFields = [...filteredFields].sort((a, b) => {
    if (!sortConfig) return 0
    const aValue = a[sortConfig.key as keyof Field]
    const bValue = b[sortConfig.key as keyof Field]
    const comparison = String(aValue).localeCompare(String(bValue))
    return sortConfig.direction === 'asc' ? comparison : -comparison
  })

  const getConfidenceStyle = (confidence: string) => {
    switch (confidence.toLowerCase()) {
      case 'high':
        return {
          bg: 'bg-green-50',
          badge: 'bg-green-100 text-green-700',
        }
      case 'medium':
        return {
          bg: 'bg-yellow-50',
          badge: 'bg-yellow-100 text-yellow-700',
        }
      case 'low':
        return {
          bg: 'bg-orange-50',
          badge: 'bg-orange-100 text-orange-700',
        }
      default:
        return {
          bg: 'bg-slate-50',
          badge: 'bg-slate-100 text-slate-700',
        }
    }
  }

  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const handleExportCSV = () => {
    const headers = [
      'Source Field',
      'Description',
      'SAP Field',
      'SAP Table',
      'Data Type',
      'Mandatory',
      'Confidence',
      'Notes',
    ]
    const csv = [
      headers.join(','),
      ...sortedFields.map((field) =>
        [
          `"${field.sourceField}"`,
          `"${field.sourceDescription}"`,
          `"${field.sapField}"`,
          `"${field.sapTable}"`,
          `"${field.dataType}"`,
          `"${field.mandatory}"`,
          `"${field.confidence}"`,
          `"${field.notes.replace(/"/g, '""')}"`,
        ].join(',')
      ),
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sap-mapping.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <Card className="border-border p-0 shadow-sm">
      <div className="border-b border-border bg-white px-6 py-4">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Field Mappings</h3>
            <div className="mt-2 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-600" />
                <span className="text-muted-foreground">{summary.highConfidence} High</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-yellow-600" />
                <span className="text-muted-foreground">{summary.mediumConfidence} Medium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-orange-600" />
                <span className="text-muted-foreground">{summary.lowConfidence} Low</span>
              </div>
            </div>
          </div>
          <Button onClick={handleExportCSV} variant="outline" size="sm" className="gap-2 whitespace-nowrap border-border">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <Input
            placeholder="Search fields by name, table, or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-border"
          />
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border bg-slate-50 hover:bg-slate-50">
                <TableHead
                  className="cursor-pointer select-none font-semibold"
                  onClick={() => handleSort('sourceField')}
                >
                  <div className="flex items-center gap-2">
                    Source Field
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none font-semibold"
                  onClick={() => handleSort('sourceDescription')}
                >
                  <div className="flex items-center gap-2">
                    Description
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none font-semibold"
                  onClick={() => handleSort('sapField')}
                >
                  <div className="flex items-center gap-2">
                    SAP Field
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none font-semibold"
                  onClick={() => handleSort('sapTable')}
                >
                  <div className="flex items-center gap-2">
                    SAP Table
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  </div>
                </TableHead>
                <TableHead className="font-semibold">Data Type</TableHead>
                <TableHead
                  className="cursor-pointer select-none font-semibold"
                  onClick={() => handleSort('mandatory')}
                >
                  <div className="flex items-center gap-2">
                    Mandatory
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none font-semibold"
                  onClick={() => handleSort('confidence')}
                >
                  <div className="flex items-center gap-2">
                    Confidence
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none font-semibold"
                  onClick={() => handleSort('notes')}
                >
                  <div className="flex items-center gap-2">
                    Notes
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedFields.map((field, index) => {
                const confidenceStyle = getConfidenceStyle(field.confidence)
                return (
                  <TableRow
                    key={index}
                    className={`border-border transition-colors ${confidenceStyle.bg}`}
                  >
                    <TableCell className="font-medium text-foreground">{field.sourceField}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{field.sourceDescription}</TableCell>
                    <TableCell className="font-medium text-foreground">{field.sapField}</TableCell>
                    <TableCell className="text-sm font-mono text-foreground">{field.sapTable}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{field.dataType}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {field.mandatory === 'Y' ? (
                          <Check className="h-4 w-4 text-success" />
                        ) : (
                          <span className="text-xs text-muted-foreground">Optional</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${confidenceStyle.badge} border ${
                        field.confidence.toLowerCase() === 'high' ? 'border-green-200' :
                        field.confidence.toLowerCase() === 'medium' ? 'border-yellow-200' :
                        'border-orange-200'
                      }`}>
                        <div className={`h-1.5 w-1.5 rounded-full ${
                          field.confidence.toLowerCase() === 'high' ? 'bg-green-600' :
                          field.confidence.toLowerCase() === 'medium' ? 'bg-yellow-600' :
                          'bg-orange-600'
                        }`} />
                        {field.confidence}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs">{field.notes}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>

        {sortedFields.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-12 w-12 text-muted-foreground opacity-40" />
            <p className="mt-2 text-sm text-muted-foreground">No fields found matching your search</p>
          </div>
        )}
      </div>
    </Card>
  )
}

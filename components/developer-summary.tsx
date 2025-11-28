import { Card } from '@/components/ui/card'
import { Code2 } from 'lucide-react'

interface DeveloperSummaryProps {
  summary: any
}

export default function DeveloperSummary({ summary }: DeveloperSummaryProps) {
  return (
    <Card className="border-border p-0 shadow-sm">
      <div className="border-b border-border bg-white px-6 py-4">
        <div className="flex items-center gap-2">
          <Code2 className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Developer Summary</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-blue-50 p-4 border border-border">
            <p className="text-xs font-semibold uppercase text-muted-foreground">Module</p>
            <p className="mt-3 text-xl font-bold text-foreground">{summary.module}</p>
          </div>

          <div className="rounded-lg bg-purple-50 p-4 border border-border">
            <p className="text-xs font-semibold uppercase text-muted-foreground">Object Type</p>
            <p className="mt-3 text-xl font-bold text-foreground">{summary.objectType}</p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4 border border-border">
            <p className="text-xs font-semibold uppercase text-muted-foreground">Direction</p>
            <p className="mt-3 text-xl font-bold text-foreground">{summary.direction}</p>
          </div>

          <div className="rounded-lg bg-indigo-50 p-4 border border-border lg:col-span-2">
            <p className="text-xs font-semibold uppercase text-muted-foreground">Recommended API</p>
            <p className="mt-3 font-mono text-sm font-bold text-primary break-all">{summary.recommendedAPI}</p>
          </div>

          <div className="rounded-lg bg-green-50 p-4 border border-border">
            <p className="text-xs font-semibold uppercase text-muted-foreground">Total Fields</p>
            <p className="mt-3 text-2xl font-bold text-green-700">{summary.totalFieldsMapped}</p>
          </div>

          <div className="rounded-lg bg-success/10 p-4 border border-border">
            <p className="text-xs font-semibold uppercase text-muted-foreground">High Confidence</p>
            <p className="mt-3 text-2xl font-bold text-success">{summary.highConfidenceMappings}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}

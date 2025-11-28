import { Card } from '@/components/ui/card'
import { CheckCircle, TrendingUp } from 'lucide-react'

interface RecommendationCardProps {
  recommendation: any
}

export default function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const { primary } = recommendation

  return (
    <Card className="border-border p-0 shadow-sm">
      <div className="border-b border-border bg-white px-6 py-4">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-success" />
          <h3 className="text-lg font-semibold text-foreground">Recommended Integration Approach</h3>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Method and API */}
        <div className="rounded-lg bg-success/10 p-4 border border-border">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase text-muted-foreground">Method</p>
              <p className="mt-2 text-lg font-bold text-foreground">{primary.method}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-muted-foreground">API</p>
              <p className="mt-2 font-mono text-sm font-bold text-primary">{primary.api}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Confidence Level</span>
            <span className="text-sm font-bold text-emerald-600">{primary.confidence}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-slate-200 border border-slate-300 shadow-sm">
            <div
              className="h-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${primary.confidence}%` }}
            />
          </div>
        </div>

        {/* Why This Approach */}
        <div className="rounded-lg bg-white p-4 border border-border">
          <p className="text-sm font-semibold text-foreground">Why This Approach?</p>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{primary.reasoning}</p>
        </div>

        {/* Implementation Steps */}
        <div className="rounded-lg bg-white p-4 border border-border">
          <p className="text-sm font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Implementation Steps
          </p>
          <ol className="mt-3 space-y-2">
            {primary.implementationSteps.map((step: string, index: number) => (
              <li key={index} className="text-sm text-muted-foreground">
                <span className="font-bold text-primary">{index + 1}.</span> {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Test Transaction and Key Fields */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-slate-50 p-4 border border-border">
            <p className="text-xs font-semibold uppercase text-muted-foreground">Test Transaction</p>
            <p className="mt-3 font-mono text-sm font-bold text-foreground bg-white px-3 py-2 rounded border border-border">{primary.testTransaction}</p>
          </div>
          <div className="rounded-lg bg-white p-4 border border-border">
            <p className="text-xs font-semibold uppercase text-muted-foreground">Key Fields</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {primary.keyFields.map((field: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full bg-primary/15 px-2.5 py-1 text-xs font-semibold text-primary border border-primary/20"
                >
                  {field}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

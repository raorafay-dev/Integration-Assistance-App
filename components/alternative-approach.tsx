import { Card } from '@/components/ui/card'
import { Lightbulb } from 'lucide-react'

interface AlternativeApproachProps {
  alternative?: {
    method: string
    api: string
    when: string
  }
}

export default function AlternativeApproach({ alternative }: AlternativeApproachProps) {
  if (!alternative || !alternative.method) {
    return null
  }

  return (
    <Card className="border-border p-0 shadow-sm">
      <div className="border-b border-border bg-white px-6 py-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Alternative Approach</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="rounded-lg border border-border bg-white p-5 space-y-4">
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase text-muted-foreground">Method</p>
              <p className="mt-2 text-lg font-bold text-foreground">{alternative.method}</p>
            </div>
            
            <div>
              <p className="text-xs font-semibold uppercase text-muted-foreground">API</p>
              <p className="mt-2 font-mono text-sm font-bold text-primary break-words">{alternative.api}</p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase text-muted-foreground">Use Case</p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{alternative.when}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

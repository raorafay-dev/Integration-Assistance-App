import { Card } from '@/components/ui/card'
import { CheckCircle2, Loader2 } from 'lucide-react'

interface ProgressIndicatorProps {
  current: string
}

export default function ProgressIndicator({ current }: ProgressIndicatorProps) {
  const stages = [
    { id: 'uploading', label: 'Uploading File' },
    { id: 'analyzing', label: 'Analyzing Data' },
    { id: 'mapping', label: 'Generating Mappings' },
    { id: 'complete', label: 'Complete' },
  ]
  const currentIndex = stages.findIndex((s) => s.id === current)

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Card className="overflow-hidden border border-border bg-white shadow-sm">
        <div className="bg-white px-8 py-6">
          <h3 className="text-center text-2xl font-semibold text-foreground">Processing Your Mapping</h3>
        </div>

        <div className="space-y-8 border-t border-border px-8 py-8">
          {/* Animated circular progress */}
          <div className="flex items-center justify-center py-4">
            <div className="relative h-32 w-32">
              {/* Background circle */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" className="text-border" />
              </svg>
              
              <svg className="absolute inset-0 h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${(currentIndex + 1) * 25.133} 100.533`}
                  className="text-primary transition-all duration-700"
                  strokeLinecap="round"
                />
              </svg>

              {/* Center animated icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                {current === 'complete' ? (
                  <CheckCircle2 className="h-16 w-16 text-success animate-pulse-ring" />
                ) : (
                  <Loader2 className="h-16 w-16 text-primary animate-spin-slow" />
                )}
              </div>
            </div>
          </div>

          {/* Progress label */}
          <div className="text-center">
            <p className="text-base font-semibold text-foreground">
              {stages[currentIndex]?.label}
            </p>
          </div>

          <div className="flex items-center justify-center gap-1">
            {stages.map((stage, index) => (
              <div key={stage.id} className="flex flex-1 items-center gap-1 max-w-20">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-sm transition-all duration-300 ${
                    index < currentIndex
                      ? 'bg-primary text-white'
                      : index === currentIndex
                      ? 'bg-primary text-white ring-2 ring-primary/40'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {index < currentIndex ? '✓' : index + 1}
                </div>
                {index < stages.length - 1 && (
                  <div
                    className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                      index < currentIndex ? 'bg-primary' : 'bg-slate-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}

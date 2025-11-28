'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { ChevronDown, Database, Zap } from 'lucide-react'

interface ContextSummaryProps {
  context: any
}

export default function ContextSummary({ context }: ContextSummaryProps) {
  const [expandModule, setExpandModule] = useState(false)
  const [expandObjectType, setExpandObjectType] = useState(false)

  return (
    <Card className="border-0 p-0 shadow-md">
      <div className="border-b border-border bg-gradient-to-r from-primary/5 to-accent/5 px-6 py-4">
        <h3 className="text-lg font-semibold text-foreground">Integration Setup</h3>
      </div>

      <div className="grid gap-4 p-6 md:grid-cols-2">
        {/* SAP System */}
        <div className="rounded-lg border border-border/50 bg-white p-4 transition-all hover:border-primary/30">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase text-muted-foreground">SAP System</p>
              <p className="mt-2 text-lg font-bold text-foreground">{context.sapSystem}</p>
            </div>
            <Database className="h-5 w-5 text-primary/40" />
          </div>
        </div>

        {/* Integration Direction - removed icon, just text direction */}
        <div className="rounded-lg border border-border/50 bg-white p-4 transition-all hover:border-primary/30">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase text-muted-foreground">Direction</p>
              <p className="mt-2 text-lg font-bold text-foreground">{context.integrationDirection}</p>
            </div>
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
              context.integrationDirection === 'Inbound' ? 'bg-blue-100' : 'bg-green-100'
            }`}>
              <Zap className={`h-4 w-4 ${
                context.integrationDirection === 'Inbound' ? 'text-blue-600' : 'text-green-600'
              }`} />
            </div>
          </div>
        </div>

        {/* Module with collapsible details */}
        <div
          className="rounded-lg border border-border/50 bg-white p-4 cursor-pointer transition-all hover:border-primary/30"
          onClick={() => setExpandModule(!expandModule)}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase text-muted-foreground">Module</p>
              <p className="mt-2 text-lg font-bold text-foreground">{context.module.value}</p>
              <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1">
                <span className="text-xs font-medium text-primary">{context.module.confidence}% confident</span>
              </div>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-primary/40 transition-transform shrink-0 ${
                expandModule ? 'rotate-180' : ''
              }`}
            />
          </div>
          {expandModule && (
            <div className="mt-4 border-t border-border pt-4">
              <p className="text-xs font-semibold text-muted-foreground">Why?</p>
              <p className="mt-2 text-sm text-foreground">{context.module.reasoning}</p>
            </div>
          )}
        </div>

        {/* Object Type with collapsible details */}
        <div
          className="rounded-lg border border-border/50 bg-white p-4 cursor-pointer transition-all hover:border-primary/30"
          onClick={() => setExpandObjectType(!expandObjectType)}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase text-muted-foreground">Object Type</p>
              <p className="mt-2 text-lg font-bold text-foreground">{context.objectType.value}</p>
              <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1">
                <span className="text-xs font-medium text-primary">{context.objectType.confidence}% confident</span>
              </div>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-primary/40 transition-transform shrink-0 ${
                expandObjectType ? 'rotate-180' : ''
              }`}
            />
          </div>
          {expandObjectType && (
            <div className="mt-4 border-t border-border pt-4">
              <p className="text-xs font-semibold text-muted-foreground">Why?</p>
              <p className="mt-2 text-sm text-foreground">{context.objectType.reasoning}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

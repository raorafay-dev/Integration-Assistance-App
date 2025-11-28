'use client'

import { Card } from '@/components/ui/card'
import { Database, CheckCircle2, TrendingUp, AlertCircle, Package, Shield, Lock } from 'lucide-react'

interface FieldMappingsSummaryProps {
  fieldMappings: {
    total: number
    summary: {
      highConfidence: number
      mediumConfidence: number
      lowConfidence: number
      mandatory: number
      optional: number
      recommendedCustom?: number
    }
    tablesInvolved: string[]
  }
}

export default function FieldMappingsSummary({ fieldMappings }: FieldMappingsSummaryProps) {
  const { total, summary, tablesInvolved } = fieldMappings
  const mapped = summary.highConfidence + summary.mediumConfidence + summary.lowConfidence
  const recommendedCustom = summary.recommendedCustom || 0
  const unmapped = total - mapped

  const primaryStats = [
    {
      label: 'Total Fields',
      value: total,
      icon: Database,
      color: 'bg-blue-600',
      textColor: 'text-blue-700',
      lightBg: 'bg-blue-50',
      subItems: [
        { label: 'Mapped', value: mapped, icon: CheckCircle2 },
        { label: 'Unmapped', value: unmapped, icon: AlertCircle },
      ],
    },
    {
      label: 'Fields Mapped',
      value: mapped,
      icon: CheckCircle2,
      color: 'bg-success',
      textColor: 'text-success',
      lightBg: 'bg-success/10',
      breakdown: [
        { label: 'High', value: summary.highConfidence, color: 'bg-green-600', textColor: 'text-green-700' },
        { label: 'Medium', value: summary.mediumConfidence, color: 'bg-yellow-600', textColor: 'text-yellow-700' },
        { label: 'Low', value: summary.lowConfidence, color: 'bg-orange-600', textColor: 'text-orange-700' },
      ],
    },
  ]

  const detailStats = [
    {
      label: 'Mandatory',
      value: summary.mandatory,
      icon: Shield,
      color: 'bg-purple-600',
      textColor: 'text-purple-700',
      lightBg: 'bg-purple-50',
    },
    {
      label: 'Optional',
      value: summary.optional,
      icon: Lock,
      color: 'bg-slate-600',
      textColor: 'text-slate-700',
      lightBg: 'bg-slate-50',
    },
    {
      label: 'Custom',
      value: recommendedCustom,
      icon: Package,
      color: 'bg-indigo-600',
      textColor: 'text-indigo-700',
      lightBg: 'bg-indigo-50',
    },
  ]

  return (
    <div className="space-y-4">
      {/* Primary stats with breakdown */}
      <div className="grid gap-4 md:grid-cols-2">
        {primaryStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className={`border-border ${stat.lightBg} p-6 shadow-sm`}>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">{stat.label}</p>
                  <p className={`mt-2 text-4xl font-bold ${stat.textColor}`}>{stat.value}</p>
                </div>
                <Icon className={`h-6 w-6 ${stat.textColor} opacity-50 mt-1`} />
              </div>
              
              {/* Sub items for Total Fields card */}
              {stat.subItems && (
                <div className="mt-4 pt-4 border-t border-border/30 grid grid-cols-2 gap-4">
                  {stat.subItems.map((item) => {
                    const SubIcon = item.icon
                    return (
                      <div key={item.label} className="flex items-center gap-3">
                        <SubIcon className={`h-4 w-4 ${stat.textColor} opacity-60`} />
                        <div>
                          <p className="text-xs text-muted-foreground">{item.label}</p>
                          <p className={`text-lg font-bold ${stat.textColor}`}>{item.value}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
              
              {/* Confidence breakdown in Fields Mapped card */}
              {stat.breakdown && (
                <div className="mt-4 pt-4 border-t border-border/30 flex gap-3">
                  {stat.breakdown.map((item) => (
                    <div key={item.label} className="flex-1">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className={`mt-1 text-2xl font-bold ${item.textColor}`}>{item.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )
        })}
      </div>

      {/* Detail stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {detailStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className={`border-border ${stat.lightBg} p-4 shadow-sm`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">{stat.label}</p>
                  <p className={`mt-2 text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
                </div>
                <Icon className={`h-5 w-5 ${stat.textColor} opacity-50 mt-1`} />
              </div>
            </Card>
          )
        })}
      </div>

      {/* Tables involved section */}
      {tablesInvolved && tablesInvolved.length > 0 && (
        <Card className="border-border bg-slate-50 p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase text-muted-foreground">SAP Tables Involved</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {tablesInvolved.map((table) => (
              <span
                key={table}
                className="inline-flex items-center rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-foreground border border-border"
              >
                {table}
              </span>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
